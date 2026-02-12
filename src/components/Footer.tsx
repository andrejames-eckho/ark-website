import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer style={{ padding: 'var(--spacing-12) 0', borderTop: '1px solid var(--color-border)' }}>
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-8)', marginBottom: 'var(--spacing-8)' }}>
                    <div>
                        <div className="logo" style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: 'var(--spacing-3)' }}>
                            <span style={{ color: 'var(--color-primary)' }}>ARK</span> PRO AUDIO
                        </div>
                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            Premium professional audio, lighting and rigging equipment rentals for production professionals.
                        </p>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: 'var(--spacing-3)' }}>EQUIPMENT</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            <li><Link to="/equipment?category=1">Audio Rental</Link></li>
                            <li><Link to="/equipment?category=2">Lighting Rental</Link></li>
                            <li><Link to="/equipment?category=3">LED & Video</Link></li>
                            <li><Link to="/equipment?category=4">Rigging Solutions</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: 'var(--spacing-3)' }}>SERVICES</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            <li><Link to="/services/full-production">Full Production</Link></li>
                            <li><Link to="/services/dry-hire">Dry Hire</Link></li>
                            <li><Link to="/services/installation">Installation</Link></li>
                            <li><Link to="/services/broadcast-led">Broadcast & LED</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: 'var(--spacing-3)' }}>COMPANY</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            <li><Link to="/about">Our Story</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: 'var(--spacing-3)' }}>CONNECT</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            <a href="mailto:mac2arkproaudio@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}><Mail size={16} /> mac2arkproaudio@gmail.com</a>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> +63 917 316 8388</div>
                            <a href="https://maps.app.goo.gl/iVcJgHZy71CEB7Ni9" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}><MapPin size={16} /> 7th street, Lawaan Village, Iloilo City, Philippines</a>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                                <a href="https://www.facebook.com/ARKproaudioandlights" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                                    <Facebook size={18} />
                                    <span>Facebook</span>
                                </a>
                                <a href="https://www.instagram.com/arkpro.official/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                                    <Instagram size={18} />
                                    <span>Instagram</span>
                                </a>
                                <a href="https://wa.me/639173168388" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--color-text-muted)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.color = 'var(--color-primary)'} onMouseOut={(e) => e.currentTarget.style.color = 'var(--color-text-muted)'}>
                                    <MessageCircle size={18} />
                                    <span>WhatsApp</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--spacing-4)', display: 'flex', justifyContent: 'space-between', color: 'var(--color-text-muted)', fontSize: '0.8rem' }}>
                    <p>© 2026 ARK PRO AUDIO AND LIGHTS. ALL RIGHTS RESERVED.</p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                        <a href="#">PRIVACY POLICY</a>
                        <a href="#">TERMS OF SERVICE</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
