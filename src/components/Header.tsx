import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
    onOpenQuoteForm: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenQuoteForm }) => {
    const { isAdmin } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
                <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
                    <img 
                        src="/logo.svg" 
                        alt="ARK PRO Audio and Lights" 
                        style={{ height: '40px', width: 'auto' }}
                    />
                </Link>
                
                {/* Desktop Navigation */}
                <nav className="desktop-nav" style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
                    <Link to="/equipment" style={{ fontWeight: 500, fontSize: '0.9rem' }}>EQUIPMENT</Link>
                    <Link to="/services" style={{ fontWeight: 500, fontSize: '0.9rem' }}>SERVICES</Link>
                    <Link to="/about" style={{ fontWeight: 500, fontSize: '0.9rem' }}>ABOUT</Link>
                    {isAdmin && (
                        <Link 
                            to="/backstage-access" 
                            style={{ 
                                fontWeight: 500, 
                                fontSize: '0.9rem',
                                color: 'var(--color-primary)',
                                textDecoration: 'underline'
                            }}
                        >
                            ADMIN
                        </Link>
                    )}
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

                {/* Mobile Menu Button */}
                <button 
                    className="mobile-menu-button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{
                        display: 'none',
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                        padding: '8px'
                    }}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
                <div className="mobile-nav" style={{
                    display: 'none',
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    backgroundColor: 'rgba(10, 10, 10, 0.95)',
                    backdropFilter: 'blur(12px)',
                    borderBottom: '1px solid var(--color-border)',
                    padding: 'var(--spacing-4) 0'
                }}>
                    <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                        <Link to="/equipment" style={{ fontWeight: 500, fontSize: '1rem', padding: 'var(--spacing-2) 0' }}>EQUIPMENT</Link>
                        <Link to="/services" style={{ fontWeight: 500, fontSize: '1rem', padding: 'var(--spacing-2) 0' }}>SERVICES</Link>
                        <Link to="/about" style={{ fontWeight: 500, fontSize: '1rem', padding: 'var(--spacing-2) 0' }}>ABOUT</Link>
                        {isAdmin && (
                            <Link 
                                to="/backstage-access" 
                                style={{ 
                                    fontWeight: 500, 
                                    fontSize: '1rem',
                                    color: 'var(--color-primary)',
                                    textDecoration: 'underline',
                                    padding: 'var(--spacing-2) 0'
                                }}
                            >
                                ADMIN
                            </Link>
                        )}
                        <button
                            onClick={() => {
                                console.log('GET A QUOTE button clicked');
                                onOpenQuoteForm();
                                setIsMobileMenuOpen(false);
                            }}
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                color: '#000',
                                padding: '12px 24px',
                                borderRadius: '4px',
                                fontWeight: 700,
                                fontSize: '1rem',
                                cursor: 'pointer',
                                width: '100%',
                                marginTop: 'var(--spacing-2)'
                            }}
                        >GET A QUOTE</button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
