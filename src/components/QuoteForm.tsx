import React, { useState, FormEvent } from 'react';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import EquipmentSelector from './EquipmentSelector';
import Modal from './ui/Modal';

interface QuoteFormProps {
    onClose: () => void;
}

interface FormData {
    client_name: string;
    email: string;
    phone: string;
    event_date: string;
    event_duration: string;
    venue_name: string;
    gear_list: string[];
    event_details: string;
}

interface FormErrors {
    client_name?: string;
    email?: string;
    phone?: string;
    event_date?: string;
    event_duration?: string;
    venue_name?: string;
    gear_list?: string;
    event_details?: string;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onClose }) => {
    console.log('QuoteForm rendered');
    console.log('Environment variables:', import.meta.env.VITE_N8N_WEBHOOK_URL);
    
    const [formData, setFormData] = useState<FormData>({
        client_name: '',
        email: '',
        phone: '',
        event_date: '',
        event_duration: '',
        venue_name: '',
        gear_list: [],
        event_details: ''
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Validation functions
    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePhone = (phone: string): boolean => {
        // Philippine phone number formats:
        // +63 (917) 123 4567
        // 0917 123 4567
        const phoneRegex = /^(\+63\s?\(?[0-9]{3}\)?\s?[0-9]{3}\s?[0-9]{4}|0[0-9]{3}\s?[0-9]{3}\s?[0-9]{4})$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    };

    const validateDate = (date: string): boolean => {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.client_name.trim()) {
            newErrors.client_name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
            newErrors.phone = 'Please enter a valid Philippine phone number (e.g., +63 (917) 123 4567 or 0917 123 4567)';
        }

        if (!formData.event_date) {
            newErrors.event_date = 'Event date is required';
        } else if (!validateDate(formData.event_date)) {
            newErrors.event_date = 'Event date cannot be in the past';
        }

        if (!formData.event_duration) {
            newErrors.event_duration = 'Event duration is required';
        }

        if (!formData.venue_name.trim()) {
            newErrors.venue_name = 'Venue name is required';
        }

        if (formData.gear_list.length === 0) {
            newErrors.gear_list = 'Please select at least one item';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error for this field when user starts typing
        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }));
        }
    };

    const handleEquipmentChange = (equipment: string[]) => {
        setFormData(prev => ({
            ...prev,
            gear_list: equipment
        }));
        // Clear gear_list error when user selects an item
        if (errors.gear_list) {
            setErrors(prev => ({
                ...prev,
                gear_list: undefined
            }));
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            // Get webhook URL from environment variables
            const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL || 'PASTE_YOUR_N8N_URL_HERE';

            if (webhookUrl === 'PASTE_YOUR_N8N_URL_HERE') {
                throw new Error('Webhook URL not configured. Please set VITE_N8N_WEBHOOK_URL in your environment variables.');
            }

            // Log the payload for testing
            console.log('Quote Form Payload:', JSON.stringify(formData, null, 2));
            
            // Add retry logic
            const maxRetries = 3;
            let retryCount = 0;
            let response: Response | null = null;
            
            while (retryCount < maxRetries && !response?.ok) {
                try {
                    response = await fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(formData)
                    });
                    
                    if (response.ok) break;
                    
                    retryCount++;
                    if (retryCount < maxRetries) {
                        // Exponential backoff: wait 1s, 2s, 4s
                        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
                    }
                } catch (fetchError) {
                    retryCount++;
                    if (retryCount < maxRetries) {
                        await new Promise(resolve => setTimeout(resolve, Math.pow(2, retryCount) * 1000));
                    }
                }
            }

            if (!response?.ok) {
                throw new Error(`Failed to submit after ${maxRetries} attempts. Last status: ${response?.status || 'network error'}`);
            }

            setSubmitStatus('success');
        } catch (error) {
            console.error('Error submitting quote request:', error);
            setSubmitStatus('error');
            setErrorMessage('We encountered an issue submitting your request. Please try again or contact us directly.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Success view
    if (submitStatus === 'success') {
        return (
            <Modal
                isOpen={true}
                onClose={onClose}
                size="small"
                showCloseButton={true}
                closeOnOutsideClick={true}
            >
                <div style={{ textAlign: 'center' }}>
                    <CheckCircle size={64} color="var(--color-primary)" style={{ margin: '0 auto var(--spacing-4)' }} />
                    <h2 style={{ fontSize: '2rem', marginBottom: 'var(--spacing-2)' }}>Thank You!</h2>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '1.1rem' }}>
                        Our team will contact you shortly with a custom quote for your event.
                    </p>
                </div>
            </Modal>
        );
    }

    // Form view
    return (
        <Modal
            isOpen={true}
            onClose={onClose}
            size="medium"
            title="Get a Quote"
            showCloseButton={true}
            closeOnOutsideClick={true}
        >
            <p style={{ color: 'var(--color-text-muted)', marginBottom: 'var(--spacing-6)' }}>
                Fill out the form below and we'll get back to you with a custom quote.
            </p>

            {submitStatus === 'error' && (
                <div style={{
                    backgroundColor: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    borderRadius: '8px',
                    padding: 'var(--spacing-3)',
                    marginBottom: 'var(--spacing-4)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--spacing-2)'
                }}>
                    <AlertCircle size={20} color="#ef4444" style={{ flexShrink: 0, marginTop: '2px' }} />
                    <p style={{ color: '#ef4444', margin: 0, fontSize: '0.9rem' }}>{errorMessage}</p>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* Client Name */}
                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                        Full Name *
                    </label>
                    <input
                        type="text"
                        name="client_name"
                        value={formData.client_name}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'var(--color-bg)',
                            border: `1px solid ${errors.client_name ? '#ef4444' : 'var(--color-border)'}`,
                            borderRadius: '6px',
                            color: 'var(--color-text)',
                            fontSize: '1rem'
                        }}
                        placeholder="Juan Dela Cruz"
                    />
                    {errors.client_name && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.client_name}</p>
                    )}
                </div>

                {/* Email */}
                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                        Email Address *
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'var(--color-bg)',
                            border: `1px solid ${errors.email ? '#ef4444' : 'var(--color-border)'}`,
                            borderRadius: '6px',
                            color: 'var(--color-text)',
                            fontSize: '1rem'
                        }}
                        placeholder="juan@example.com"
                    />
                    {errors.email && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.email}</p>
                    )}
                </div>

                {/* Phone */}
                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'var(--color-bg)',
                            border: `1px solid ${errors.phone ? '#ef4444' : 'var(--color-border)'}`,
                            borderRadius: '6px',
                            color: 'var(--color-text)',
                            fontSize: '1rem'
                        }}
                        placeholder="+63 (917) 123 4567 or 0917 123 4567"
                    />
                    {errors.phone && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.phone}</p>
                    )}
                </div>

                {/* Event Date */}
                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                        Event Date *
                    </label>
                    <input
                        type="date"
                        name="event_date"
                        value={formData.event_date}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'var(--color-bg)',
                            border: `1px solid ${errors.event_date ? '#ef4444' : 'var(--color-border)'}`,
                            borderRadius: '6px',
                            color: 'var(--color-text)',
                            fontSize: '1rem'
                        }}
                    />
                    {errors.event_date && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.event_date}</p>
                    )}
                </div>

                {/* Event Duration */}
                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                        Event Duration *
                    </label>
                    <select
                        name="event_duration"
                        value={formData.event_duration}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'var(--color-bg)',
                            border: `1px solid ${errors.event_duration ? '#ef4444' : 'var(--color-border)'}`,
                            borderRadius: '6px',
                            color: 'var(--color-text)',
                            fontSize: '1rem'
                        }}
                    >
                        <option value="">Select duration</option>
                        <option value="Half day (4 hours)">Half day (4 hours)</option>
                        <option value="Full day (8 hours)">Full day (8 hours)</option>
                        <option value="2 days">2 days</option>
                        <option value="3 days">3 days</option>
                        <option value="1 week">1 week</option>
                        <option value="Custom (please specify in details)">Custom (please specify in details)</option>
                    </select>
                    {errors.event_duration && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.event_duration}</p>
                    )}
                </div>

                {/* Venue Name */}
                <div style={{ marginBottom: 'var(--spacing-4)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                        Venue Name *
                    </label>
                    <input
                        type="text"
                        name="venue_name"
                        value={formData.venue_name}
                        onChange={handleInputChange}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'var(--color-bg)',
                            border: `1px solid ${errors.venue_name ? '#ef4444' : 'var(--color-border)'}`,
                            borderRadius: '6px',
                            color: 'var(--color-text)',
                            fontSize: '1rem'
                        }}
                        placeholder="Convention Center"
                    />
                    {errors.venue_name && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.venue_name}</p>
                    )}
                </div>

                {/* Gear List */}
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                    <label style={{ display: 'block', marginBottom: '12px', fontWeight: 600, fontSize: '0.9rem' }}>
                        Select Equipment Needed *
                    </label>
                    <EquipmentSelector
                        selectedEquipment={formData.gear_list}
                        onEquipmentChange={handleEquipmentChange}
                        onError={(error) => setErrorMessage(error)}
                    />
                    {errors.gear_list && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '8px' }}>{errors.gear_list}</p>
                    )}
                </div>

                {/* Event Details */}
                <div style={{ marginBottom: 'var(--spacing-6)' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '0.9rem' }}>
                        Event Details (Optional)
                    </label>
                    <textarea
                        name="event_details"
                        value={formData.event_details}
                        onChange={handleInputChange}
                        rows={4}
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: 'var(--color-bg)',
                            border: `1px solid ${errors.event_details ? '#ef4444' : 'var(--color-border)'}`,
                            borderRadius: '6px',
                            color: 'var(--color-text)',
                            fontSize: '1rem',
                            resize: 'vertical',
                            minHeight: '100px'
                        }}
                        placeholder="Please describe your event in detail (e.g., type of event, expected number of attendees, specific requirements, setup preferences, etc.)"
                    />
                    {errors.event_details && (
                        <p style={{ color: '#ef4444', fontSize: '0.85rem', marginTop: '4px' }}>{errors.event_details}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        width: '100%',
                        padding: '16px',
                        backgroundColor: isSubmitting ? 'var(--color-border)' : 'var(--color-primary)',
                        color: '#000',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '1rem',
                        fontWeight: 700,
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        transition: 'all 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px'
                    }}
                >
                    {isSubmitting && <Loader2 size={20} className="animate-spin" />}
                    {isSubmitting ? 'SENDING...' : 'SUBMIT QUOTE REQUEST'}
                </button>
            </form>
        </Modal>
    );
};

export default QuoteForm;
