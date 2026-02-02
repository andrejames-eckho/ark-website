import React from 'react';
import Footer from './Footer';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="app">
            <main className="page-transition">{children}</main>
            <Footer />
            <style>{`
                nav a:hover { color: var(--color-primary); }
                .category-card:hover { border-color: var(--color-primary) !important; background-color: var(--color-surface-hover) !important; transform: translateY(-4px); }
                .category-card:hover div:last-child { opacity: 1 !important; }
            `}</style>
        </div>
    );
};

export default Layout;
