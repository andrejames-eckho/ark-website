import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
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
import ContentUnavailable from './pages/ContentUnavailable';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isAdmin, loading } = useAuth();

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                backgroundColor: 'var(--color-bg)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'var(--color-text)'
            }}>
                <div>Loading...</div>
            </div>
        );
    }

    if (!user || !isAdmin) {
        return <Navigate to="/backstage-access/login" replace />;
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
                        <Route path="/" element={<Home onOpenQuoteForm={() => setShowQuoteForm(true)} />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/equipment" element={<Equipment />} />
                        <Route path="/services" element={<Services onOpenQuoteForm={() => setShowQuoteForm(true)} />} />
                        <Route path="/services/full-production" element={<FullProduction onOpenQuoteForm={() => setShowQuoteForm(true)} />} />
                        <Route path="/services/dry-hire" element={<DryHire onOpenQuoteForm={() => setShowQuoteForm(true)} />} />
                        <Route path="/services/installation" element={<Installation onOpenQuoteForm={() => setShowQuoteForm(true)} />} />
                        <Route path="/services/broadcast-led" element={<BroadcastLED onOpenQuoteForm={() => setShowQuoteForm(true)} />} />

                        {/* Admin Routes */}
                        <Route path="/backstage-access/login" element={<AdminLogin />} />
                        <Route path="/backstage-access" element={
                            <ProtectedRoute>
                                <AdminLayout />
                            </ProtectedRoute>
                        }>
                            <Route index element={<Dashboard />} />
                            <Route path="equipment" element={<EquipmentManagement />} />
                        </Route>

                        {/* Catch-all route for unassigned paths */}
                        <Route path="*" element={<ContentUnavailable />} />
                    </Routes>
                </Layout>

                {/* Quote Form Modal - rendered at App level for full-screen overlay */}
                {showQuoteForm && createPortal(
                    <QuoteForm onClose={() => setShowQuoteForm(false)} />,
                    document.body
                )}
            </Router>
        </AuthProvider>
    );
};

export default App;
