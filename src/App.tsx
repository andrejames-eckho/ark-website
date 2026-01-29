import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Equipment from './pages/Equipment';
import Services from './pages/Services';

const App: React.FC = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/equipment" element={<Equipment />} />
                    <Route path="/services" element={<Services />} />
                </Routes>
            </Layout>
        </Router>
    );
};

export default App;
