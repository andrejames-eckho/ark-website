import React from 'react';
import { Search, ChevronRight, Speaker, Lightbulb, TowerControl as Rigging, Phone, Mail, MapPin } from 'lucide-react';

const App: React.FC = () => {
    return (
        <div className="app">
            {/* Header */}
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
                    <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ color: 'var(--color-primary)' }}>ARK</span> PRO Audio and Lights
                    </div>
                    <nav style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
                        <a href="#equipment" style={{ fontWeight: 500, fontSize: '0.9rem' }}>EQUIPMENT</a>
                        <a href="#services" style={{ fontWeight: 500, fontSize: '0.9rem' }}>SERVICES</a>
                        <a href="#about" style={{ fontWeight: 500, fontSize: '0.9rem' }}>ABOUT</a>
                        <button style={{
                            backgroundColor: 'var(--color-primary)',
                            color: '#000',
                            padding: '8px 20px',
                            borderRadius: '4px',
                            fontWeight: 700,
                            fontSize: '0.85rem'
                        }}>GET A QUOTE</button>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section className="hero" style={{
                padding: 'var(--spacing-12) 0',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url("/hero.png") center/cover',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '4rem', marginBottom: 'var(--spacing-2)', maxWidth: '800px', margin: '0 auto var(--spacing-2)' }}>
                        PRO GEAR. <br /> <span style={{ color: 'var(--color-primary)' }}>PROFESSIONAL RESULTS.</span>
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-6)', maxWidth: '600px', margin: '0 auto var(--spacing-6)' }}>
                        Empowering your events with world-class audio, lighting, and production equipment.
                    </p>

                    {/* Sharegrid inspired search */}
                    <div className="search-bar" style={{
                        maxWidth: '700px',
                        margin: '0 auto',
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                    }}>
                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', padding: '0 16px' }}>
                            <Search size={20} color="#666" />
                            <input type="text" placeholder="Search for speakers, mixers, lights..." style={{
                                width: '100%',
                                padding: '16px',
                                border: 'none',
                                outline: 'none',
                                fontSize: '1rem',
                                color: '#000'
                            }} />
                        </div>
                        <button style={{
                            backgroundColor: 'var(--color-primary)',
                            color: '#000',
                            padding: '16px 32px',
                            borderRadius: '4px',
                            fontWeight: 700
                        }}>SEARCH</button>
                    </div>
                </div>
            </section>

            {/* Categories - Sharegrid inspired grid */}
            <section id="equipment" style={{ padding: 'var(--spacing-12) 0' }}>
                <div className="container">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 'var(--spacing-6)' }}>
                        <div>
                            <h2 style={{ fontSize: '2rem' }}>BROWSE <span style={{ color: 'var(--color-primary)' }}>BY CATEGORY</span></h2>
                            <p style={{ color: 'var(--color-text-muted)' }}>The best gear in the industry, ready for your next event.</p>
                        </div>
                        <a href="#" style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                            VIEW ALL EQUIPMENT <ChevronRight size={18} />
                        </a>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: 'var(--spacing-3)'
                    }}>
                        {[
                            { name: 'Audio', icon: <Speaker />, count: '450+ Items' },
                            { name: 'Lighting', icon: <Lightbulb />, count: '320+ Items' },
                            { name: 'Rigging', icon: <Rigging />, count: '120+ Items' },
                            { name: 'Video', icon: <Search />, count: '85+ Items' },
                            { name: 'Monitors', icon: <Search />, count: '50+ Items' },
                            { name: 'Projection', icon: <Search />, count: '40+ Items' }
                        ].map((cat, i) => (
                            <div key={i} className="category-card" style={{
                                backgroundColor: 'var(--color-surface)',
                                padding: 'var(--spacing-4)',
                                borderRadius: '8px',
                                border: '1px solid var(--color-border)',
                                transition: 'var(--transition-normal)',
                                cursor: 'pointer',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-2)' }}>
                                    {cat.icon}
                                </div>
                                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{cat.name}</h3>
                                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{cat.count}</p>
                                <div style={{
                                    position: 'absolute',
                                    bottom: 'var(--spacing-4)',
                                    right: 'var(--spacing-4)',
                                    opacity: 0,
                                    transition: 'var(--transition-fast)'
                                }}>
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features - PRG gear influence */}
            <section id="services" style={{ padding: 'var(--spacing-12) 0', backgroundColor: 'var(--color-surface)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-8)' }}>
                        <h2 style={{ fontSize: '2.5rem' }}>THE ARK <span style={{ color: 'var(--color-primary)' }}>ADVANTAGE</span></h2>
                        <div style={{ width: '60px', height: '4px', backgroundColor: 'var(--color-primary)', margin: 'var(--spacing-2) auto' }}></div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-6)' }}>
                        {[
                            { title: 'EXPERT PREP & QC', desc: 'Every piece of gear is meticulously tested and inspected by our specialist technicians before every show.' },
                            { title: 'GLOBAL INVENTORY', desc: 'Access to the world\'s largest pool of professional event technology and production gear.' },
                            { title: 'SPECIALIST SUPPORT', desc: 'Our team of world-class experts is available to help you design and execute the perfect technical solution.' }
                        ].map((feat, i) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <h3 style={{ marginBottom: 'var(--spacing-2)', color: 'var(--color-primary)' }}>{feat.title}</h3>
                                <p style={{ color: 'var(--color-text-muted)' }}>{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section - Rent For Event style */}
            <section style={{
                padding: 'var(--spacing-12) 0',
                background: 'var(--color-primary)',
                color: '#000',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-2)' }}>READY TO START YOUR EVENT?</h2>
                    <p style={{ fontSize: '1.2rem', marginBottom: 'var(--spacing-6)', fontWeight: 500 }}>
                        Get a custom quote in minutes for your audio and lighting needs.
                    </p>
                    <div style={{ display: 'flex', gap: 'var(--spacing-2)', justifyContent: 'center' }}>
                        <button style={{
                            backgroundColor: '#000',
                            color: '#fff',
                            padding: '16px 40px',
                            borderRadius: '4px',
                            fontWeight: 800,
                            fontSize: '1.1rem'
                        }}>GET A QUOTE NOW</button>
                        <button style={{
                            backgroundColor: 'transparent',
                            border: '2px solid #000',
                            color: '#000',
                            padding: '16px 40px',
                            borderRadius: '4px',
                            fontWeight: 800,
                            fontSize: '1.1rem'
                        }}>CALL OUR EXPERTS</button>
                    </div>
                </div>
            </section>

            {/* Footer */}
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
                                <li><a href="#">Audio Rental</a></li>
                                <li><a href="#">Lighting Rental</a></li>
                                <li><a href="#">LED & Video</a></li>
                                <li><a href="#">Rigging Solutions</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: 'var(--spacing-3)' }}>COMPANY</h4>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                                <li><a href="#">Our Story</a></li>
                                <li><a href="#">Locations</a></li>
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

            {/* Add subtle hover animations for cards via inline style block */}
            <style>{`
        .category-card:hover { border-color: var(--color-primary) !important; background-color: var(--color-surface-hover) !important; transform: translateY(-4px); }
        .category-card:hover div:last-child { opacity: 1 !important; }
        nav a:hover { color: var(--color-primary); }
      `}</style>
        </div>
    );
};

export default App;
