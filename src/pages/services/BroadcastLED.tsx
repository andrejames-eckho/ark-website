import React from 'react';
import { Camera, Monitor, Cpu, Globe, Play } from 'lucide-react';

const BroadcastLED: React.FC<{ onOpenQuoteForm?: () => void }> = ({ onOpenQuoteForm }) => {
    return (
        <div className="page-transition">
            {/* Hero Section */}
            <section style={{
                padding: 'var(--spacing-12) 0',
                backgroundColor: 'var(--color-bg)',
                textAlign: 'center',
                borderBottom: '1px solid var(--color-border)',
                background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("/led-broadcast-bg.png") center/cover'
            }}>
                <div className="container">
                    <Camera size={64} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                    <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-2)' }}>BROADCAST & <span style={{ color: 'var(--color-primary)' }}>LED WORKS</span></h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        High-resolution visual impact and broadcast-grade production for a global audience. We bring cinematic quality to every screen.
                    </p>
                </div>
            </section>

            {/* Tech Specs Section - PRG influence (technical depth) */}
            <section style={{ padding: 'var(--spacing-12) 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-12)', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-6)' }}>VISUAL <span style={{ color: 'var(--color-primary)' }}>PRECISION</span></h2>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-8)', fontSize: '1.1rem' }}>
                                Our LED solutions utilize ultra-high pitch panels and advanced processing power to deliver flick-free, color-accurate visuals that look stunning both in person and on camera.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-6)' }}>
                                <div style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: 'var(--spacing-3)' }}>
                                    <h4 style={{ marginBottom: '4px' }}>Pixel Perfect</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>From 1.5mm to 3.9mm indoor/outdoor solutions.</p>
                                </div>
                                <div style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: 'var(--spacing-3)' }}>
                                    <h4 style={{ marginBottom: '4px' }}>HDR Ready</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>10-bit color depth for lifelike reproduction.</p>
                                </div>
                                <div style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: 'var(--spacing-3)' }}>
                                    <h4 style={{ marginBottom: '4px' }}>Zero Latency</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Professional media servers for real-time playback.</p>
                                </div>
                                <div style={{ borderLeft: '2px solid var(--color-primary)', paddingLeft: 'var(--spacing-3)' }}>
                                    <h4 style={{ marginBottom: '4px' }}>Multi-Cam Sync</h4>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Genlock and timecode for broadcast stability.</p>
                                </div>
                            </div>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                height: '400px',
                                backgroundColor: 'var(--color-surface)',
                                borderRadius: '12px',
                                border: '1px solid var(--color-border)',
                                overflow: 'hidden'
                            }}>
                                <div style={{
                                    height: '100%',
                                    background: 'url("/led-wall-demo.png") center/cover',
                                    filter: 'brightness(0.7)'
                                }}></div>
                            </div>
                            <div style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: '80px',
                                height: '80px',
                                backgroundColor: 'rgba(220, 38, 38, 0.8)',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid var(--color-text)'
                            }}>
                                <Play size={32} fill="var(--color-text)" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Broadcast Services */}
            <section style={{ padding: 'var(--spacing-12) 0', backgroundColor: 'var(--color-surface)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>BROADCAST <span style={{ color: 'var(--color-primary)' }}>CAPABILITIES</span></h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-6)' }}>
                        <div style={{ padding: 'var(--spacing-6)', textAlign: 'center' }}>
                            <Monitor size={48} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)', margin: '0 auto var(--spacing-4)' }} />
                            <h3>Multi-Cam Production</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Expertly mixed live streams and recordings using cinematic camera systems and professional switchers.</p>
                        </div>
                        <div style={{ padding: 'var(--spacing-6)', textAlign: 'center' }}>
                            <Globe size={48} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)', margin: '0 auto var(--spacing-4)' }} />
                            <h3>Global Streaming</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Redundant internet bonding and global CDN distribution for glitch-free viewing anywhere.</p>
                        </div>
                        <div style={{ padding: 'var(--spacing-6)', textAlign: 'center' }}>
                            <Cpu size={48} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)', margin: '0 auto var(--spacing-4)' }} />
                            <h3>Real-time Color</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Live color grading and LUT application to ensure your brand's visual identity remains consistent.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: 'var(--spacing-12) 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-6)' }}>WANT TO MAKE A <span style={{ color: 'var(--color-primary)' }}>VISUAL IMPACT?</span></h2>
                    <button 
                        onClick={onOpenQuoteForm}
                        style={{
                            backgroundColor: 'var(--color-primary)',
                            color: '#000',
                            padding: '16px 48px',
                            borderRadius: '4px',
                            fontWeight: 800,
                            fontSize: '1.1rem',
                            cursor: 'pointer'
                        }}>CONSULT WITH A VIDEO ENGINEER</button>
                </div>
            </section>
        </div>
    );
};

export default BroadcastLED;
