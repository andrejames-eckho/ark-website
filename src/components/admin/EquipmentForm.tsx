import React, { useState, useEffect } from 'react';
import { Equipment, Category } from '../../types/equipment';
import { fetchCategories, addEquipment, updateEquipment, uploadEquipmentImage } from '../../services/equipmentService';
import { X, Upload, Image as ImageIcon, Loader2 } from 'lucide-react';

interface EquipmentFormProps {
  equipment?: Equipment;
  onSave: () => void;
  onCancel: () => void;
}

interface FormData {
  name: string;
  category_id: number;
  description: string;
  status: 'available' | 'unavailable' | 'maintenance';
  specifications: Record<string, any>;
}

const EquipmentForm: React.FC<EquipmentFormProps> = ({ equipment, onSave, onCancel }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category_id: 0,
    description: '',
    status: 'available',
    specifications: {}
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isEditing = !!equipment;

  useEffect(() => {
    loadCategories();
    if (equipment) {
      setFormData({
        name: equipment.name,
        category_id: equipment.category_id,
        description: equipment.description || '',
        status: equipment.status,
        specifications: equipment.specifications || {}
      });
      if (equipment.image_url) {
        setImagePreview(equipment.image_url);
      }
    }
  }, [equipment]);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategories(data);
      if (data.length > 0 && !equipment) {
        setFormData(prev => ({ ...prev, category_id: data[0].id }));
      }
    } catch (err) {
      setError('Failed to load categories');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [key]: value
      }
    }));
  };

  const addSpecificationField = () => {
    const key = prompt('Enter specification key:');
    if (key && key.trim()) {
      handleSpecificationChange(key.trim(), '');
    }
  };

  const removeSpecificationField = (key: string) => {
    setFormData(prev => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return {
        ...prev,
        specifications: newSpecs
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      let imageUrl = equipment?.image_url;

      // Upload new image if provided
      if (imageFile) {
        const imagePath = await uploadEquipmentImage(imageFile);
        imageUrl = imagePath;
      }

      const equipmentData = {
        ...formData,
        image_url: imageUrl
      };

      if (isEditing && equipment) {
        await updateEquipment(equipment.id, equipmentData);
      } else {
        await addEquipment(equipmentData);
      }

      onSave();
    } catch (err) {
      setError('Failed to save equipment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        width: '90%',
        maxWidth: '600px',
        maxHeight: '90vh',
        backgroundColor: 'var(--color-surface)',
        borderRadius: '12px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{
          padding: 'var(--spacing-4)',
          borderBottom: '1px solid var(--color-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 700,
            color: 'var(--color-text)'
          }}>
            {isEditing ? 'Edit Equipment' : 'Add New Equipment'}
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-muted)',
              cursor: 'pointer',
              padding: '8px'
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <div style={{
          padding: 'var(--spacing-4)',
          overflowY: 'auto',
          flex: 1
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            {/* Name */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '8px'
              }}>
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-text)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
                placeholder="Equipment name"
              />
            </div>

            {/* Category */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '8px'
              }}>
                Category *
              </label>
              <select
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                required
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-text)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '8px'
              }}>
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-text)',
                  fontSize: '1rem',
                  outline: 'none',
                  resize: 'vertical'
                }}
                placeholder="Equipment description"
              />
            </div>

            {/* Status */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '8px'
              }}>
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: 'var(--color-bg)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  color: 'var(--color-text)',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              >
                <option value="available">Available</option>
                <option value="unavailable">Unavailable</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Image Upload */}
            <div>
              <label style={{
                display: 'block',
                fontSize: '0.9rem',
                fontWeight: 600,
                color: 'var(--color-text)',
                marginBottom: '8px'
              }}>
                Image
              </label>
              <div style={{
                border: '2px dashed var(--color-border)',
                borderRadius: '8px',
                padding: 'var(--spacing-4)',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}>
                {imagePreview ? (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={{
                        width: '100%',
                        maxHeight: '200px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                        marginBottom: 'var(--spacing-2)'
                      }}
                    />
                    <label style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      backgroundColor: 'var(--color-primary)',
                      color: '#000',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontWeight: 600
                    }}>
                      Change Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>
                ) : (
                  <label style={{ cursor: 'pointer' }}>
                    <ImageIcon size={48} color="var(--color-text-muted)" style={{ marginBottom: '8px' }} />
                    <div style={{ color: 'var(--color-text-muted)', marginBottom: '8px' }}>
                      Click to upload image or drag and drop
                    </div>
                    <Upload size={20} color="var(--color-text-muted)" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <label style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--color-text)'
                }}>
                  Specifications
                </label>
                <button
                  type="button"
                  onClick={addSpecificationField}
                  style={{
                    padding: '4px 12px',
                    backgroundColor: 'var(--color-primary)',
                    color: '#000',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Add Spec
                </button>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div key={key} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input
                      type="text"
                      value={key}
                      readOnly
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        color: 'var(--color-text)',
                        fontSize: '0.9rem'
                      }}
                    />
                    <input
                      type="text"
                      value={value}
                      onChange={(e) => handleSpecificationChange(key, e.target.value)}
                      style={{
                        flex: 2,
                        padding: '8px 12px',
                        backgroundColor: 'var(--color-bg)',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        color: 'var(--color-text)',
                        fontSize: '0.9rem'
                      }}
                      placeholder="Value"
                    />
                    <button
                      type="button"
                      onClick={() => removeSpecificationField(key)}
                      style={{
                        padding: '8px',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--color-border)',
                        borderRadius: '4px',
                        color: 'var(--color-text-muted)',
                        cursor: 'pointer'
                      }}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: '8px',
                padding: '12px'
              }}>
                <p style={{ color: '#ef4444', margin: 0, fontSize: '0.9rem' }}>
                  {error}
                </p>
              </div>
            )}

            {/* Actions */}
            <div style={{
              display: 'flex',
              gap: 'var(--spacing-2)',
              justifyContent: 'flex-end',
              paddingTop: 'var(--spacing-2)'
            }}>
              <button
                type="button"
                onClick={onCancel}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'transparent',
                  color: 'var(--color-text)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: 'var(--color-primary)',
                  color: '#000',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {loading ? 'Saving...' : (isEditing ? 'Update' : 'Add')} Equipment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EquipmentForm;
