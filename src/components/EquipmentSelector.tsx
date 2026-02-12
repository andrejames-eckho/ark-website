import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, Speaker, Lightbulb, TowerControl as Rigging, Monitor, Video, Loader2, X, Plus } from 'lucide-react';
import { 
  getEquipmentCategoriesForQuote, 
  getEquipmentByCategoryForQuote, 
  searchEquipmentForQuote
} from '../services/equipmentService';
import { EquipmentWithCategory, Category } from '../types/equipment';

interface EquipmentSelectorProps {
  selectedEquipment: string[];
  onEquipmentChange: (equipment: string[]) => void;
  onError?: (error: string) => void;
}

const EquipmentSelector: React.FC<EquipmentSelectorProps> = ({ 
  selectedEquipment, 
  onEquipmentChange,
  onError 
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [equipmentByCategory, setEquipmentByCategory] = useState<Record<number, EquipmentWithCategory[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<EquipmentWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingCategory, setLoadingCategory] = useState<number | null>(null);
  const [searching, setSearching] = useState(false);

  // Load categories on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await getEquipmentCategoriesForQuote();
        setCategories(categoriesData);
      } catch (error) {
        // Error handled silently
        onError?.('Failed to load equipment options');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [onError]);

  // Search equipment with debouncing
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setSearching(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await searchEquipmentForQuote(searchQuery);
        setSearchResults(results);
      } catch (error) {
        // Error handled silently
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Load equipment for a specific category
  const loadCategoryEquipment = async (categoryId: number) => {
    if (equipmentByCategory[categoryId]) {
      return; // Already loaded
    }

    setLoadingCategory(categoryId);
    try {
      const equipment = await getEquipmentByCategoryForQuote(categoryId);
      setEquipmentByCategory(prev => ({
        ...prev,
        [categoryId]: equipment
      }));
    } catch (error) {
      // Error handled silently
    } finally {
      setLoadingCategory(null);
    }
  };

  // Toggle category expansion
  const toggleCategory = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
      loadCategoryEquipment(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  // Toggle equipment selection
  const toggleEquipment = (equipmentName: string) => {
    const newSelection = selectedEquipment.includes(equipmentName)
      ? selectedEquipment.filter(item => item !== equipmentName)
      : [...selectedEquipment, equipmentName];
    onEquipmentChange(newSelection);
  };

  // Select all equipment in a category
  const selectAllInCategory = (categoryId: number) => {
    const equipment = equipmentByCategory[categoryId] || [];
    const equipmentNames = equipment.map(item => item.name);
    const newSelection = [...new Set([...selectedEquipment, ...equipmentNames])];
    onEquipmentChange(newSelection);
  };

  // Get category icon
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

  // Equipment item component
  const EquipmentItem: React.FC<{ equipment: EquipmentWithCategory }> = ({ equipment }) => {
    const isSelected = selectedEquipment.includes(equipment.name);
    
    return (
      <div
        className={`equipment-item ${isSelected ? 'selected' : ''}`}
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px 12px',
          borderRadius: '6px',
          cursor: 'pointer',
          backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-bg)',
          color: isSelected ? '#000' : 'var(--color-text)',
          border: `1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-border)'}`,
          transition: 'all 0.2s ease',
          fontSize: '0.9rem'
        }}
        onClick={() => toggleEquipment(equipment.name)}
      >
        <span style={{ flex: 1 }}>{equipment.name}</span>
        {isSelected && <X size={16} />}
        {!isSelected && <Plus size={16} />}
      </div>
    );
  };

  // Category component
  const CategoryItem: React.FC<{ category: Category }> = ({ category }) => {
    const isExpanded = expandedCategories.has(category.id);
    const equipment = equipmentByCategory[category.id] || [];
    const IconComponent = getCategoryIcon(category.icon_name);
    const isLoading = loadingCategory === category.id;
    const equipmentCount = category.equipment_count || 0;
    
    return (
      <div style={{ marginBottom: '8px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 12px',
            borderRadius: '6px',
            cursor: 'pointer',
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            transition: 'all 0.2s ease'
          }}
          onClick={() => toggleCategory(category.id)}
        >
          <IconComponent size={18} color="var(--color-primary)" style={{ marginRight: '12px' }} />
          <span style={{ flex: 1, fontWeight: 600 }}>{category.name}</span>
          <span style={{ 
            fontSize: '0.8rem', 
            color: 'var(--color-text-muted)', 
            marginRight: '8px' 
          }}>
            {equipmentCount} items
          </span>
          {isLoading ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />
          )}
        </div>
        
        {isExpanded && (
          <div style={{ marginLeft: '16px', marginTop: '8px' }}>
            {equipment.length > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  selectAllInCategory(category.id);
                }}
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--color-primary)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  marginBottom: '8px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(var(--color-primary-rgb), 0.1)'
                }}
              >
                Select All ({equipment.length})
              </button>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {equipment.map((item) => (
                <EquipmentItem key={item.id} equipment={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'var(--spacing-4)' }}>
        <Loader2 className="animate-spin" size={20} color="var(--color-primary)" />
        <span style={{ marginLeft: 'var(--spacing-2)', color: 'var(--color-text-muted)' }}>
          Loading equipment options...
        </span>
      </div>
    );
  }

  return (
    <div>
      {/* Search Bar */}
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        <div style={{ position: 'relative' }}>
          <Search 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--color-text-muted)' 
            }} 
            size={18} 
          />
          <input
            type="text"
            placeholder="Search equipment by name, description, or specifications..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            style={{
              width: '100%',
              padding: '10px 12px 10px 44px',
              borderRadius: '6px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          />
          {searching && (
            <Loader2 
              size={16} 
              className="animate-spin" 
              style={{ 
                position: 'absolute', 
                right: '12px', 
                top: '50%', 
                transform: 'translateY(-50%)' 
              }} 
            />
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchQuery && (
        <div style={{ marginBottom: 'var(--spacing-4)' }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text-muted)' }}>
            Search Results ({searchResults.length})
          </h4>
          <div style={{ 
            maxHeight: '200px', 
            overflowY: 'auto',
            border: '1px solid var(--color-border)',
            borderRadius: '6px',
            padding: '8px',
            backgroundColor: 'var(--color-surface)'
          }}>
            {searchResults.length === 0 ? (
              <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: 'var(--spacing-2)' }}>
                No equipment found
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {searchResults.map((item) => (
                  <EquipmentItem key={item.id} equipment={item} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Categories */}
      {!searchQuery && (
        <div>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px', color: 'var(--color-text-muted)' }}>
            Browse by Category
          </h4>
          <div style={{ 
            maxHeight: '300px', 
            overflowY: 'auto',
            paddingRight: '8px'
          }}>
            {categories.map((category) => (
              <CategoryItem key={category.id} category={category} />
            ))}
          </div>
        </div>
      )}

      {/* Selected Equipment Summary */}
      {selectedEquipment.length > 0 && (
        <div style={{ 
          marginTop: 'var(--spacing-4)', 
          padding: '12px', 
          backgroundColor: 'var(--color-surface)', 
          border: '1px solid var(--color-border)',
          borderRadius: '6px'
        }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>
            Selected Equipment ({selectedEquipment.length})
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
            {selectedEquipment.map((item: string) => (
              <span
                key={item}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#000',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  fontWeight: 500
                }}
              >
                {item}
                <X
                  size={12}
                  style={{ cursor: 'pointer' }}
                  onClick={() => toggleEquipment(item)}
                />
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EquipmentSelector;
