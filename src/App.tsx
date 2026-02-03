import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Header from './components/Header';
import QuoteForm from './components/QuoteForm';
import Home from './pages/Home';
import About from './pages/About';
import Equipment from './pages/Equipment';
import Services from './pages/Services';
import FullProduction from './pages/services/FullProduction';
import DryHire from './pages/services/DryHire';
import Installation from './pages/services/Installation';
import BroadcastLED from './pages/services/BroadcastLED';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import AdminLayout from './components/admin/AdminLayout';
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import EquipmentManagement from './pages/admin/EquipmentManagement';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isAdmin } = useAuth();
  
  if (!user || !isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
    const [showQuoteForm, setShowQuoteForm] = useState(false);

    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <Header onOpenQuoteForm={() => setShowQuoteForm(true)} />
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/equipment" element={<Equipment />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/services/full-production" element={<FullProduction />} />
                        <Route path="/services/dry-hire" element={<DryHire />} />
                        <Route path="/services/installation" element={<Installation />} />
                        <Route path="/services/broadcast-led" element={<BroadcastLED />} />
                        
                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Dashboard />} />
                            <Route path="equipment" element={<EquipmentManagement />} />
                        </Route>
                    </Routes>
                </Layout>
                
                {/* Quote Form Modal - rendered at App level for full-screen overlay */}
                {showQuoteForm && <QuoteForm onClose={() => setShowQuoteForm(false)} />}
            </Router>
        </AuthProvider>
    );
};

export default App;
