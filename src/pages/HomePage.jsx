// File: src/pages/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import History from "../components/History";

export default function HomePage() {
  return (
    <section className="page" aria-labelledby="home-heading">
      {/* Hero Section */}
      <div className="hero-container" style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '48px 32px',
        borderRadius: '16px',
        marginBottom: '32px',
        boxShadow: '0 20px 60px rgba(102, 126, 234, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{position: 'relative', zIndex: 1}}>
          <h1 id="home-heading" style={{
            color: 'white',
            fontSize: '3rem',
            fontWeight: '800',
            marginBottom: '16px',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)'
          }}>
            Loan Default Prediction
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.95)',
            fontSize: '1.25rem',
            lineHeight: '1.8',
            maxWidth: '800px',
            marginBottom: '32px',
            fontWeight: '400'
          }}>
            Leverage advanced machine learning to assess loan repayment risk with precision. 
            Get instant probability scores, AI-powered explanations, and actionable insights 
            for smarter lending decisions.
          </p>

          <div style={{display: 'flex', gap: '12px', flexWrap: 'wrap'}}>
            <Link 
              to="/predict" 
              className="button" 
              aria-label="Go to prediction page"
              style={{
                background: 'white',
                color: '#667eea',
                padding: '14px 32px',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '12px',
                textDecoration: 'none',
                display: 'inline-block',
                boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                border: 'none'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
              }}
            >
              Start Prediction →
            </Link>
            <Link 
              to="/about" 
              className="button secondary" 
              style={{
                background: 'rgba(255,255,255,0.15)',
                color: 'white',
                padding: '14px 32px',
                fontSize: '1.1rem',
                fontWeight: '600',
                borderRadius: '12px',
                textDecoration: 'none',
                display: 'inline-block',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.25)';
                e.target.style.borderColor = 'rgba(255,255,255,0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.15)';
                e.target.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
            >
              About the Model
            </Link>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '24px',
        marginBottom: '48px'
      }}>
        {[
          {
            icon: '📊',
            title: 'Individual Analysis',
            desc: 'Submit single customer profiles for detailed risk assessment'
          },
          {
            icon: '📁',
            title: 'Batch Processing',
            desc: 'Upload CSV files to analyze hundreds of applications at once'
          },
          {
            icon: '🎯',
            title: 'SHAP Explanations',
            desc: 'Understand exactly which factors drive each prediction'
          },
          {
            icon: '📈',
            title: 'Downloadable Reports',
            desc: 'Export comprehensive summaries for compliance and review'
          }
        ].map((feature, idx) => (
          <div key={idx} style={{
            background: 'linear-gradient(135deg, #f6f8fb 0%, #ffffff 100%)',
            padding: '28px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            transition: 'all 0.3s',
            cursor: 'default'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.08)';
            e.currentTarget.style.borderColor = '#667eea';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = '#e5e7eb';
          }}>
            <div style={{fontSize: '2.5rem', marginBottom: '12px'}}>{feature.icon}</div>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              marginBottom: '8px',
              color: '#1f2937'
            }}>
              {feature.title}
            </h3>
            <p style={{
              color: '#6b7280',
              lineHeight: '1.6',
              fontSize: '0.95rem'
            }}>
              {feature.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Predictions Section */}
      <div style={{
        background: 'white',
        padding: '32px',
        borderRadius: '12px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1f2937',
            margin: 0
          }}>
            Recent Predictions
          </h2>
          <Link 
            to="/history" 
            style={{
              color: '#667eea',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.95rem',
              transition: 'color 0.2s'
            }}
            onMouseEnter={(e) => e.target.style.color = '#764ba2'}
            onMouseLeave={(e) => e.target.style.color = '#667eea'}
          >
            View All →
          </Link>
        </div>
        <History />
      </div>
    </section>
  );
}