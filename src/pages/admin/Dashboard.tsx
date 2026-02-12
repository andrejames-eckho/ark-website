import React, { useState, useEffect } from 'react';
import { EquipmentWithCategory, Category } from '../../types/equipment';
import { fetchAllEquipment, fetchCategories } from '../../services/equipmentService';
import { Package, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const [equipment, setEquipment] = useState<EquipmentWithCategory[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [equipmentData, categoriesData] = await Promise.all([
        fetchAllEquipment(),
        fetchCategories()
      ]);
      setEquipment(equipmentData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStats = () => {
    const totalEquipment = equipment.length;
    const availableEquipment = equipment.filter(item => item.status === 'available').length;
    const unavailableEquipment = equipment.filter(item => item.status === 'unavailable').length;
    const maintenanceEquipment = equipment.filter(item => item.status === 'maintenance').length;

    return {
      total: totalEquipment,
      available: availableEquipment,
      unavailable: unavailableEquipment,
      maintenance: maintenanceEquipment,
      categories: categories.length
    };
  };

  const getRecentEquipment = () => {
    return equipment
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, 5);
  };

  const getCategoryStats = () => {
    return categories.map(category => {
      const categoryEquipment = equipment.filter(item => item.category_id === category.id);
      return {
        ...category,
        count: categoryEquipment.length,
        available: categoryEquipment.filter(item => item.status === 'available').length
      };
    });
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px'
      }}>
        <div className="animate-spin" style={{
          width: '32px',
          height: '32px',
          border: '3px solid var(--color-border)',
          borderTop: '3px solid var(--color-primary)',
          borderRadius: '50%'
        }} />
      </div>
    );
  }

  const stats = getStats();
  const recentEquipment = getRecentEquipment();
  const categoryStats = getCategoryStats();

  return (
    <div>
      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: 'var(--spacing-4)',
        marginBottom: 'var(--spacing-6)'
      }}>
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: 'var(--spacing-4)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3)',
            marginBottom: 'var(--spacing-2)'
          }}>
            <div style={{
              padding: '12px',
              backgroundColor: 'var(--color-primary)',
              borderRadius: '8px',
              color: '#000'
            }}>
              <Package size={24} />
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--color-text)',
                lineHeight: 1
              }}>
                {stats.total}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)'
              }}>
                Total Equipment
              </div>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: 'var(--spacing-4)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3)',
            marginBottom: 'var(--spacing-2)'
          }}>
            <div style={{
              padding: '12px',
              backgroundColor: '#10b981',
              borderRadius: '8px',
              color: '#fff'
            }}>
              <CheckCircle size={24} />
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--color-text)',
                lineHeight: 1
              }}>
                {stats.available}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)'
              }}>
                Available
              </div>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: 'var(--spacing-4)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3)',
            marginBottom: 'var(--spacing-2)'
          }}>
            <div style={{
              padding: '12px',
              backgroundColor: '#ef4444',
              borderRadius: '8px',
              color: '#fff'
            }}>
              <AlertCircle size={24} />
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--color-text)',
                lineHeight: 1
              }}>
                {stats.unavailable + stats.maintenance}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)'
              }}>
                Unavailable
              </div>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          padding: 'var(--spacing-4)'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--spacing-3)',
            marginBottom: 'var(--spacing-2)'
          }}>
            <div style={{
              padding: '12px',
              backgroundColor: '#f59e0b',
              borderRadius: '8px',
              color: '#fff'
            }}>
              <TrendingUp size={24} />
            </div>
            <div>
              <div style={{
                fontSize: '2rem',
                fontWeight: 800,
                color: 'var(--color-text)',
                lineHeight: 1
              }}>
                {stats.categories}
              </div>
              <div style={{
                fontSize: '0.9rem',
                color: 'var(--color-text-muted)'
              }}>
                Categories
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--spacing-6)'
      }}>
        {/* Recent Equipment */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: 'var(--spacing-4)',
            borderBottom: '1px solid var(--color-border)'
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--color-text)'
            }}>
              Recent Equipment
            </h3>
          </div>
          <div style={{ padding: 'var(--spacing-4)' }}>
            {recentEquipment.length === 0 ? (
              <p style={{
                color: 'var(--color-text-muted)',
                margin: 0,
                textAlign: 'center',
                padding: 'var(--spacing-4)'
              }}>
                No equipment found
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                {recentEquipment.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--spacing-3)',
                      padding: '12px',
                      backgroundColor: 'var(--color-bg)',
                      borderRadius: '8px'
                    }}
                  >
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.name}
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          borderRadius: '6px',
                          backgroundColor: '#000'
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          backgroundColor: 'var(--color-border)',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-text-muted)',
                          fontSize: '0.8rem'
                        }}
                      >
                        No img
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        marginBottom: '4px'
                      }}>
                        {item.name}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-text-muted)'
                      }}>
                        {item.categories?.name}
                      </div>
                    </div>
                    <div style={{
                      padding: '4px 8px',
                      backgroundColor: item.status === 'available' ? '#10b98120' : '#ef444420',
                      color: item.status === 'available' ? '#10b981' : '#ef4444',
                      borderRadius: '4px',
                      fontSize: '0.7rem',
                      fontWeight: 600
                    }}>
                      {item.status}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Category Stats */}
        <div style={{
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          <div style={{
            padding: 'var(--spacing-4)',
            borderBottom: '1px solid var(--color-border)'
          }}>
            <h3 style={{
              margin: 0,
              fontSize: '1.2rem',
              fontWeight: 700,
              color: 'var(--color-text)'
            }}>
              Categories
            </h3>
          </div>
          <div style={{ padding: 'var(--spacing-4)' }}>
            {categoryStats.length === 0 ? (
              <p style={{
                color: 'var(--color-text-muted)',
                margin: 0,
                textAlign: 'center',
                padding: 'var(--spacing-4)'
              }}>
                No categories found
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
                {categoryStats.map((category) => (
                  <div
                    key={category.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px',
                      backgroundColor: 'var(--color-bg)',
                      borderRadius: '8px'
                    }}
                  >
                    <div>
                      <div style={{
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        marginBottom: '4px'
                      }}>
                        {category.name}
                      </div>
                      <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--color-text-muted)'
                      }}>
                        {category.available} of {category.count} available
                      </div>
                    </div>
                    <div style={{
                      width: '60px',
                      height: '8px',
                      backgroundColor: 'var(--color-border)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}>
                      <div
                        style={{
                          width: `${category.count > 0 ? (category.available / category.count) * 100 : 0}%`,
                          height: '100%',
                          backgroundColor: '#10b981',
                          borderRadius: '4px'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
