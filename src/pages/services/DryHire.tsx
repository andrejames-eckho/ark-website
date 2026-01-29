import React from 'react';
import { Settings, ShieldCheck, Truck, Headphones, Activity } from 'lucide-react';

const DryHire: React.FC = () => {
    return (
        <div className="page-transition">
            {/* Hero Section */}
            <section style={{
                padding: 'var(--spacing-12) 0',
                backgroundColor: 'var(--color-bg)',
                textAlign: 'center',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div className="container">
                    <Settings size={64} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                    <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-2)' }}>DRY HIRE <span style={{ color: 'var(--color-primary)' }}>RENTALS</span></h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        Professional gear for professional teams. Access the world's most reliable inventory, meticulously maintained and show-ready.
                    </p>
                </div>
            </section>

            {/* QC Narrative - PRG Influence */}
            <section style={{ padding: 'var(--spacing-12) 0' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>THE ARK <span style={{ color: 'var(--color-primary)' }}>QC STANDARD</span></h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 'var(--spacing-4)' }}>
                        <div style={{ border: '1px solid var(--color-border)', padding: 'var(--spacing-6)', borderRadius: '8px' }}>
                            <ShieldCheck size={32} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-3)' }} />
                            <h3>10-Point Inspection</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Every piece of gear undergoes a rigorous 10-point technical validation before leaving our warehouse.</p>
                        </div>
                        <div style={{ border: '1px solid var(--color-border)', padding: 'var(--spacing-6)', borderRadius: '8px' }}>
                            <Activity size={32} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-3)' }} />
                            <h3>Firmware Optimization</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>We ensure all digital components are updated to the latest stable versions for maximum reliability.</p>
                        </div>
                        <div style={{ border: '1px solid var(--color-border)', padding: 'var(--spacing-6)', borderRadius: '8px' }}>
                            <Truck size={32} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-3)' }} />
                            <h3>Road-Ready Packaging</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Shipped in custom-engineered road cases designed for high-impact protection and efficient stage deployment.</p>
                        </div>
                        <div style={{ border: '1px solid var(--color-border)', padding: 'var(--spacing-6)', borderRadius: '8px' }}>
                            <Headphones size={32} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-3)' }} />
                            <h3>24/7 Tech Support</h3>
                            <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Direct access to our engineering team for real-time troubleshooting, anywhere in the world.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inventory CTA */}
            <section style={{ padding: 'var(--spacing-12) 0', backgroundColor: 'var(--color-surface)', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-4)' }}>UNCOMPROMISING <span style={{ color: 'var(--color-primary)' }}>AVAILABILITY</span></h2>
                    <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-8)', maxWidth: '600px', margin: '0 auto var(--spacing-8)' }}>
                        From L-Acoustics arrays to MA Lighting consoles, our inventory is curated for peak performance in mission-critical environments.
                    </p>
                    <button style={{
                        border: '2px solid var(--color-primary)',
                        color: 'var(--color-primary)',
                        padding: '14px 40px',
                        borderRadius: '4px',
                        fontWeight: 800,
                        fontSize: '1rem',
                        textTransform: 'uppercase'
                    }}>BROWSE GEAR INVENTORY</button>
                    <button style={{
                        marginLeft: 'var(--spacing-4)',
                        backgroundColor: 'var(--color-primary)',
                        color: '#000',
                        padding: '16px 48px',
                        borderRadius: '4px',
                        fontWeight: 800,
                        fontSize: '1.1rem'
                    }}>BUILD YOUR QUOTE</button>
                </div>
            </section>
        </div>
    );
};

export default DryHire;
