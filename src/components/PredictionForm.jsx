// File: src/components/PredictionForm.jsx
import React, { useState } from "react";
import { predictSingle } from "../api";
import { saveToHistory } from "../utils/storage";
import { generateCSVReport } from "../utils/download";
import ShapChart from "./ShapChart";

const initialForm = {
  name: "",
  age: "",
  gender: "Female",
  marital_status: "Single",
  education: "Graduate",
  employment_status: "Salaried",
  monthly_income: "",
  loan_amount: "",
  loan_term: "",
  credit_history: 1,
  dependents: 0,
  property_area: "Urban"
};

export default function PredictionForm({ demoMode = true, onResult }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  function validate() {
    const errs = {};
    if (!form.age || form.age < 18 || form.age > 110) errs.age = "Age must be between 18 and 110";
    if (!form.monthly_income || form.monthly_income < 0) errs.monthly_income = "Monthly income is required";
    if (!form.loan_amount || form.loan_amount <= 0) errs.loan_amount = "Loan amount must be greater than 0";
    if (!form.loan_term || form.loan_term <= 0) errs.loan_term = "Loan term is required";
    if (form.credit_history !== 0 && form.credit_history !== 1) errs.credit_history = "Must be 0 or 1";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setResult(null);

    const payload = {
      name: form.name,
      age: Number(form.age),
      gender: form.gender,
      marital_status: form.marital_status,
      education: form.education,
      employment_status: form.employment_status,
      monthly_income: Number(form.monthly_income),
      loan_amount: Number(form.loan_amount),
      loan_term: Number(form.loan_term),
      credit_history: Number(form.credit_history),
      dependents: Number(form.dependents),
      property_area: form.property_area
    };

    try {
      let data;
      if (demoMode) {
        data = mockPredict(payload);
        await new Promise((r) => setTimeout(r, 1200));
      } else {
        data = await predictSingle(payload);
      }
      setResult(data);
      onResult && onResult(data);
      saveToHistory({ input: payload, result: data });
    } catch (err) {
      console.error("Prediction error", err);
      setErrors({ submit: "Prediction failed. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined, submit: undefined }));
  }

  function handleDownload() {
    if (!result) return;
    const csv = generateCSVReport({ input: form, result });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prediction_report_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    fontSize: '0.95rem',
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    transition: 'all 0.2s',
    backgroundColor: 'white',
    outline: 'none'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '0.9rem',
    fontWeight: '600',
    color: '#374151'
  };

  const errorStyle = {
    color: '#ef4444',
    fontSize: '0.85rem',
    marginTop: '6px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto'
    }}>
      <form onSubmit={handleSubmit} noValidate aria-labelledby="predict-form-heading">
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '32px',
          borderRadius: '16px 16px 0 0',
          color: 'white',
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.2)'
        }}>
          <h2 id="predict-form-heading" style={{
            margin: 0,
            fontSize: '2rem',
            fontWeight: '700'
          }}>
            Single Loan Prediction
          </h2>
          <p style={{
            margin: '8px 0 0',
            opacity: 0.95,
            fontSize: '1rem'
          }}>
            Enter customer details to assess loan default risk
          </p>
        </div>

        {/* Form Container */}
        <div style={{
          background: 'white',
          padding: '40px',
          borderRadius: '0 0 16px 16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          border: '1px solid #e5e7eb',
          borderTop: 'none'
        }}>
          {/* Personal Information Section */}
          <div style={{marginBottom: '32px'}}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #f3f4f6'
            }}>
              👤 Personal Information
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              <div>
                <label style={labelStyle}>
                  Name <span style={{color: '#9ca3af', fontWeight: '400'}}>(optional)</span>
                </label>
                <input 
                  style={inputStyle}
                  name="name" 
                  value={form.name} 
                  onChange={handleChange}
                  placeholder="Enter applicant name"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>

              <div>
                <label style={labelStyle}>
                  Age <span style={{color: '#ef4444'}}>*</span>
                </label>
                <input 
                  style={{...inputStyle, borderColor: errors.age ? '#ef4444' : '#e5e7eb'}}
                  name="age" 
                  type="number" 
                  min="18" 
                  max="110" 
                  value={form.age} 
                  onChange={handleChange}
                  placeholder="18-110"
                  required
                  onFocus={(e) => e.target.style.borderColor = errors.age ? '#ef4444' : '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = errors.age ? '#ef4444' : '#e5e7eb'}
                />
                {errors.age && <div style={errorStyle}>⚠️ {errors.age}</div>}
              </div>

              <div>
                <label style={labelStyle}>Gender <span style={{color: '#ef4444'}}>*</span></label>
                <select 
                  name="gender" 
                  style={inputStyle}
                  value={form.gender} 
                  onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Marital Status</label>
                <select 
                  name="marital_status" 
                  style={inputStyle}
                  value={form.marital_status} 
                  onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                >
                  <option>Single</option>
                  <option>Married</option>
                  <option>Divorced</option>
                  <option>Widowed</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Education</label>
                <select 
                  name="education" 
                  style={inputStyle}
                  value={form.education} 
                  onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                >
                  <option>Graduate</option>
                  <option>Not Graduate</option>
                  <option>Postgraduate</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Dependents</label>
                <input 
                  style={inputStyle}
                  name="dependents" 
                  type="number" 
                  min="0" 
                  value={form.dependents} 
                  onChange={handleChange}
                  placeholder="Number of dependents"
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>
          </div>

          {/* Financial Information Section */}
          <div style={{marginBottom: '32px'}}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #f3f4f6'
            }}>
              💰 Financial Information
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              <div>
                <label style={labelStyle}>
                  Employment Status
                </label>
                <select 
                  name="employment_status" 
                  style={inputStyle}
                  value={form.employment_status} 
                  onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                >
                  <option>Salaried</option>
                  <option>Self-employed</option>
                  <option>Unemployed</option>
                  <option>Student</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>
                  Monthly Income <span style={{color: '#ef4444'}}>*</span>
                </label>
                <input 
                  style={{...inputStyle, borderColor: errors.monthly_income ? '#ef4444' : '#e5e7eb'}}
                  name="monthly_income" 
                  type="number" 
                  min="0" 
                  value={form.monthly_income} 
                  onChange={handleChange}
                  placeholder="Enter monthly income"
                  onFocus={(e) => e.target.style.borderColor = errors.monthly_income ? '#ef4444' : '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = errors.monthly_income ? '#ef4444' : '#e5e7eb'}
                />
                {errors.monthly_income && <div style={errorStyle}>⚠️ {errors.monthly_income}</div>}
              </div>

              <div>
                <label style={labelStyle}>
                  Credit History <span style={{color: '#9ca3af', fontWeight: '400'}}>(0 or 1)</span>
                </label>
                <select
                  name="credit_history"
                  style={{...inputStyle, borderColor: errors.credit_history ? '#ef4444' : '#e5e7eb'}}
                  value={form.credit_history}
                  onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = errors.credit_history ? '#ef4444' : '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = errors.credit_history ? '#ef4444' : '#e5e7eb'}
                >
                  <option value={1}>1 - Has credit history</option>
                  <option value={0}>0 - No credit history</option>
                </select>
                {errors.credit_history && <div style={errorStyle}>⚠️ {errors.credit_history}</div>}
              </div>
            </div>
          </div>

          {/* Loan Details Section */}
          <div style={{marginBottom: '32px'}}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '2px solid #f3f4f6'
            }}>
              🏦 Loan Details
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              <div>
                <label style={labelStyle}>
                  Loan Amount <span style={{color: '#ef4444'}}>*</span>
                </label>
                <input 
                  style={{...inputStyle, borderColor: errors.loan_amount ? '#ef4444' : '#e5e7eb'}}
                  name="loan_amount" 
                  type="number" 
                  min="1" 
                  value={form.loan_amount} 
                  onChange={handleChange}
                  placeholder="Enter loan amount"
                  onFocus={(e) => e.target.style.borderColor = errors.loan_amount ? '#ef4444' : '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = errors.loan_amount ? '#ef4444' : '#e5e7eb'}
                />
                {errors.loan_amount && <div style={errorStyle}>⚠️ {errors.loan_amount}</div>}
              </div>

              <div>
                <label style={labelStyle}>
                  Loan Term <span style={{color: '#9ca3af', fontWeight: '400'}}>(months)</span> <span style={{color: '#ef4444'}}>*</span>
                </label>
                <input 
                  style={{...inputStyle, borderColor: errors.loan_term ? '#ef4444' : '#e5e7eb'}}
                  name="loan_term" 
                  type="number" 
                  min="1" 
                  value={form.loan_term} 
                  onChange={handleChange}
                  placeholder="e.g., 12, 24, 36"
                  onFocus={(e) => e.target.style.borderColor = errors.loan_term ? '#ef4444' : '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = errors.loan_term ? '#ef4444' : '#e5e7eb'}
                />
                {errors.loan_term && <div style={errorStyle}>⚠️ {errors.loan_term}</div>}
              </div>

              <div>
                <label style={labelStyle}>Property Area</label>
                <select 
                  name="property_area" 
                  style={inputStyle}
                  value={form.property_area} 
                  onChange={handleChange}
                  onFocus={(e) => e.target.style.borderColor = '#667eea'}
                  onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                >
                  <option>Urban</option>
                  <option>Semiurban</option>
                  <option>Rural</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid #f3f4f6'
          }}>
            <button 
              style={{
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: '600',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s',
                boxShadow: loading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              type="submit" 
              disabled={loading} 
              aria-busy={loading}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.3)';
                }
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                  }}/>
                  Analyzing...
                </>
              ) : (
                <>🎯 Predict Risk</>
              )}
            </button>
            <button 
              type="button" 
              style={{
                padding: '14px 28px',
                fontSize: '1rem',
                fontWeight: '600',
                background: 'white',
                color: '#6b7280',
                border: '2px solid #e5e7eb',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => { setForm(initialForm); setErrors({}); setResult(null); }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#9ca3af';
                e.target.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#e5e7eb';
                e.target.style.color = '#6b7280';
              }}
            >
              Reset Form
            </button>
          </div>

          {errors.submit && (
            <div style={{
              marginTop: '16px',
              padding: '14px',
              background: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: '8px',
              color: '#991b1b',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              ⚠️ {errors.submit}
            </div>
          )}
        </div>
      </form>

      {/* Results Section */}
      {result && (
        <div style={{
          marginTop: '32px',
          background: 'white',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          animation: 'slideIn 0.4s ease-out'
        }}>
          <div style={{
            background: result.prediction === "Default" 
              ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
              : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            padding: '28px 32px',
            color: 'white'
          }}>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px'}}>
              <div>
                <div style={{fontSize: '0.9rem', opacity: 0.9, marginBottom: '4px'}}>Prediction Result</div>
                <div style={{fontSize: '2rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '12px'}}>
                  {result.prediction === "Default" ? "⚠️" : "✓"} {result.prediction}
                </div>
                <div style={{fontSize: '1.1rem', marginTop: '8px', opacity: 0.95}}>
                  Risk Probability: <strong>{Math.round(result.probability * 100)}%</strong>
                </div>
              </div>
              <button 
                style={{
                  padding: '12px 24px',
                  background: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.4)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.2s'
                }}
                onClick={handleDownload}
                onMouseEnter={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.3)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.6)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(255,255,255,0.2)';
                  e.target.style.borderColor = 'rgba(255,255,255,0.4)';
                }}
              >
                📥 Download Report
              </button>
            </div>
          </div>

          <div style={{padding: '32px'}}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '20px'
            }}>
              📊 Feature Importance (SHAP Values)
            </h3>
            <ShapChart shapValues={result.shap_values || {}} />
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

function mockPredict(payload) {
  const base = 0.2;
  let score = base;
  if (payload.loan_amount > payload.monthly_income * 6) score += 0.35;
  if (payload.credit_history === 0) score += 0.25;
  if (payload.employment_status === "Unemployed") score += 0.2;
  if (payload.property_area === "Rural") score += 0.05;
  if (payload.monthly_income > 5000) score -= 0.2;
  if (payload.age > 50) score += 0.06;
  score = Math.max(0, Math.min(0.98, score));

  const shap_values = {
    monthly_income: -(payload.monthly_income / 10000) * 0.5,
    loan_amount: (payload.loan_amount / 50000) * 0.9,
    credit_history: payload.credit_history === 1 ? -0.25 : 0.25,
    employment_status: payload.employment_status === "Unemployed" ? 0.15 : -0.02
  };

  return {
    prediction: score > 0.5 ? "Default" : "No Default",
    probability: Number(score.toFixed(3)),
    shap_values
  };
}