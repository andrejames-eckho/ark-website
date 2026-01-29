import React, { useState } from 'react';
import { Search, Filter, Speaker, Lightbulb, TowerControl as Rigging, Monitor, Video, ChevronRight } from 'lucide-react';

const Equipment: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { id: 'audio', name: 'Audio', icon: Speaker, count: 450 },
        { id: 'lighting', name: 'Lighting', icon: Lightbulb, count: 320 },
        { id: 'rigging', name: 'Rigging', icon: Rigging, count: 120 },
        { id: 'video', name: 'Video', icon: Video, count: 85 },
        { id: 'monitors', name: 'Monitors', icon: Monitor, count: 50 },
        { id: 'projection', name: 'Projection', icon: Video, count: 40 },
    ];

    const equipmentItems = [
        { name: 'L-Acoustics K2', category: 'Audio', image: 'https://placehold.co/400x300/121212/dc2626?text=L-Acoustics+K2' },
        { name: 'MA Lighting grandMA3', category: 'Lighting', image: 'https://placehold.co/400x300/121212/dc2626?text=grandMA3' },
        { name: 'Robe MegaPointe', category: 'Lighting', image: 'https://placehold.co/400x300/121212/dc2626?text=Robe+MegaPointe' },
        { name: 'Shure Axient Digital', category: 'Audio', image: 'https://placehold.co/400x300/121212/dc2626?text=Axient+Digital' },
        { name: 'Christie M 4K25', category: 'Projection', image: 'https://placehold.co/400x300/121212/dc2626?text=Christie+M+4K25' },
        { name: 'Blackmagic Constellation', category: 'Video', image: 'https://placehold.co/400x300/121212/dc2626?text=BMD+Constellation' },
    ];

    return (
        <div className="equipment-page">
            {/* Search Header */}
            <section style={{ padding: 'var(--spacing-8) 0', borderBottom: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
                <div className="container">
                    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
                        <div style={{ flex: 1, position: 'relative' }}>
                            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-muted)' }} size={20} />
                            <input
                                type="text"
                                placeholder="Search inventory (e.g. 'Line Array', 'Moving Head', 'Mixer')..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '16px 16px 16px 52px',
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--color-bg)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text)',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <button style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '16px 24px',
                            border: '1px solid var(--color-border)',
                            borderRadius: '8px',
                            backgroundColor: 'var(--color-bg)',
                            fontWeight: 600
                        }}>
                            <Filter size={20} /> FILTERS
                        </button>
                    </div>
                </div>
            </section>

            <div className="container" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: 'var(--spacing-8)', padding: 'var(--spacing-8) 0' }}>
                {/* Categories Sidebar */}
                <aside>
                    <h3 style={{ marginBottom: 'var(--spacing-4)', fontSize: '1rem', color: 'var(--color-text-muted)' }}>CATEGORIES</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {categories.map((cat) => (
                            <button key={cat.id} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                borderRadius: '6px',
                                textAlign: 'left',
                                width: '100%',
                                transition: 'var(--transition-fast)',
                                backgroundColor: 'transparent',
                                color: 'var(--color-text)'
                            }}>
                                <cat.icon size={18} color="var(--color-primary)" />
                                <span style={{ flex: 1 }}>{cat.name}</span>
                                <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{cat.count}</span>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Equipment Grid */}
                <main>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-6)' }}>
                        <h2 style={{ fontSize: '1.5rem' }}>PRO <span style={{ color: 'var(--color-primary)' }}>INVENTORY</span></h2>
                        <span style={{ color: 'var(--color-text-muted)' }}>Showing {equipmentItems.length} items</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-4)' }}>
                        {equipmentItems.map((item, i) => (
                            <div key={i} className="gear-card" style={{
                                backgroundColor: 'var(--color-surface)',
                                border: '1px solid var(--color-border)',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                transition: 'var(--transition-normal)',
                                cursor: 'pointer'
                            }}>
                                <div style={{ height: '200px', backgroundColor: '#000', overflow: 'hidden' }}>
                                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                                </div>
                                <div style={{ padding: 'var(--spacing-4)' }}>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase' }}>{item.category}</span>
                                    <h4 style={{ margin: '4px 0 var(--spacing-4)', fontSize: '1.1rem' }}>{item.name}</h4>
                                    <button style={{
                                        width: '100%',
                                        padding: '12px',
                                        backgroundColor: 'transparent',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '4px',
                                        color: 'var(--color-text)',
                                        fontWeight: 600,
                                        fontSize: '0.9rem',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        gap: '8px'
                                    }}>
                                        ADD TO QUOTE <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
            <style>{`
                .gear-card:hover { transform: translateY(-4px); border-color: var(--color-primary); }
                .gear-card:hover img { opacity: 1; transform: scale(1.05); }
                .gear-card img { transition: transform 0.5s ease; }
            `}</style>
        </div>
    );
};

export default Equipment;
