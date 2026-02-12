import React, { useState, useEffect } from 'react';
import { EquipmentWithCategory, Category } from '../../types/equipment';
import { fetchAllEquipment, fetchCategories, deleteEquipment } from '../../services/equipmentService';
import { Search, Plus, Edit, Trash2, Loader2, Filter, Eye } from 'lucide-react';
import EquipmentForm from './EquipmentForm';
import Modal from '../ui/Modal';
import { getPlaceholderImage } from '../../utils/imageHelper';

const EquipmentManager: React.FC = () => {
  const [equipment, setEquipment] = useState<EquipmentWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredEquipment, setFilteredEquipment] = useState<EquipmentWithCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const [showForm, setShowForm] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState<EquipmentWithCategory | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [viewingEquipment, setViewingEquipment] = useState<EquipmentWithCategory | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterEquipment();
  }, [equipment, searchQuery, selectedCategory, selectedStatus]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [equipmentData, categoriesData] = await Promise.all([
        fetchAllEquipment(),
        fetchCategories()
      ]);
      setEquipment(equipmentData);
      setCategories(categoriesData);
    } catch (error) {
      // Error handled silently
    } finally {
      setLoading(false);
    }
  };

  const filterEquipment = () => {
    let filtered = equipment;

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category_id === selectedCategory);
    }

    // Filter by status
    if (selectedStatus) {
      filtered = filtered.filter(item => item.status === selectedStatus);
    }

    setFilteredEquipment(filtered);
  };

  const handleAddEquipment = () => {
    setEditingEquipment(null);
    setShowForm(true);
  };

  const handleEditEquipment = (item: EquipmentWithCategory) => {
    setEditingEquipment(item);
    setShowForm(true);
  };

  const handleViewEquipment = (item: EquipmentWithCategory) => {
    setViewingEquipment(item);
  };

  const handleDeleteEquipment = async (id: number) => {
    try {
      await deleteEquipment(id);
      await loadData(); // Refresh the list
      setDeleteConfirm(null);
    } catch (error) {
      // Error handled silently
    }
  };

  const handleFormSave = () => {
    setShowForm(false);
    setEditingEquipment(null);
    loadData(); // Refresh the list
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return '#10b981'; // green
      case 'unavailable':
        return '#ef4444'; // red
      case 'maintenance':
        return '#f59e0b'; // yellow
      default:
        return '#6b7280'; // gray
    }
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <Loader2 size={32} className="animate-spin" color="var(--color-primary)" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 'var(--spacing-6)'
      }}>
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--color-text)',
            marginBottom: '8px'
          }}>
            Equipment Management
          </h1>
          <p style={{
            color: 'var(--color-text-muted)',
            margin: 0
          }}>
            Manage your equipment inventory ({equipment.length} total items)
          </p>
        </div>
        <button
          onClick={handleAddEquipment}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 24px',
            backgroundColor: 'var(--color-primary)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <Plus size={20} />
          Add Equipment
        </button>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: 'var(--spacing-4)',
        marginBottom: 'var(--spacing-6)',
        padding: 'var(--spacing-4)',
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px'
      }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search
            style={{
              position: 'absolute',
              left: '16px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--color-text-muted)'
            }}
            size={20}
          />
          <input
            type="text"
            placeholder="Search equipment..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 52px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              color: 'var(--color-text)',
              fontSize: '1rem',
              outline: 'none'
            }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={20} color="var(--color-text-muted)" />
          <select
            value={selectedCategory || ''}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : null)}
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              color: 'var(--color-text)',
              fontSize: '1rem',
              outline: 'none'
            }}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={20} color="var(--color-text-muted)" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={{
              padding: '12px 16px',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              color: 'var(--color-text)',
              fontSize: '1rem',
              outline: 'none',
              minWidth: '150px'
            }}
          >
            <option value="">All Status</option>
            <option value="available" style={{ color: '#10b981' }}>✓ Available</option>
            <option value="unavailable" style={{ color: '#ef4444' }}>✗ Unavailable</option>
            <option value="maintenance" style={{ color: '#f59e0b' }}>⚙ Maintenance</option>
          </select>
        </div>
      </div>

      {/* Equipment List */}
      <div style={{
        backgroundColor: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        overflow: 'hidden'
      }}>
        {filteredEquipment.length === 0 ? (
          <div style={{
            padding: 'var(--spacing-8)',
            textAlign: 'center'
          }}>
            <p style={{
              color: 'var(--color-text-muted)',
              margin: 0,
              fontSize: '1.1rem'
            }}>
              {searchQuery || selectedCategory || selectedStatus
                ? 'No equipment found matching your criteria'
                : 'No equipment found'}
            </p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{
                  backgroundColor: 'var(--color-bg)',
                  borderBottom: '1px solid var(--color-border)'
                }}>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    fontSize: '0.9rem'
                  }}>
                    Image
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    fontSize: '0.9rem'
                  }}>
                    Name
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    fontSize: '0.9rem'
                  }}>
                    Category
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    fontSize: '0.9rem'
                  }}>
                    Status
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    fontSize: '0.9rem'
                  }}>
                    Description
                  </th>
                  <th style={{
                    padding: '16px',
                    textAlign: 'center',
                    fontWeight: 600,
                    color: 'var(--color-text)',
                    fontSize: '0.9rem'
                  }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEquipment.map((item) => (
                  <tr
                    key={item.id}
                    style={{
                      borderBottom: '1px solid var(--color-border)',
                      transition: 'var(--transition-fast)',
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'var(--color-bg)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <td style={{ padding: '16px' }}>
                      {item.image_url ? (
                        <img
                          src={item.image_url}
                          alt={item.name}
                          style={{
                            width: '60px',
                            height: '60px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                            backgroundColor: '#000'
                          }}
                        />
                      ) : (
                        <div
                          style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: 'var(--color-bg)',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-muted)'
                          }}
                        >
                          No Image
                        </div>
                      )}
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        marginBottom: '4px'
                      }}>
                        {item.name}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: 'var(--color-primary)',
                        color: '#000',
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {item.categories?.name || 'Uncategorized'}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <span style={{
                        padding: '4px 8px',
                        backgroundColor: getStatusColor(item.status) + '20',
                        color: getStatusColor(item.status),
                        borderRadius: '4px',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {item.status}
                      </span>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{
                        color: 'var(--color-text-muted)',
                        fontSize: '0.9rem',
                        maxWidth: '300px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        {item.description || 'No description'}
                      </div>
                    </td>
                    <td style={{ padding: '16px' }}>
                      <div style={{
                        display: 'flex',
                        gap: '8px',
                        justifyContent: 'center'
                      }}>
                        <button
                          onClick={() => handleViewEquipment(item)}
                          style={{
                            padding: '8px',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--color-border)',
                            borderRadius: '6px',
                            color: 'var(--color-text)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'var(--transition-fast)'
                          }}
                          title="View"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                            e.currentTarget.style.color = '#000';
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--color-text)';
                            e.currentTarget.style.borderColor = 'var(--color-border)';
                          }}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleEditEquipment(item)}
                          style={{
                            padding: '8px',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--color-border)',
                            borderRadius: '6px',
                            color: 'var(--color-text)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'var(--transition-fast)'
                          }}
                          title="Edit"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                            e.currentTarget.style.color = '#000';
                            e.currentTarget.style.borderColor = 'var(--color-primary)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--color-text)';
                            e.currentTarget.style.borderColor = 'var(--color-border)';
                          }}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          style={{
                            padding: '8px',
                            backgroundColor: 'transparent',
                            border: '1px solid var(--color-border)',
                            borderRadius: '6px',
                            color: '#ef4444',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'var(--transition-fast)'
                          }}
                          title="Delete"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#ef4444';
                            e.currentTarget.style.color = '#fff';
                            e.currentTarget.style.borderColor = '#ef4444';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = '#ef4444';
                            e.currentTarget.style.borderColor = 'var(--color-border)';
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Equipment Form Modal */}
      {showForm && (
        <EquipmentForm
          equipment={editingEquipment || undefined}
          onSave={handleFormSave}
          onCancel={() => {
            setShowForm(false);
            setEditingEquipment(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <Modal
          isOpen={true}
          onClose={() => setDeleteConfirm(null)}
          size="small"
          title="Confirm Delete"
          showCloseButton={true}
          closeOnOutsideClick={true}
        >
          <div style={{ textAlign: 'center' }}>
            <Trash2 size={48} color="#ef4444" style={{ marginBottom: 'var(--spacing-4)' }} />
            <p style={{
              margin: '0 0 var(--spacing-6) 0',
              color: 'var(--color-text-muted)',
              fontSize: '1rem'
            }}>
              Are you sure you want to delete this equipment? This action cannot be undone.
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-2)',
              justifyContent: 'center'
            }}>
              <button
                onClick={() => setDeleteConfirm(null)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEquipment(deleteConfirm)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#ef4444',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'var(--transition-fast)'
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Equipment Detail Modal */}
      {viewingEquipment && (
        <Modal
          isOpen={true}
          onClose={() => setViewingEquipment(null)}
          size="large"
          title={viewingEquipment.name}
          showCloseButton={true}
          closeOnOutsideClick={true}
        >
          <div style={{ height: '300px', backgroundColor: '#000', overflow: 'hidden', borderRadius: '8px', marginBottom: 'var(--spacing-6)' }}>
            <img 
              src={viewingEquipment.image_url || getPlaceholderImage(viewingEquipment.categories?.name || 'Equipment')} 
              alt={viewingEquipment.name} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover' 
              }} 
            />
          </div>
          
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', marginBottom: 'var(--spacing-4)' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase' }}>
              {viewingEquipment.categories?.name || 'Uncategorized'}
            </span>
            <span style={{
              padding: '4px 8px',
              backgroundColor: getStatusColor(viewingEquipment.status) + '20',
              color: getStatusColor(viewingEquipment.status),
              borderRadius: '4px',
              fontSize: '0.8rem',
              fontWeight: 600
            }}>
              {viewingEquipment.status}
            </span>
          </div>
          
          {viewingEquipment.description && (
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
                {viewingEquipment.description}
              </p>
            </div>
          )}
          
          {viewingEquipment.specifications && Object.keys(viewingEquipment.specifications).length > 0 && (
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
                {Object.entries(viewingEquipment.specifications).map(([key, value]) => (
                  <div key={key} style={{ marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ fontWeight: 600, color: 'var(--color-text)' }}>{key}:</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'flex-end' }}>
            <button
              onClick={() => {
                setViewingEquipment(null);
                handleEditEquipment(viewingEquipment);
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: 'transparent',
                color: 'var(--color-text)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={() => {
                setDeleteConfirm(viewingEquipment.id);
                setViewingEquipment(null);
              }}
              style={{
                padding: '12px 24px',
                backgroundColor: '#ef4444',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Trash2 size={16} />
              Delete
            </button>
            <button
              onClick={() => setViewingEquipment(null)}
              style={{
                padding: '14px 24px',
                backgroundColor: 'var(--color-primary)',
                border: 'none',
                borderRadius: '6px',
                color: '#000',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EquipmentManager;
