import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TranslationPath } from '@/hooks/useTranslation';

class HttpClient {
  private instance: AxiosInstance;
  private translate: (key: TranslationPath) => string = (key) => String(key);

  public setTranslator(translator: (key: TranslationPath) => string) {
    this.translate = translator;
  }

  constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 600000,
    });

    this.setupInterceptors();
  }
  
  private setupInterceptors() {
    this.instance.interceptors.request.use(
      async (config) => {
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        return Promise.reject(error);
      }
    );
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get<T>(url, config);
  }

  public async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post<T>(url, data, config);
  }

  public async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put<T>(url, data, config);
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete<T>(url, config);
  }
}

export default HttpClient;