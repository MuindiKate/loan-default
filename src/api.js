// File: src/api.js
// API module: change API_BASE_URL to your Flask backend
import axios from "axios";

/**
 * Backend configuration
 * Change API_BASE_URL to your Flask backend root (e.g., http://localhost:5000)
 */
export const API_BASE_URL = "http://localhost:5000"; // <-- CHANGE THIS URL

export const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" }
});

/*
Expected backend contracts (examples):

1) Single-predict:
POST /predict
Request JSON:
{
  "name": "John Doe",      // optional
  "age": 45,
  "gender": "Male",
  "marital_status": "Married",
  "education": "Graduate",
  "employment_status": "Salaried",
  "monthly_income": 5000,
  "loan_amount": 20000,
  "loan_term": 36,
  "credit_history": 1,
  "dependents": 2,
  "property_area": "Urban"
}

Response JSON:
{
  "prediction": "Default",   // or "No Default"
  "probability": 0.82,      // float 0..1
  "shap_values": {
     "monthly_income": -0.12,
     "loan_amount": 0.45,
     "credit_history": -0.3,
     ...
  },
  "id": "optional-unique-id"
}

2) Batch predict via /predict-batch (multipart/form-data)
- Send file field "file" containing CSV.
- Response: array of objects:
[
  {
    "id": "row-1",
    "input": { ...same input fields... },
    "prediction": "No Default",
    "probability": 0.12,
    "shap_values": { ... }
  }, ...
]

3) Explain endpoint (optional)
POST /explain
Request:
{ "id": "prediction-id" }
Response:
{ "explanation": "The loan amount is high compared to income, increasing default risk." }

Note: adapt to your backend field names. The frontend maps fields according to the form below.
*/

export async function predictSingle(payload) {
  // payload is a JS object with prediction fields
  const resp = await client.post("/predict", payload);
  return resp.data;
}

export async function predictBatch(formData, onUploadProgress) {
  // formData is a FormData with a file appended as 'file'
  const resp = await axios.post(`${API_BASE_URL}/predict-batch`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress
  });
  return resp.data;
}

export async function explainPrediction(id) {
  const resp = await client.post("/explain", { id });
  return resp.data;
}
