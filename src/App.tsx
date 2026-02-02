import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

const App: React.FC = () => {
    const [showQuoteForm, setShowQuoteForm] = useState(false);

    return (
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
                </Routes>
            </Layout>
            
            {/* Quote Form Modal - rendered at App level for full-screen overlay */}
            {showQuoteForm && <QuoteForm onClose={() => setShowQuoteForm(false)} />}
        </Router>
    );
};

export default App;
