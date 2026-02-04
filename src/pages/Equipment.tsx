import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Speaker, Lightbulb, TowerControl as Rigging, Monitor, Video, Loader2, ArrowUpDown, X } from 'lucide-react';
import { fetchEquipment, fetchCategories, searchEquipment, fetchEquipmentByCategory } from '../services/equipmentService';
import { EquipmentWithCategory, Category } from '../types/equipment';
import { getPlaceholderImage } from '../utils/imageHelper';

const Equipment: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState('');
    const [equipmentItems, setEquipmentItems] = useState<EquipmentWithCategory[]>([]);
    const [unsortedEquipmentItems, setUnsortedEquipmentItems] = useState<EquipmentWithCategory[]>([]);
    const [allEquipmentItems, setAllEquipmentItems] = useState<EquipmentWithCategory[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [sortOption, setSortOption] = useState<'default' | 'name-asc' | 'name-desc'>('name-asc');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedEquipment, setSelectedEquipment] = useState<EquipmentWithCategory | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Load data on component mount
    useEffect(() => {
        loadData();
    }, []);

    // Handle URL parameter changes
    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            const categoryId = parseInt(categoryParam);
            setSelectedCategory(categoryId);
        } else {
            setSelectedCategory(null);
        }
    }, [searchParams]);

    // Load data whenever category, search, or sort changes
    useEffect(() => {
        // Only run this effect after initial data is loaded
        if (categories.length > 0) {
            if (selectedCategory !== null) {
                loadEquipmentByCategory(selectedCategory);
            } else if (searchQuery) {
                searchEquipmentData(searchQuery);
            } else {
                loadAllEquipment();
            }
        }
    }, [selectedCategory, searchQuery, categories.length]);

    // Apply sorting whenever sort option or unsorted items change
    useEffect(() => {
        const sorted = sortEquipment(unsortedEquipmentItems);
        setEquipmentItems(sorted);
    }, [sortOption, unsortedEquipmentItems]);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const [categoriesData, equipmentData] = await Promise.all([
                fetchCategories(),
                fetchEquipment()
            ]);
            
            setCategories(categoriesData);
            setAllEquipmentItems(equipmentData);
            
            // Only set equipment items if no category is pre-selected
            const categoryParam = searchParams.get('category');
            if (!categoryParam) {
                setUnsortedEquipmentItems(equipmentData);
            }
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
            setUnsortedEquipmentItems(data);
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
            setUnsortedEquipmentItems(data);
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
            setUnsortedEquipmentItems(data);
        } catch (err) {
            setError('Failed to search equipment');
            console.error('Error searching equipment:', err);
        } finally {
            setLoading(false);
        }
    };

    const sortEquipment = (items: EquipmentWithCategory[]) => {
        const sortedItems = [...items];
        switch (sortOption) {
            case 'name-asc':
                return sortedItems.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return sortedItems.sort((a, b) => b.name.localeCompare(a.name));
            default:
                return sortedItems;
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

    const truncateText = (text: string, maxLength: number = 100) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength).trim() + '...';
    };

    const formatSpecifications = (specifications?: Record<string, any>) => {
        if (!specifications || Object.keys(specifications).length === 0) return null;
        
        return (
            <div style={{ marginTop: 'var(--spacing-3)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-text)', marginBottom: '4px' }}>
                    Specifications:
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', lineHeight: '1.4' }}>
                    {Object.entries(specifications).slice(0, 3).map(([key, value]) => (
                        <div key={key} style={{ marginBottom: '2px' }}>
                            <span style={{ fontWeight: 500 }}>{key}:</span> {String(value)}
                        </div>
                    ))}
                    {Object.keys(specifications).length > 3 && (
                        <div style={{ fontStyle: 'italic', color: 'var(--color-text-muted)' }}>
                            +{Object.keys(specifications).length - 3} more specs
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const openEquipmentModal = (equipment: EquipmentWithCategory) => {
        setSelectedEquipment(equipment);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEquipment(null);
    };

    const EquipmentDetailModal: React.FC<{ equipment: EquipmentWithCategory; onClose: () => void }> = ({ equipment, onClose }) => {
        return (
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px',
                    boxSizing: 'border-box'
                }}
                onClick={onClose}
            >
                <div 
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderRadius: '12px',
                        maxWidth: '600px',
                        width: '100%',
                        maxHeight: '80vh',
                        overflow: 'auto',
                        position: 'relative',
                        border: '1px solid var(--color-border)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '16px',
                            right: '16px',
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-text)',
                            cursor: 'pointer',
                            zIndex: 10,
                            padding: '8px'
                        }}
                    >
                        <X size={24} />
                    </button>
                    
                    <div style={{ height: '300px', backgroundColor: '#000', overflow: 'hidden' }}>
                        <img 
                            src={equipment.image_url || getPlaceholderImage(equipment.categories?.name || 'Equipment')} 
                            alt={equipment.name} 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover' 
                            }} 
                        />
                    </div>
                    
                    <div style={{ padding: 'var(--spacing-6)' }}>
                        <span style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                            {equipment.categories?.name || 'Uncategorized'}
                        </span>
                        <h2 style={{ margin: '8px 0 var(--spacing-4)', fontSize: '1.75rem', color: 'var(--color-text)' }}>
                            {equipment.name}
                        </h2>
                        
                        {equipment.description && (
                            <div style={{ marginBottom: 'var(--spacing-6)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-3)', color: 'var(--color-text)' }}>
                                    Description
                                </h3>
                                <p style={{ 
                                    fontSize: '1rem', 
                                    color: 'var(--color-text-muted)', 
                                    lineHeight: '1.6',
                                    whiteSpace: 'pre-wrap'
                                }}>
                                    {equipment.description}
                                </p>
                            </div>
                        )}
                        
                        {equipment.specifications && Object.keys(equipment.specifications).length > 0 && (
                            <div style={{ marginBottom: 'var(--spacing-6)' }}>
                                <h3 style={{ fontSize: '1.1rem', marginBottom: 'var(--spacing-3)', color: 'var(--color-text)' }}>
                                    Specifications
                                </h3>
                                <div style={{ 
                                    fontSize: '0.95rem', 
                                    color: 'var(--color-text-muted)', 
                                    lineHeight: '1.6',
                                    backgroundColor: 'var(--color-surface)',
                                    padding: 'var(--spacing-4)',
                                    borderRadius: '6px',
                                    border: '1px solid var(--color-border)'
                                }}>
                                    {Object.entries(equipment.specifications).map(([key, value]) => (
                                        <div key={key} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                                            <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{key}:</span>
                                            <span style={{ color: 'var(--color-text-muted)' }}>{String(value)}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        
                        <div style={{ display: 'flex', gap: 'var(--spacing-3)' }}>
                            <button
                                onClick={onClose}
                                style={{
                                    width: '100%',
                                    padding: '14px 24px',
                                    backgroundColor: 'var(--color-primary)',
                                    border: 'none',
                                    borderRadius: '6px',
                                    color: '#000',
                                    fontWeight: 600,
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
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
                                placeholder="Search inventory by name, description, or specifications (e.g. 'Line Array', 'Stainless Steel', '250kg')..."
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
                        <div style={{ position: 'relative' }}>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as 'default' | 'name-asc' | 'name-desc')}
                                style={{
                                    appearance: 'none',
                                    padding: '16px 40px 16px 16px',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: '8px',
                                    backgroundColor: 'var(--color-bg)',
                                    color: 'var(--color-text)',
                                    fontSize: '1rem',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    outline: 'none'
                                }}
                            >
                                <option value="default">Default</option>
                                <option value="name-asc">Name (A-Z)</option>
                                <option value="name-desc">Name (Z-A)</option>
                            </select>
                            <ArrowUpDown 
                                style={{ 
                                    position: 'absolute', 
                                    right: '16px', 
                                    top: '50%', 
                                    transform: 'translateY(-50%)', 
                                    color: 'var(--color-text-muted)',
                                    pointerEvents: 'none'
                                }} 
                                size={16} 
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
                                    <div 
                                        key={item.id} 
                                        className="gear-card" 
                                        style={{
                                            backgroundColor: 'var(--color-surface)',
                                            border: '1px solid var(--color-border)',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            transition: 'var(--transition-normal)',
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => openEquipmentModal(item)}
                                    >
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
                                            <div style={{ minHeight: '80px', marginBottom: 'var(--spacing-4)' }}>
                                                {item.description && (
                                                    <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: '1.4', marginBottom: 'var(--spacing-2)' }}>
                                                        {truncateText(item.description, 60)}
                                                        {item.description.length > 60 && (
                                                            <span style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: '0.85rem' }}>
                                                                {' '}See more
                                                            </span>
                                                        )}
                                                    </div>
                                                )}
                                                {formatSpecifications(item.specifications)}
                                            </div>
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
            
            {/* Equipment Detail Modal */}
            {isModalOpen && selectedEquipment && createPortal(
                <EquipmentDetailModal 
                    equipment={selectedEquipment} 
                    onClose={closeModal} 
                />,
                document.body
            )}
        </div>
    );
};

export default Equipment;
