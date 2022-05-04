export interface Response<T> {
  status: 'success' | 'failed';
  data?: T;
  error?: {
    message?: string | undefined;
  };
}
