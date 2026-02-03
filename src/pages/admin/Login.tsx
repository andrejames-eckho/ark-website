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
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  const handleLoginSuccess = () => {
    navigate('/admin');
  };

  return <Login onSuccess={handleLoginSuccess} />;
};

export default AdminLoginPage;
