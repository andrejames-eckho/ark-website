import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

const AdminSetup: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { user } = useAuth();

  const setupAdmin = async () => {
    if (!user) {
      setMessage('Please sign in first');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Use the first-time admin setup function
      const { error } = await supabase.rpc('setup_first_admin');

      if (error) {
        console.error('Error setting up first admin:', error);
        setMessage(`Error: ${error.message}`);
      } else {
        setMessage('✅ Admin access granted successfully! Refreshing...');
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (err: any) {
      console.error('Setup error:', err);
      setMessage(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-bg)',
      padding: 'var(--spacing-3)'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: 'var(--spacing-6)',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: 'var(--spacing-4)',
          textAlign: 'center'
        }}>
          Admin Setup
        </h1>

        <div style={{
          backgroundColor: 'var(--color-bg)',
          border: '1px solid var(--color-border)',
          borderRadius: '8px',
          padding: 'var(--spacing-4)',
          marginBottom: 'var(--spacing-4)'
        }}>
          <p style={{
            color: 'var(--color-text)',
            margin: '0 0 var(--spacing-2) 0',
            fontSize: '0.9rem'
          }}>
            <strong>Current User:</strong> {user?.email || 'Not signed in'}
          </p>
          <p style={{
            color: 'var(--color-text-muted)',
            margin: 0,
            fontSize: '0.8rem'
          }}>
            This page allows you to grant admin access to the currently signed-in user.
          </p>
        </div>

        {message && (
          <div style={{
            backgroundColor: message.includes('✅') ? '#10b98120' : '#ef444420',
            border: `1px solid ${message.includes('✅') ? '#10b981' : '#ef4444'}`,
            borderRadius: '8px',
            padding: '12px',
            marginBottom: 'var(--spacing-4)',
            textAlign: 'center'
          }}>
            <p style={{ 
              color: message.includes('✅') ? '#10b981' : '#ef4444', 
              margin: 0, 
              fontSize: '0.9rem' 
            }}>
              {message}
            </p>
          </div>
        )}

        <button
          onClick={setupAdmin}
          disabled={loading || !user}
          style={{
            width: '100%',
            padding: '14px 24px',
            backgroundColor: 'var(--color-primary)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: loading || !user ? 'not-allowed' : 'pointer',
            transition: 'var(--transition-fast)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px'
          }}
        >
          {loading ? 'Setting up...' : 'Grant Admin Access'}
        </button>

        <div style={{
          marginTop: 'var(--spacing-4)',
          padding: 'var(--spacing-3)',
          backgroundColor: 'var(--color-bg)',
          borderRadius: '8px',
          border: '1px solid var(--color-border)'
        }}>
          <p style={{
            color: 'var(--color-text-muted)',
            fontSize: '0.8rem',
            margin: 0,
            textAlign: 'center'
          }}>
            After setting up admin access, you can access the admin panel at /backstage-access
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSetup;
