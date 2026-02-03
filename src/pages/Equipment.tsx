import React, { useState, useEffect } from 'react';
import { Search, Filter, Speaker, Lightbulb, TowerControl as Rigging, Monitor, Video, ChevronRight, Loader2 } from 'lucide-react';
import { fetchEquipment, fetchCategories, searchEquipment, fetchEquipmentByCategory } from '../services/equipmentService';
import { EquipmentWithCategory, Category } from '../types/equipment';
import { getPlaceholderImage } from '../utils/imageHelper';

const Equipment: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [equipmentItems, setEquipmentItems] = useState<EquipmentWithCategory[]>([]);
    const [allEquipmentItems, setAllEquipmentItems] = useState<EquipmentWithCategory[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load data on component mount
    useEffect(() => {
        loadData();
    }, []);

    // Load data whenever category or search changes
    useEffect(() => {
        if (selectedCategory !== null) {
            loadEquipmentByCategory(selectedCategory);
        } else if (searchQuery) {
            searchEquipmentData(searchQuery);
        } else {
            loadAllEquipment();
        }
    }, [selectedCategory, searchQuery]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const [categoriesData, equipmentData] = await Promise.all([
                fetchCategories(),
                fetchEquipment()
            ]);
            
            setCategories(categoriesData);
            setEquipmentItems(equipmentData);
            setAllEquipmentItems(equipmentData);
        } catch (err) {
            setError('Failed to load equipment data');
            console.error('Error loading data:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadAllEquipment = async () => {
        setLoading(true);
        try {
            const data = await fetchEquipment();
            setEquipmentItems(data);
        } catch (err) {
            setError('Failed to load equipment');
            console.error('Error loading equipment:', err);
        } finally {
            setLoading(false);
        }
    };

    const loadEquipmentByCategory = async (categoryId: number) => {
        setLoading(true);
        try {
            const data = await fetchEquipmentByCategory(categoryId);
            setEquipmentItems(data);
        } catch (err) {
            setError('Failed to load equipment by category');
            console.error('Error loading equipment by category:', err);
        } finally {
            setLoading(false);
        }
    };

    const searchEquipmentData = async (query: string) => {
        setLoading(true);
        try {
            const data = await searchEquipment(query);
            setEquipmentItems(data);
        } catch (err) {
            setError('Failed to search equipment');
            console.error('Error searching equipment:', err);
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
        return allEquipmentItems.filter(item => item.category_id === categoryId).length;
    };

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
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setSelectedCategory(null); // Clear category filter when searching
                                }}
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
                        <button 
                            key="all"
                            onClick={() => {
                                setSelectedCategory(null);
                                setSearchQuery('');
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                padding: '12px',
                                borderRadius: '6px',
                                textAlign: 'left',
                                width: '100%',
                                transition: 'var(--transition-fast)',
                                backgroundColor: selectedCategory === null ? 'var(--color-primary)' : 'transparent',
                                color: selectedCategory === null ? '#000' : 'var(--color-text)'
                            }}
                        >
                            <span>All Categories</span>
                            <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginLeft: 'auto' }}>{allEquipmentItems.length}</span>
                        </button>
                        {categories.map((cat) => {
                            const IconComponent = getCategoryIcon(cat.icon_name);
                            return (
                                <button 
                                    key={cat.id} 
                                    onClick={() => {
                                        setSelectedCategory(cat.id);
                                        setSearchQuery('');
                                    }}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '12px',
                                        padding: '12px',
                                        borderRadius: '6px',
                                        textAlign: 'left',
                                        width: '100%',
                                        transition: 'var(--transition-fast)',
                                        backgroundColor: selectedCategory === cat.id ? 'var(--color-primary)' : 'transparent',
                                        color: selectedCategory === cat.id ? '#000' : 'var(--color-text)'
                                    }}
                                >
                                    <IconComponent size={18} color={selectedCategory === cat.id ? '#000' : 'var(--color-primary)'} />
                                    <span style={{ flex: 1 }}>{cat.name}</span>
                                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{getCategoryCount(cat.id)}</span>
                                </button>
                            );
                        })}
                    </div>
                </aside>

                {/* Equipment Grid */}
                <main>
                    {loading && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'var(--spacing-8)' }}>
                            <Loader2 className="animate-spin" size={32} color="var(--color-primary)" />
                        </div>
                    )}
                    
                    {error && (
                        <div style={{ 
                            backgroundColor: 'rgba(239, 68, 68, 0.1)', 
                            border: '1px solid rgba(239, 68, 68, 0.3)', 
                            borderRadius: '8px', 
                            padding: 'var(--spacing-4)', 
                            marginBottom: 'var(--spacing-6)',
                            textAlign: 'center'
                        }}>
                            <p style={{ color: '#ef4444', margin: 0 }}>{error}</p>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-6)' }}>
                                <h2 style={{ fontSize: '1.5rem' }}>PRO <span style={{ color: 'var(--color-primary)' }}>INVENTORY</span></h2>
                                <span style={{ color: 'var(--color-text-muted)' }}>Showing {equipmentItems.length} items</span>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 'var(--spacing-4)' }}>
                                {equipmentItems.map((item) => (
                                    <div key={item.id} className="gear-card" style={{
                                        backgroundColor: 'var(--color-surface)',
                                        border: '1px solid var(--color-border)',
                                        borderRadius: '8px',
                                        overflow: 'hidden',
                                        transition: 'var(--transition-normal)',
                                        cursor: 'pointer'
                                    }}>
                                        <div style={{ height: '200px', backgroundColor: '#000', overflow: 'hidden' }}>
                                            <img 
                                                src={item.image_url || getPlaceholderImage(item.categories?.name || 'Equipment')} 
                                                alt={item.name} 
                                                style={{ 
                                                    width: '100%', 
                                                    height: '100%', 
                                                    objectFit: 'cover', 
                                                    opacity: 0.8 
                                                }} 
                                            />
                                        </div>
                                        <div style={{ padding: 'var(--spacing-4)' }}>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                                                {item.categories?.name || 'Uncategorized'}
                                            </span>
                                            <h4 style={{ margin: '4px 0 var(--spacing-4)', fontSize: '1.1rem' }}>{item.name}</h4>
                                            {item.description && (
                                                <p style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-4)', lineHeight: '1.4' }}>
                                                    {item.description}
                                                </p>
                                            )}
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
                        </>
                    )}
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
