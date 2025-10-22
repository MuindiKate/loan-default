// File: src/pages/AboutPage.jsx
import React, { useState } from "react";

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const InfoCard = ({ icon, title, children, gradient }) => (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '32px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      border: '1px solid #e5e7eb',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px)';
      e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.05)';
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '200px',
        height: '200px',
        background: gradient,
        opacity: 0.05,
        borderRadius: '50%',
        transform: 'translate(50%, -50%)'
      }} />
      <div style={{
        fontSize: '3rem',
        marginBottom: '16px',
        position: 'relative'
      }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: '1.5rem',
        fontWeight: '700',
        color: '#1f2937',
        marginBottom: '16px',
        position: 'relative'
      }}>
        {title}
      </h3>
      <div style={{position: 'relative'}}>
        {children}
      </div>
    </div>
  );

  const FeatureBox = ({ icon, title, description }) => (
    <div style={{
      display: 'flex',
      gap: '16px',
      padding: '20px',
      background: '#f9fafb',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      transition: 'all 0.2s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#f3f4f6';
      e.currentTarget.style.borderColor = '#667eea';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#f9fafb';
      e.currentTarget.style.borderColor = '#e5e7eb';
    }}>
      <div style={{fontSize: '2rem', flexShrink: 0}}>{icon}</div>
      <div>
        <h4 style={{
          fontSize: '1.1rem',
          fontWeight: '600',
          color: '#1f2937',
          marginBottom: '6px'
        }}>
          {title}
        </h4>
        <p style={{
          color: '#6b7280',
          lineHeight: '1.6',
          margin: 0,
          fontSize: '0.95rem'
        }}>
          {description}
        </p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '🎯' },
    { id: 'technical', label: 'Technical Details', icon: '⚙️' },
    { id: 'limitations', label: 'Limitations', icon: '⚠️' }
  ];

  return (
    <section className="page" aria-labelledby="about-heading">
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '56px 40px',
        borderRadius: '16px',
        marginBottom: '40px',
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
          background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{position: 'relative', zIndex: 1, maxWidth: '800px'}}>
          <h1 id="about-heading" style={{
            color: 'white',
            fontSize: '2.75rem',
            fontWeight: '800',
            marginBottom: '16px',
            textShadow: '0 2px 20px rgba(0,0,0,0.2)'
          }}>
            About the System
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.95)',
            fontSize: '1.2rem',
            lineHeight: '1.8',
            margin: 0,
            fontWeight: '400'
          }}>
            Understanding how our AI-powered loan default prediction system works, 
            its capabilities, and important considerations for responsible use.
          </p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '12px',
        marginBottom: '32px',
        borderBottom: '2px solid #e5e7eb',
        paddingBottom: '4px',
        flexWrap: 'wrap'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '12px 24px',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white',
              color: activeTab === tab.id ? 'white' : '#6b7280',
              border: activeTab === tab.id ? 'none' : '2px solid #e5e7eb',
              borderRadius: '10px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '1rem',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: activeTab === tab.id ? '0 4px 12px rgba(102, 126, 234, 0.3)' : 'none'
            }}
            onMouseEnter={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.borderColor = '#667eea';
                e.target.style.color = '#667eea';
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.color = '#6b7280';
              }
            }}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{
          animation: 'fadeIn 0.4s ease-out'
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            <InfoCard
              icon="🤖"
              title="Machine Learning Model"
              gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            >
              <p style={{
                color: '#4b5563',
                lineHeight: '1.8',
                margin: 0,
                fontSize: '1rem'
              }}>
                Our system uses a sophisticated binary classification model trained on historical loan data 
                to predict borrower default probability. The model analyzes multiple factors including income, 
                credit history, employment status, and loan characteristics to generate risk assessments.
              </p>
            </InfoCard>

            <InfoCard
              icon="📊"
              title="Prediction Output"
              gradient="linear-gradient(135deg, #10b981 0%, #059669 100%)"
            >
              <p style={{
                color: '#4b5563',
                lineHeight: '1.8',
                marginBottom: '16px',
                fontSize: '1rem'
              }}>
                Each prediction provides two key outputs:
              </p>
              <div style={{
                background: '#f0fdf4',
                padding: '16px',
                borderRadius: '8px',
                border: '1px solid #bbf7d0'
              }}>
                <div style={{marginBottom: '12px'}}>
                  <strong style={{color: '#166534'}}>Classification:</strong>
                  <span style={{color: '#4b5563', marginLeft: '8px'}}>
                    "Default" or "No Default"
                  </span>
                </div>
                <div>
                  <strong style={{color: '#166534'}}>Probability Score:</strong>
                  <span style={{color: '#4b5563', marginLeft: '8px'}}>
                    0.0 to 1.0 (0% to 100%)
                  </span>
                </div>
              </div>
            </InfoCard>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '28px'
            }}>
              🎯 Key Features
            </h2>
            <div style={{
              display: 'grid',
              gap: '16px'
            }}>
              <FeatureBox
                icon="⚡"
                title="Real-time Analysis"
                description="Get instant risk assessments for individual loan applications with detailed probability scores."
              />
              <FeatureBox
                icon="📁"
                title="Batch Processing"
                description="Upload CSV files to analyze hundreds or thousands of applications simultaneously."
              />
              <FeatureBox
                icon="🔍"
                title="Explainable AI"
                description="SHAP (SHapley Additive exPlanations) values show exactly which factors influenced each prediction."
              />
              <FeatureBox
                icon="📈"
                title="Comprehensive Reports"
                description="Download detailed CSV reports for record-keeping, compliance, and further analysis."
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'technical' && (
        <div style={{animation: 'fadeIn 0.4s ease-out'}}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '24px'
            }}>
              📊 Understanding Probability Scores
            </h2>
            <p style={{
              color: '#4b5563',
              lineHeight: '1.8',
              fontSize: '1.05rem',
              marginBottom: '24px'
            }}>
              The probability score represents the model's confidence that a borrower will default on their loan. 
              This score ranges from 0.0 (no risk) to 1.0 (certain default).
            </p>

            <div style={{
              background: 'linear-gradient(to right, #10b981, #fbbf24, #ef4444)',
              height: '60px',
              borderRadius: '12px',
              position: 'relative',
              marginBottom: '32px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <div style={{
                position: 'absolute',
                bottom: '-40px',
                left: '0',
                right: 0,
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '0.9rem',
                fontWeight: '600'
              }}>
                <span style={{color: '#10b981'}}>0% Low Risk</span>
                <span style={{color: '#fbbf24'}}>50% Medium Risk</span>
                <span style={{color: '#ef4444'}}>100% High Risk</span>
              </div>
            </div>

            <div style={{marginTop: '60px'}}>
              <h4 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '16px'
              }}>
                Example Interpretation:
              </h4>
              <div style={{
                background: '#f9fafb',
                padding: '20px',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{
                  color: '#4b5563',
                  lineHeight: '1.8',
                  margin: 0,
                  fontSize: '1rem'
                }}>
                  <strong style={{color: '#667eea'}}>Probability: 0.82 (82%)</strong><br/>
                  The model estimates an 82% likelihood that this borrower will default on the loan. 
                  This high probability suggests significant risk factors are present in the application.
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '24px'
            }}>
              🔍 SHAP Explanations
            </h2>
            <p style={{
              color: '#4b5563',
              lineHeight: '1.8',
              fontSize: '1.05rem',
              marginBottom: '28px'
            }}>
              SHAP (SHapley Additive exPlanations) values provide feature-level transparency by showing 
              how each input variable influences the prediction. This makes the model's decision-making process interpretable.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '20px',
              marginBottom: '28px'
            }}>
              <div style={{
                background: '#fef2f2',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #fecaca'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '12px'
                }}>
                  📈
                </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#991b1b',
                  marginBottom: '8px'
                }}>
                  Positive SHAP Values
                </h4>
                <p style={{
                  color: '#7f1d1d',
                  lineHeight: '1.6',
                  margin: 0,
                  fontSize: '0.95rem'
                }}>
                  Increase the probability of default. Features pushing the prediction toward "Default" classification.
                </p>
              </div>

              <div style={{
                background: '#f0fdf4',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #bbf7d0'
              }}>
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '12px'
                }}>
                  📉
                </div>
                <h4 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#166534',
                  marginBottom: '8px'
                }}>
                  Negative SHAP Values
                </h4>
                <p style={{
                  color: '#14532d',
                  lineHeight: '1.6',
                  margin: 0,
                  fontSize: '0.95rem'
                }}>
                  Decrease the probability of default. Features pushing the prediction toward "No Default" classification.
                </p>
              </div>
            </div>

            <div style={{
              background: '#eff6ff',
              padding: '24px',
              borderRadius: '12px',
              border: '1px solid #bfdbfe'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'start',
                gap: '12px'
              }}>
                <div style={{fontSize: '1.5rem', flexShrink: 0}}>💡</div>
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1e40af',
                    marginBottom: '8px'
                  }}>
                    Important Note
                  </h4>
                  <p style={{
                    color: '#1e3a8a',
                    lineHeight: '1.6',
                    margin: 0,
                    fontSize: '0.95rem'
                  }}>
                    SHAP values show <strong>correlation</strong>, not causation. They indicate which features 
                    are associated with the prediction but don't prove that changing those features would change the outcome.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'limitations' && (
        <div style={{animation: 'fadeIn 0.4s ease-out'}}>
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb',
            marginBottom: '32px'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              ⚠️ System Limitations
            </h2>
            <p style={{
              color: '#4b5563',
              lineHeight: '1.8',
              fontSize: '1.05rem',
              marginBottom: '28px'
            }}>
              While our system provides valuable insights, it's crucial to understand its limitations 
              and use predictions responsibly as part of a broader decision-making process.
            </p>

            <div style={{display: 'grid', gap: '20px'}}>
              <div style={{
                background: '#fff7ed',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #fed7aa',
                borderLeft: '6px solid #f97316'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: '#9a3412',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>📊</span> Probabilistic Nature
                </h3>
                <p style={{
                  color: '#7c2d12',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Model outputs are probabilistic estimates, not certainties. A high probability doesn't 
                  guarantee default, and a low probability doesn't guarantee repayment. Predictions should 
                  be treated as risk indicators, not absolute truths.
                </p>
              </div>

              <div style={{
                background: '#fef2f2',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #fecaca',
                borderLeft: '6px solid #dc2626'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: '#991b1b',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>⚖️</span> Potential Bias
                </h3>
                <p style={{
                  color: '#7f1d1d',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Machine learning models can inherit and amplify biases present in their training data. 
                  If trained on historically skewed data, the model may produce unfair or discriminatory 
                  predictions. Regular auditing and bias testing are essential for responsible deployment.
                </p>
              </div>

              <div style={{
                background: '#fef3c7',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #fde68a',
                borderLeft: '6px solid #f59e0b'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: '#92400e',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>🎯</span> Decision Support Only
                </h3>
                <p style={{
                  color: '#78350f',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  This system is designed as a <strong>decision support tool</strong>, not an automated 
                  decision maker. Final lending decisions should involve human judgment, additional context, 
                  regulatory compliance, and consideration of factors beyond the model's scope.
                </p>
              </div>

              <div style={{
                background: '#eff6ff',
                padding: '24px',
                borderRadius: '12px',
                border: '2px solid #bfdbfe',
                borderLeft: '6px solid #3b82f6'
              }}>
                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: '600',
                  color: '#1e40af',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <span>📉</span> Data Limitations
                </h3>
                <p style={{
                  color: '#1e3a8a',
                  lineHeight: '1.7',
                  margin: 0
                }}>
                  Model accuracy depends on the quality, recency, and completeness of input data. 
                  Missing features, outdated information, or data entry errors can significantly 
                  impact prediction reliability. Always validate data quality before relying on predictions.
                </p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            border: '1px solid #e5e7eb'
          }}>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              🔒 Privacy & Security
            </h2>
            <p style={{
              color: '#4b5563',
              lineHeight: '1.8',
              fontSize: '1.05rem',
              marginBottom: '28px'
            }}>
              Protecting sensitive information is paramount when handling loan application data. 
              Follow these best practices to ensure responsible data handling.
            </p>

            <div style={{display: 'grid', gap: '16px'}}>
              <div style={{
                display: 'flex',
                gap: '16px',
                padding: '20px',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{fontSize: '2rem', flexShrink: 0}}>🔐</div>
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Minimize Personal Data
                  </h4>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    margin: 0,
                    fontSize: '0.95rem'
                  }}>
                    Only submit data necessary for prediction. Avoid including unnecessary personally 
                    identifiable information (PII) such as full names, addresses, or identification numbers.
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                padding: '20px',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{fontSize: '2rem', flexShrink: 0}}>⚙️</div>
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Production Deployment
                  </h4>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    margin: 0,
                    fontSize: '0.95rem'
                  }}>
                    This is a demonstration interface. For production use, implement proper backend 
                    security including HTTPS encryption, authentication, authorization, data encryption 
                    at rest, and compliance with relevant regulations (GDPR, CCPA, etc.).
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                padding: '20px',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{fontSize: '2rem', flexShrink: 0}}>📋</div>
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Data Retention
                  </h4>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    margin: 0,
                    fontSize: '0.95rem'
                  }}>
                    Establish clear data retention policies. Only store prediction history as long as 
                    necessary for business purposes, and implement secure deletion procedures for expired data.
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                gap: '16px',
                padding: '20px',
                background: '#f9fafb',
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{fontSize: '2rem', flexShrink: 0}}>✅</div>
                <div>
                  <h4 style={{
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    Compliance & Transparency
                  </h4>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    margin: 0,
                    fontSize: '0.95rem'
                  }}>
                    Ensure compliance with fair lending laws and regulations. Be transparent with 
                    applicants about how AI is used in decision-making and provide mechanisms for 
                    appeals and explanations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}