export const API_CONFIG = {
  baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8787/v1',
  apiKey: import.meta.env.VITE_API_KEY || '',
};

export const AUTH_CONFIG = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY || '',
  clientId: import.meta.env.VITE_COGNITO_CLIENT_ID || '',
  redirectUri: import.meta.env.VITE_COGNITO_REDIRECT_URI || '',
};