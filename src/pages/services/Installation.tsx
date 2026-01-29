import React from 'react';
import { Zap, Layout, HardDrive, Cpu } from 'lucide-react';

const Installation: React.FC = () => {
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
                    <Zap size={64} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                    <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-2)' }}>INSTALLATION & <span style={{ color: 'var(--color-primary)' }}>INTEGRATION</span></h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        Transforming spaces with permanent, high-performance AV environments. From corporate boardrooms to world-class performance venues.
                    </p>
                </div>
            </section>

            {/* Solutions Grid */}
            <section style={{ padding: 'var(--spacing-12) 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-4)' }}>
                        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-8)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <Layout size={40} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-3)' }}>Venue Systems</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-4)' }}>Turnkey audio, lighting, and video systems for clubs, theaters, and houses of worship.</p>
                            <ul style={{ listStyle: 'none', color: 'var(--color-text-muted)' }}>
                                <li>• Acoustic Modeling</li>
                                <li>• Rigging Engineering</li>
                                <li>• Show Control Automation</li>
                            </ul>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-8)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <Cpu size={40} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-3)' }}>Corporate AV</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-4)' }}>Seamless integration into corporate environments for high-stakes communication.</p>
                            <ul style={{ listStyle: 'none', color: 'var(--color-text-muted)' }}>
                                <li>• Zoom/Teams Rooms</li>
                                <li>• Distributed Audio</li>
                                <li>• Smart Control Interfaces</li>
                            </ul>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-8)', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                            <HardDrive size={40} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                            <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--spacing-3)' }}>Custom Integration</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-4)' }}>Bespoke technical solutions for studios, experiential spaces, and retail environments.</p>
                            <ul style={{ listStyle: 'none', color: 'var(--color-text-muted)' }}>
                                <li>• Media Server Pipelines</li>
                                <li>• Custom Rack Builds</li>
                                <li>• Fiber Optic Backbones</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Partnership Section - Rentex influence (reliability) */}
            <section style={{ padding: 'var(--spacing-12) 0', backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-12)', alignItems: 'center' }}>
                    <div style={{
                        height: '450px',
                        background: 'linear-gradient(to right, rgba(0,0,0,0.8), transparent), url("/integration-tech.png") center/cover',
                        borderRadius: '12px',
                        border: '1px solid var(--color-border)'
                    }}></div>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-4)' }}>ENGINEERING <span style={{ color: 'var(--color-primary)' }}>LONGEVITY</span></h2>
                        <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-6)', fontSize: '1.1rem' }}>
                            We don't just install gear; we build sustainable ecosystems. Our integration team prioritizes serviceability, stability, and scale, ensuring your investment pays off for years to come.
                        </p>
                        <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
                            <div>
                                <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>24/7 Monitoring</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Remote system health checks for mission-critical venues.</p>
                            </div>
                            <div>
                                <h4 style={{ color: 'var(--color-primary)', marginBottom: '4px' }}>Maintenance Contracts</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Proactive service plans to prevent technical downtime.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: 'var(--spacing-12) 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-6)' }}>CONSULT WITH OUR <span style={{ color: 'var(--color-primary)' }}>SYSTEM DESIGNERS</span></h2>
                    <button style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#000',
                        padding: '16px 48px',
                        borderRadius: '4px',
                        fontWeight: 800,
                        fontSize: '1.1rem'
                    }}>REQUEST A SITE VISIT</button>
                </div>
            </section>
        </div>
    );
};

export default Installation;
