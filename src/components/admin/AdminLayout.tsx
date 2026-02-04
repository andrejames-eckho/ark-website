import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, Package, Home } from 'lucide-react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if not admin
  React.useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/backstage-access/login');
    }
  }, [user, isAdmin, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    {
      path: '/backstage-access',
      label: 'Dashboard',
      icon: Home
    },
    {
      path: '/backstage-access/equipment',
      label: 'Equipment',
      icon: Package
    }
  ];

  if (!user || !isAdmin) {
    return null; // Will redirect
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--color-bg)',
      display: 'flex'
    }}>
      {/* Sidebar */}
      <aside style={{
        width: '250px',
        backgroundColor: 'var(--color-surface)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Logo/Header */}
        <div style={{
          padding: 'var(--spacing-6)',
          borderBottom: '1px solid var(--color-border)'
        }}>
          <h1 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--color-primary)',
            textTransform: 'uppercase'
          }}>
            ARK Admin
          </h1>
          <p style={{
            margin: '4px 0 0 0',
            color: 'var(--color-text-muted)',
            fontSize: '0.8rem'
          }}>
            Management Panel
          </p>
        </div>

        {/* Navigation */}
        <nav style={{
          flex: 1,
          padding: 'var(--spacing-4)'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path || 
                             (item.path !== '/backstage-access' && location.pathname.startsWith(item.path));
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'var(--transition-fast)',
                    backgroundColor: isActive ? 'var(--color-primary)' : 'transparent',
                    color: isActive ? '#000' : 'var(--color-text)',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  <IconComponent size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div style={{
          padding: 'var(--spacing-4)',
          borderTop: '1px solid var(--color-border)'
        }}>
          <div style={{
            marginBottom: 'var(--spacing-3)',
            padding: '12px',
            backgroundColor: 'var(--color-bg)',
            borderRadius: '8px'
          }}>
            <div style={{
              fontSize: '0.8rem',
              color: 'var(--color-text-muted)',
              marginBottom: '4px'
            }}>
              Logged in as
            </div>
            <div style={{
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--color-text)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {user.email}
            </div>
          </div>
          <button
            onClick={handleSignOut}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '12px 16px',
              backgroundColor: 'transparent',
              color: 'var(--color-text-muted)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: 600,
              transition: 'var(--transition-fast)'
            }}
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Top Bar */}
        <header style={{
          backgroundColor: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          padding: 'var(--spacing-4) var(--spacing-6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--color-text)'
            }}>
              {menuItems.find(item => 
                item.path === location.pathname || 
                (item.path !== '/backstage-access' && location.pathname.startsWith(item.path))
              )?.label || 'Admin'}
            </h2>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-4)'
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '8px 16px',
                backgroundColor: 'transparent',
                color: 'var(--color-text-muted)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: 600,
                transition: 'var(--transition-fast)'
              }}
            >
              View Site
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div style={{
          flex: 1,
          padding: 'var(--spacing-6)',
          overflowY: 'auto'
        }}>
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
