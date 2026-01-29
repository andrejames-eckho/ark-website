import React from 'react';
import { Shield, Users, Globe, Award } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="about-page">
            {/* Hero Section */}
            <section style={{
                padding: 'var(--spacing-12) 0',
                background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("/about-hero.png") center/cover',
                textAlign: 'center',
                borderBottom: '1px solid var(--color-border)'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-2)' }}>THE <span style={{ color: 'var(--color-primary)' }}>ARK</span> HERITAGE</h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        Providing world-class audio, lighting, and production technology since 2005.
                    </p>
                </div>
            </section>

            {/* Story Section */}
            <section style={{ padding: 'var(--spacing-12) 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-8)', alignItems: 'center' }}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-4)' }}>UNCOMPROMISING <span style={{ color: 'var(--color-primary)' }}>STANDARDS</span></h2>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-4)', fontSize: '1.1rem' }}>
                                Founded with a mission to bridge the gap between technical complexity and creative execution, ARK PRO has grown from a boutique audio rental house into a global leader in event technology.
                            </p>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-4)', fontSize: '1.1rem' }}>
                                We don't just rent gear; we provide the foundation for unforgettable experiences. Every microphone, every cable, and every lighting fixture is treated with the same level of professional scrutiny.
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-4)', marginTop: 'var(--spacing-6)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Shield color="var(--color-primary)" />
                                    <span style={{ fontWeight: 600 }}>Elite Quality Control</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Users color="var(--color-primary)" />
                                    <span style={{ fontWeight: 600 }}>Specialist Technicians</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Globe color="var(--color-primary)" />
                                    <span style={{ fontWeight: 600 }}>Global Logistics</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Award color="var(--color-primary)" />
                                    <span style={{ fontWeight: 600 }}>Industry Certified</span>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            backgroundColor: 'var(--color-surface)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            border: '1px solid var(--color-border)',
                            aspectRatio: '16/10'
                        }}>
                            <div style={{ width: '100%', height: '100%', background: 'url("/warehouse.png") center/cover' }}></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values - Grid */}
            <section style={{ padding: 'var(--spacing-12) 0', backgroundColor: 'var(--color-surface)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
                        <h2 style={{ fontSize: '2.5rem' }}>OUR <span style={{ color: 'var(--color-primary)' }}>CORE VALUES</span></h2>
                        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: 'var(--spacing-2) auto' }}></div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-4)' }}>
                        {[
                            { title: 'Technical Excellence', desc: 'We maintain the highest standards of technical preparedness in the industry.' },
                            { title: 'Partner First', desc: 'We work as an extension of your team, not just a service provider.' },
                            { title: 'Innovation', desc: 'Constantly investing in the latest technology to keep your events on the cutting edge.' },
                            { title: 'Reliability', desc: '24/7 support and redundant systems ensure your show always goes on.' }
                        ].map((value, i) => (
                            <div key={i} style={{
                                padding: 'var(--spacing-6)',
                                backgroundColor: 'var(--color-bg)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px'
                            }}>
                                <h3 style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-2)' }}>{value.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
