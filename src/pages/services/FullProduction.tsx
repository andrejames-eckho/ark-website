import React from 'react';
import { Music, CheckCircle, Users, Activity, Sliders } from 'lucide-react';

const FullProduction: React.FC<{ onOpenQuoteForm?: () => void }> = ({ onOpenQuoteForm }) => {
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
                    <Music size={64} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                    <h1 style={{ fontSize: '3.5rem', marginBottom: 'var(--spacing-2)' }}>FULL PRODUCTION <span style={{ color: 'var(--color-primary)' }}>SERVICES</span></h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '800px', margin: '0 auto' }}>
                        Turnkey technical engineering for concerts, festivals, and high-stakes corporate summits. We handle the complexity so you can focus on the performance.
                    </p>
                </div>
            </section>

            {/* Core Competencies */}
            <section style={{ padding: 'var(--spacing-12) 0' }}>
                <div className="container">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-6)' }}>
                        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-6)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                            <Sliders size={32} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                            <h3 style={{ marginBottom: 'var(--spacing-2)' }}>Sound Design & Reinforcement</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Precision acoustic modeling and high-fidelity sound systems tailored for any venue size.</p>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-6)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                            <Activity size={32} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                            <h3 style={{ marginBottom: 'var(--spacing-2)' }}>Dynamic Lighting Plots</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Immersive lighting environments designed to enhance visual impact and emotional resonance.</p>
                        </div>
                        <div style={{ backgroundColor: 'var(--color-surface)', padding: 'var(--spacing-6)', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
                            <Users size={32} color="var(--color-primary)" style={{ marginBottom: 'var(--spacing-4)' }} />
                            <h3 style={{ marginBottom: 'var(--spacing-2)' }}>Stage Management</h3>
                            <p style={{ color: 'var(--color-text-muted)' }}>Expert coordination of all technical departments to ensure seamless transitions and execution.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Process - Result-Centric like Meeting Tomorrow */}
            <section style={{ padding: 'var(--spacing-12) 0', backgroundColor: 'var(--color-surface)' }}>
                <div className="container">
                    <h2 style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>THE <span style={{ color: 'var(--color-primary)' }}>EXPERIENCE-FIRST</span> PROCESS</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-12)', alignItems: 'center' }}>
                        <div>
                            <h3 style={{ fontSize: '1.75rem', marginBottom: 'var(--spacing-4)' }}>Consultative Planning</h3>
                            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-6)' }}>
                                We don't just supply gear; we partner with you to understand your objectives. Our engineers translate your vision into a robust technical blueprint.
                            </p>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <li style={{ display: 'flex', gap: '12px' }}><CheckCircle size={20} color="var(--color-primary)" /> Site Surveys & Technical Feasibility</li>
                                <li style={{ display: 'flex', gap: '12px' }}><CheckCircle size={20} color="var(--color-primary)" /> 3D Visualizations & Sound Mapping</li>
                                <li style={{ display: 'flex', gap: '12px' }}><CheckCircle size={20} color="var(--color-primary)" /> Budget Optimization & Scalability</li>
                            </ul>
                        </div>
                        <div style={{
                            height: '400px',
                            backgroundColor: 'rgba(255,255,255,0.05)',
                            borderRadius: '12px',
                            border: '1px solid var(--color-border)',
                            background: 'linear-gradient(rgba(220, 38, 38, 0.1), rgba(0,0,0,0.5)), url("/production-process.png") center/cover'
                        }}></div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section style={{ padding: 'var(--spacing-12) 0', textAlign: 'center' }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-4)' }}>READY TO <span style={{ color: 'var(--color-primary)' }}>ELEVATE YOUR EVENT?</span></h2>
                    <p style={{ marginBottom: 'var(--spacing-8)', color: 'var(--color-text-muted)' }}>Let our experts handle the technical heavy lifting.</p>
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
                        }}>START YOUR CONSULTATION</button>
                </div>
            </section>
        </div>
    );
};

export default FullProduction;
