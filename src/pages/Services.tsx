import React from 'react';
import { Camera, Music, Zap, Settings, ArrowRight } from 'lucide-react';

const Services: React.FC = () => {
    const services = [
        {
            title: 'Full Production Services',
            desc: 'From concept to completion, we provide turnkey technical production for concerts, festivals, and corporate summits.',
            icon: Music,
            features: ['Sound Design & Reinforcement', 'Dynamic Lighting Plots', 'Stage Management', 'Livestreaming & Broadcast']
        },
        {
            title: 'Dry Hire Rentals',
            desc: 'Professional gear rentals for when you have the team but need the best equipment in the world.',
            icon: Settings,
            features: ['Meticulous QC Process', 'Customized Road Cases', 'Flexible Pick-up/Drop-off', '24/7 Technical Support']
        },
        {
            title: 'Installation & Integration',
            desc: 'Permanent AV solutions for venues, corporate offices, and broadcast studios.',
            icon: Zap,
            features: ['System Consultation', 'Procurement & Licensing', 'Acoustic Treatment', 'Custom Rack Integration']
        },
        {
            title: 'Broadcast & LED Works',
            desc: 'High-resolution LED walls and broadcast-grade camera systems for visual impact.',
            icon: Camera,
            features: ['Ultra-High Pitch LED Walls', 'Multi-Cam Switching', 'Media Server Management', 'Real-time Color Grading']
        }
    ];

    return (
        <div className="services-page">
            {/* Hero Section */}
            <section style={{
                padding: 'var(--spacing-12) 0',
                backgroundColor: 'var(--color-bg)',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-2)' }}>OUR <span style={{ color: 'var(--color-primary)' }}>SOLUTIONS</span></h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        We don't just provide equipment; we deliver engineering excellence for every scale of event.
                    </p>
                </div>
            </section>

            {/* Services List */}
            <section style={{ paddingBottom: 'var(--spacing-12)' }}>
                <div className="container">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
                        {services.map((service, i) => (
                            <div key={i} style={{
                                display: 'grid',
                                gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
                                gap: 'var(--spacing-8)',
                                backgroundColor: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '12px',
                                overflow: 'hidden',
                                padding: 'var(--spacing-8)',
                                alignItems: 'center',
                                direction: i % 2 === 0 ? 'ltr' : 'rtl'
                            }}>
                                <div style={{ direction: 'ltr' }}>
                                    <service.icon size={48} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                                    <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-3)' }}>{service.title}</h2>
                                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem', marginBottom: 'var(--spacing-6)' }}>
                                        {service.desc}
                                    </p>
                                    <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                                        {service.features.map((feat, j) => (
                                            <li key={j} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem' }}>
                                                <div style={{ width: '6px', height: '6px', backgroundColor: 'var(--color-primary)', borderRadius: '50%' }}></div>
                                                {feat}
                                            </li>
                                        ))}
                                    </ul>
                                    <button style={{
                                        marginTop: 'var(--spacing-8)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '8px',
                                        color: 'var(--color-primary)',
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        textTransform: 'uppercase'
                                    }}>
                                        LEARN MORE ABOUT THIS SERVICE <ArrowRight size={18} />
                                    </button>
                                </div>
                                <div style={{
                                    height: '350px',
                                    borderRadius: '8px',
                                    background: `linear-gradient(rgba(220, 38, 38, 0.1), rgba(0,0,0,0.5)), url("/service-${i + 1}.png") center/cover`,
                                    border: '1px solid var(--color-border)'
                                }}></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quote Block - PRG inspired */}
            <section style={{ padding: 'var(--spacing-12) 0', backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-border)' }}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-6)' }}>HAVE A <span style={{ color: 'var(--color-primary)' }}>UNIQUE PROBLEM?</span></h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto var(--spacing-8)' }}>
                        Our engineering team specializes in custom technical solutions for complex environments. Let's build something extraordinary together.
                    </p>
                    <button style={{
                        backgroundColor: 'var(--color-primary)',
                        color: '#000',
                        padding: '16px 48px',
                        borderRadius: '4px',
                        fontWeight: 800,
                        fontSize: '1.1rem'
                    }}>CONSULT WITH AN EXPERT</button>
                </div>
            </section>
        </div>
    );
};

export default Services;
