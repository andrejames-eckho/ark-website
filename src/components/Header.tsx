import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
    onOpenQuoteForm: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenQuoteForm }) => {
    return (
        <header className="header" style={{
            position: 'sticky',
            top: 0,
            zIndex: 100,
            backgroundColor: 'rgba(10, 10, 10, 0.8)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid var(--color-border)',
            padding: 'var(--spacing-2) 0'
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" className="logo" style={{ fontSize: '1.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: 'var(--color-primary)' }}>ARK</span> PRO Audio and Lights
                </Link>
                <nav style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
                    <Link to="/equipment" style={{ fontWeight: 500, fontSize: '0.9rem' }}>EQUIPMENT</Link>
                    <Link to="/services" style={{ fontWeight: 500, fontSize: '0.9rem' }}>SERVICES</Link>
                    <Link to="/about" style={{ fontWeight: 500, fontSize: '0.9rem' }}>ABOUT</Link>
                    <button
                        onClick={() => {
                            console.log('GET A QUOTE button clicked');
                            onOpenQuoteForm();
                        }}
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: '#000',
                            padding: '8px 20px',
                            borderRadius: '4px',
                            fontWeight: 700,
                            fontSize: '0.85rem',
                            cursor: 'pointer'
                        }}
                    >GET A QUOTE</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
