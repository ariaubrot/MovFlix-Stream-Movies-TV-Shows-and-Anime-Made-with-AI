import axios, { AxiosError, AxiosInstance } from 'axios';
import { ApiConfig } from '@/config/api';
import { ApiError } from './errors';
import { setupInterceptors } from './interceptors';
import { setupCache } from './cache';

export class ApiClient {
  private client: AxiosInstance;
  private config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: config.timeout,
      params: {
        api_key: config.apiKey,
        language: config.language,
      },
      headers: {
        'Content-Type': 'application/json',
      },
      // Enable keep-alive and compression
      httpAgent: new (require('http').Agent)({ 
        keepAlive: true,
        maxSockets: 100,
        maxFreeSockets: 10,
        timeout: 60000,
      }),
      httpsAgent: new (require('https').Agent)({ 
        keepAlive: true,
        maxSockets: 100,
        maxFreeSockets: 10,
        timeout: 60000,
      }),
      // Enable gzip compression
      decompress: true,
    });

    setupInterceptors(this.client);
    setupCache(this.client);
  }

  async request<T>(config: any): Promise<T> {
    try {
      const response = await this.client.request({
        ...config,
        timeout: config.timeout || this.config.timeout,
      });
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new ApiError({
          message: this.getErrorMessage(error),
          status: error.response?.status,
          code: error.code,
          data: error.response?.data,
        });
      }
      throw error;
    }
  }

  private getErrorMessage(error: AxiosError): string {
    if (error.code === 'ECONNABORTED') {
      return 'Request timed out. Please check your internet connection and try again.';
    }
    if (error.code === 'ERR_NETWORK') {
      return 'Network error. Please check your internet connection and try again.';
    }
    if (error.response?.status === 429) {
      return 'Too many requests. Please try again later.';
    }
    return error.message;
  }

  get<T>(url: string, config?: any): Promise<T> {
    return this.request({ ...config, method: 'GET', url });
  }
}