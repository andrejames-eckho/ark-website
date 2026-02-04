import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Login from '../../components/admin/Login';

const AdminLoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  // Redirect to admin dashboard if already logged in as admin
  React.useEffect(() => {
    if (isAdmin) {
      navigate('/backstage-access');
    }
  }, [isAdmin, navigate]);

  const handleLoginSuccess = () => {
    navigate('/backstage-access');
  };

  return <Login onSuccess={handleLoginSuccess} />;
};

export default AdminLoginPage;
