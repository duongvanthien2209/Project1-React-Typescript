export interface Response<T> {
  readonly status: 'success' | 'failed';
  data?: T;
  error?: {
    message: string;
  };
}
