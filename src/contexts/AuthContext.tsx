import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  adminLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(false);


  // Check admin status securely from database
  const checkAdminStatus = async (userId: string) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }

    setAdminLoading(true);

    try {
      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Admin check timeout')), 15000);
      });

      const queryPromise = supabase
        .from('admin_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('role', 'admin');

      const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any;

      if (error && error.message !== 'Admin check timeout') {
        setIsAdmin(false);
      } else if (data && data.length > 0) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {
      setIsAdmin(false);
    } finally {
      setAdminLoading(false);
    }
  };

  useEffect(() => {
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const currentUser = session?.user ?? null;
      setUser(currentUser);

      if (currentUser) {
        await checkAdminStatus(currentUser.id);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log('🔄 Auth state changed:', { event: _event, hasSession: !!session, userEmail: session?.user?.email });
        const currentUser = session?.user ?? null;
        setUser(currentUser);

        if (currentUser) {
          console.log('👤 User logged in, checking admin status...');
          await checkAdminStatus(currentUser.id);
        } else {
          console.log('🚪 User logged out');
          setIsAdmin(false);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: { message: error.message } };
      }

      // User and session are automatically set by Supabase
      // The onAuthStateChange listener will handle admin status check
      return { error: null };
    } catch (error) {
      return { error: { message: 'Network error occurred' } };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    user,
    isAdmin,
    loading,
    adminLoading,
    signIn,
    signOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
