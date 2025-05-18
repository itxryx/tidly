import { API_CONFIG } from './config';

const API_BASE_URL = API_CONFIG.baseUrl;

export type ApiError = {
  error: {
    code: string;
    message: string;
  };
};

type ApiOptions = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  token?: string;
};

export type ApiResult<T> = 
  | { success: true; data: T }
  | { success: false; error: ApiError };

export async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions
): Promise<ApiResult<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }

  try {
    const response = await fetch(url, {
      method: options.method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      try {
        const errorData = await response.json() as ApiError;
        return {
          success: false,
          error: errorData,
        };
      } catch (e) {
        return {
          success: false,
          error: {
            error: {
              code: `HTTP_ERROR_${response.status}`,
              message: `API request failed with status ${response.status}`,
            }
          }
        };
      }
    }

    if (response.status === 204) {
      return { success: true, data: {} as T };
    }

    const data = await response.json() as T;
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        error: {
          code: 'NETWORK_ERROR',
          message: error instanceof Error ? error.message : 'Network error occurred',
        }
      }
    };
  }
}

export function createApiClient(token?: string) {
  return {
    get<T>(endpoint: string): Promise<ApiResult<T>> {
      return apiRequest<T>(endpoint, { method: 'GET', token });
    },
    
    post<T>(endpoint: string, data: any): Promise<ApiResult<T>> {
      return apiRequest<T>(endpoint, { 
        method: 'POST', 
        body: data, 
        token 
      });
    },
    
    put<T>(endpoint: string, data: any): Promise<ApiResult<T>> {
      return apiRequest<T>(endpoint, { 
        method: 'PUT', 
        body: data, 
        token 
      });
    },
    
    delete<T>(endpoint: string): Promise<ApiResult<T>> {
      return apiRequest<T>(endpoint, { 
        method: 'DELETE', 
        token 
      });
    },
  };
}