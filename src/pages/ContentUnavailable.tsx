import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const ContentUnavailable: React.FC = () => {
  return (
    <div className="content-unavailable-page">
      {/* Hero Section */}
      <section style={{
        padding: 'var(--spacing-12) 0',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url("/hero.png") center/cover',
        textAlign: 'center'
      }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            {/* Icon */}
            <div style={{
              width: '80px',
              height: '80px',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto var(--spacing-6)',
              border: '2px solid var(--color-border)'
            }}>
              <Home size={40} color="var(--color-primary)" />
            </div>

            {/* 404 Number */}
            <h1 style={{ 
              fontSize: '6rem', 
              fontWeight: 900,
              marginBottom: 'var(--spacing-2)',
              color: 'var(--color-primary)',
              lineHeight: 1
            }}>
              404
            </h1>

            {/* Main Message */}
            <h2 style={{ 
              fontSize: '2.5rem', 
              marginBottom: 'var(--spacing-4)',
              fontWeight: 700
            }}>
              CONTENT <span style={{ color: 'var(--color-primary)' }}>UNAVAILABLE</span>
            </h2>

            {/* Description */}
            <p style={{ 
              fontSize: '1.2rem', 
              color: 'var(--color-text-muted)', 
              marginBottom: 'var(--spacing-8)',
              maxWidth: '500px',
              margin: '0 auto var(--spacing-8)',
              lineHeight: 1.6
            }}>
              The page you're looking for doesn't exist or has been moved. 
              Let's get you back to finding the perfect gear for your event.
            </p>

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: 'var(--spacing-4)', 
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <Link
                to="/"
                style={{
                  backgroundColor: 'var(--color-primary)',
                  color: '#000',
                  padding: '16px 40px',
                  borderRadius: '4px',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'var(--transition-fast)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                RETURN TO HOMEPAGE
              </Link>
              
              <Link
                to="/equipment"
                style={{
                  backgroundColor: 'transparent',
                  border: '2px solid var(--color-primary)',
                  color: 'var(--color-primary)',
                  padding: '16px 40px',
                  borderRadius: '4px',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  textDecoration: 'none',
                  display: 'inline-block',
                  transition: 'var(--transition-fast)',
                  cursor: 'pointer'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                  e.currentTarget.style.color = '#000';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = 'var(--color-primary)';
                }}
              >
                BROWSE EQUIPMENT
              </Link>
            </div>

            {/* Additional Help */}
            <div style={{
              marginTop: 'var(--spacing-8)',
              padding: 'var(--spacing-6)',
              backgroundColor: 'var(--color-surface)',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              maxWidth: '400px',
              margin: 'var(--spacing-8) auto 0'
            }}>
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--spacing-2)'
              }}>
                <strong>Need help?</strong> If you believe this is an error, 
                our support team is here to assist you.
              </p>
              <div style={{ 
                display: 'flex', 
                gap: 'var(--spacing-4)', 
                justifyContent: 'center',
                marginTop: 'var(--spacing-4)'
              }}>
                <Link
                  to="/about"
                  style={{
                    color: 'var(--color-primary)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  ABOUT ARK PRO
                </Link>
                <span style={{ color: 'var(--color-text-muted)' }}>•</span>
                <Link
                  to="/services"
                  style={{
                    color: 'var(--color-primary)',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textDecoration: 'none'
                  }}
                >
                  OUR SERVICES
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentUnavailable;
