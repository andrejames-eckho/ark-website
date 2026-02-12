import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, Speaker, Lightbulb, TowerControl as Rigging, Monitor, Video, Loader2 } from 'lucide-react';
import { fetchCategories, fetchEquipment } from '../services/equipmentService';
import { Category, EquipmentWithCategory } from '../types/equipment';

interface HomeProps {
    onOpenQuoteForm: () => void;
}

const Home: React.FC<HomeProps> = ({ onOpenQuoteForm }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [equipmentItems, setEquipmentItems] = useState<EquipmentWithCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Load data on component mount
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setLoading(true);
        try {
            const [categoriesData, equipmentData] = await Promise.all([
                fetchCategories(),
                fetchEquipment()
            ]);
            
            setCategories(categoriesData);
            setEquipmentItems(equipmentData);
        } catch (err) {
            console.error('Error loading data:', err);
        } finally {
            setLoading(false);
        }
    };

    const getCategoryIcon = (iconName: string) => {
        const icons: Record<string, React.ComponentType<any>> = {
            'Speaker': Speaker,
            'Lightbulb': Lightbulb,
            'Rigging': Rigging,
            'Video': Video,
            'Monitor': Monitor,
        };
        return icons[iconName] || Video;
    };

    const getCategoryCount = (categoryId: number) => {
        return equipmentItems.filter(item => item.category_id === categoryId).length;
    };

    const handleCategoryClick = (categoryId: number) => {
        navigate(`/equipment?category=${categoryId}`);
    };

    return (
        <>
            {/* Hero */}
            <section className="hero" style={{
                padding: 'var(--spacing-12) 0',
                minHeight: '80vh',
                display: 'flex',
                alignItems: 'center',
                position: 'relative',
                textAlign: 'center'
            }}>
                {/* Video Background */}
                <video
                    className="hero-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        zIndex: -2
                    }}
                >
                    <source src="/hero_video.mp4" type="video/mp4" />
                    {/* Fallback for browsers that don't support video */}
                    Your browser does not support the video tag.
                </video>
                
                {/* Overlay for text readability */}
                <div 
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7))',
                        zIndex: -1
                    }}
                />
                
                <div className="container">
                    <h1 style={{ 
                        fontSize: 'clamp(2rem, 8vw, 4rem)', 
                        marginBottom: 'var(--spacing-2)', 
                        maxWidth: '800px', 
                        margin: '0 auto var(--spacing-2)',
                        lineHeight: 1.1
                    }}>
                        PRO GEAR. <br /> <span style={{ color: 'var(--color-primary)' }}>PROFESSIONAL RESULTS.</span>
                    </h1>
                    <p style={{ 
                        fontSize: 'clamp(1rem, 4vw, 1.25rem)', 
                        color: 'var(--color-text-muted)', 
                        marginBottom: 'var(--spacing-6)', 
                        maxWidth: '600px', 
                        margin: '0 auto var(--spacing-6)',
                        lineHeight: 1.5
                    }}>
                        Empowering your events with world-class audio, lighting, and production equipment.
                    </p>
                    <div style={{ 
                        display: 'flex', 
                        gap: 'var(--spacing-3)', 
                        justifyContent: 'center', 
                        flexWrap: 'wrap',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <Link 
                            to="/equipment"
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                color: '#000',
                                padding: '16px 32px',
                                borderRadius: '4px',
                                fontWeight: 800,
                                fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                transition: 'var(--transition-fast)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                textDecoration: 'none',
                                width: '100%',
                                maxWidth: '300px',
                                justifyContent: 'center'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-primary-hover)';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            CHECKOUT OUR EQUIPMENT <ChevronRight size={20} />
                        </Link>
                        <button
                            onClick={onOpenQuoteForm}
                            style={{
                                backgroundColor: 'transparent',
                                border: '2px solid var(--color-primary)',
                                color: 'var(--color-primary)',
                                padding: '14px 32px',
                                borderRadius: '4px',
                                fontWeight: 800,
                                fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                transition: 'var(--transition-fast)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                width: '100%',
                                maxWidth: '300px',
                                justifyContent: 'center'
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                                e.currentTarget.style.color = '#000';
                                e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                                e.currentTarget.style.color = 'var(--color-primary)';
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            GET A QUOTE
                        </button>
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
                        <Link 
                            to="/equipment" 
                            style={{ color: 'var(--color-primary)', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600, textDecoration: 'none' }}
                        >
                            VIEW ALL EQUIPMENT <ChevronRight size={18} />
                        </Link>
                    </div>

                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'var(--spacing-8)' }}>
                            <Loader2 className="animate-spin" size={32} color="var(--color-primary)" />
                        </div>
                    ) : (
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                            gap: 'var(--spacing-3)'
                        }}>
                            {categories.map((cat) => {
                                const IconComponent = getCategoryIcon(cat.icon_name);
                                const count = getCategoryCount(cat.id);
                                
                                return (
                                    <div 
                                        key={cat.id} 
                                        className="category-card" 
                                        style={{
                                            backgroundColor: 'var(--color-surface)',
                                            padding: 'var(--spacing-4)',
                                            borderRadius: '8px',
                                            border: '1px solid var(--color-border)',
                                            transition: 'var(--transition-normal)',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            overflow: 'hidden'
                                        }}
                                        onClick={() => handleCategoryClick(cat.id)}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-4px)';
                                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.borderColor = 'var(--color-border)';
                                        }}
                                    >
                                        <div style={{ color: 'var(--color-primary)', marginBottom: 'var(--spacing-2)' }}>
                                            <IconComponent size={32} />
                                        </div>
                                        <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{cat.name}</h3>
                                        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem' }}>{count} Items</p>
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
                                );
                            })}
                        </div>
                    )}
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
                        <button
                            onClick={onOpenQuoteForm}
                            style={{
                                backgroundColor: '#000',
                                color: '#fff',
                                padding: '16px 40px',
                                borderRadius: '4px',
                                fontWeight: 800,
                                fontSize: '1.1rem',
                                cursor: 'pointer'
                            }}
                        >GET A QUOTE NOW</button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
