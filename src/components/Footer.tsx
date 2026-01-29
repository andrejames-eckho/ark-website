import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

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
                            <li><Link to="/equipment">Audio Rental</Link></li>
                            <li><Link to="/equipment">Lighting Rental</Link></li>
                            <li><Link to="/equipment">LED & Video</Link></li>
                            <li><Link to="/equipment">Rigging Solutions</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: 'var(--spacing-3)' }}>COMPANY</h4>
                        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            <li><Link to="/about">Our Story</Link></li>
                            <li><Link to="/about">Locations</Link></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 style={{ marginBottom: 'var(--spacing-3)' }}>CONNECT</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Mail size={16} /> info@arkproaudio.com</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone size={16} /> +1 (800) ARK-GEAR</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={16} /> Los Angeles, CA</div>
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
