export class ApiError extends Error {
  status?: number;
  code?: string;
  data?: any;

  constructor({ message, status, code, data }: {
    message: string;
    status?: number;
    code?: string;
    data?: any;
  }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.data = data;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }

  isUnauthorized(): boolean {
    return this.status === 401;
  }

  isForbidden(): boolean {
    return this.status === 403;
  }

  isNetworkError(): boolean {
    return this.code === 'ECONNABORTED' || this.code === 'ERR_NETWORK';
  }

  isRateLimited(): boolean {
    return this.status === 429;
  }
}