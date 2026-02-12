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


  // Helper function to verify localStorage cache
  const verifyAdminCache = (userId: string) => {
    const cachedStatus = localStorage.getItem(`ark_admin_${userId}`);
    console.log('🔍 Cache verification:', { userId, cachedStatus });
    return cachedStatus === 'true';
  };

  // Check admin status securely from database
  const checkAdminStatus = async (userId: string, preserveOnError = false) => {
    if (!userId) {
      setIsAdmin(false);
      return;
    }

    console.log('🔍 Starting admin status check for:', userId);
    setAdminLoading(true);

    try {
      // Add timeout to prevent hanging - increased to 30 seconds
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Admin check timeout')), 30000);
      });

      const queryPromise = supabase
        .from('admin_roles')
        .select('*')
        .eq('user_id', userId)
        .eq('role', 'admin');

      console.log('📡 Executing database query...');
      const { data, error } = await Promise.race([queryPromise, timeoutPromise]) as any;
      console.log('📊 Query result:', { data, error });

      if (error && error.message !== 'Admin check timeout') {
        console.error('Admin check error:', error);
        if (!preserveOnError) {
          setIsAdmin(false);
          localStorage.removeItem(`ark_admin_${userId}`);
        }
      } else if (data && data.length > 0) {
        console.log('✅ Admin status confirmed, caching...');
        setIsAdmin(true);
        // Cache admin status in localStorage
        localStorage.setItem(`ark_admin_${userId}`, 'true');
        console.log('💾 Admin status cached to localStorage');
      } else if (error && error.message === 'Admin check timeout') {
        console.error('⏰ Admin check timed out');
        if (!preserveOnError) {
          // Check if we already have admin status set and preserve it temporarily
          if (isAdmin) {
            console.log('🔄 Preserving existing admin status due to timeout');
            // Don't change isAdmin, just extend the cache
            localStorage.setItem(`ark_admin_${userId}`, 'true');
          } else {
            setIsAdmin(false);
            localStorage.removeItem(`ark_admin_${userId}`);
          }
        }
      } else {
        console.log('❌ User is not an admin');
        setIsAdmin(false);
        localStorage.removeItem(`ark_admin_${userId}`);
      }
    } catch (err) {
      console.error('Admin check exception:', err);
      // Only set isAdmin to false if we're not preserving on error (like during new tab initialization)
      if (!preserveOnError) {
        setIsAdmin(false);
        localStorage.removeItem(`ark_admin_${userId}`);
      }
    } finally {
      setAdminLoading(false);
      console.log('✅ Admin status check completed');
    }
  };

  useEffect(() => {
    // onAuthStateChange handles both the initial session and subsequent changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', { event, hasSession: !!session, userEmail: session?.user?.email });
        const currentUser = session?.user ?? null;

        // Update user state immediately
        setUser(currentUser);

        if (currentUser) {
          // Check localStorage for cached admin status first to avoid flickering
          const cachedAdminStatus = verifyAdminCache(currentUser.id);
          console.log('🔍 Session detected:', { userId: currentUser.id, cachedAdminStatus, event });

          if (cachedAdminStatus) {
            console.log('✅ Using cached admin status');
            setIsAdmin(true);
            // If we have cached status, we can stop loading now
            setLoading(false);
          } else {
            console.log('🔄 No cached status, checking database...');
            // We need to check the database
            // Use preserveOnError=true for initialization events to prevent logout on network glitches
            const preserve = event === 'INITIAL_SESSION' || event === 'SIGNED_IN';
            await checkAdminStatus(currentUser.id, preserve);
            setLoading(false);
          }
        } else {
          console.log('🚪 No session detected');
          setIsAdmin(false);
          setLoading(false);
        }
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
    // Clear cached admin status
    if (user) {
      localStorage.removeItem(`ark_admin_${user.id}`);
    }
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
