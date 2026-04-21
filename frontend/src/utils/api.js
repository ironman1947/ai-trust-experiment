/**
 * api.js - API Configuration and Utilities
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const DEBUG = import.meta.env.VITE_DEBUG === 'true';

const debugLog = (message, data) => {
  if (DEBUG) {
    console.log(`[DEBUG] ${message}`, data || '');
  }
};

export const apiPost = async (endpoint, data) => {
  const url = `${API_URL}${endpoint}`;
  debugLog('POST request', { endpoint, url, data });

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    debugLog('POST response', result);
    return result;
  } catch (error) {
    console.error(`API POST error: ${endpoint}`, error);
    throw error;
  }
};

export const apiGet = async (endpoint) => {
  const url = `${API_URL}${endpoint}`;
  debugLog('GET request', { endpoint, url });

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    debugLog('GET response', result);
    return result;
  } catch (error) {
    console.error(`API GET error: ${endpoint}`, error);
    throw error;
  }
};

export const getApiUrl = () => API_URL;

export default {
  apiPost,
  apiGet,
  getApiUrl,
};
// ... keep your apiPost, apiGet, etc. above ...

// Specific API calls for the Trust Experiment
export const logEvent = (eventData) => {
  return apiPost('/log-event', eventData);
};

export const startSession = (sessionData) => {
  return apiPost('/session/start', sessionData);
};

export default {
  apiPost,
  apiGet,
  getApiUrl,
  logEvent,
  startSession
};