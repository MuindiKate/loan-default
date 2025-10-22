// File: src/utils/storage.js
// Simple localStorage history helper used by PredictionForm
const STORAGE_KEY = "loan_predict_history_v1";

export function saveToHistory(entry) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const arr = raw ? JSON.parse(raw) : [];
    arr.unshift({ ...entry, timestamp: new Date().toISOString() });
    // keep last 50
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr.slice(0, 50)));
  } catch (e) {
    console.warn("Failed saving history", e);
  }
}
