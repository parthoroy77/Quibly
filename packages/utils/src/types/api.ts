export type TMeta = {
  page: number;
  limit: number;
  total: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
};
export interface IApiResponse<T> {
  data: T | null;
  success: boolean;
  message: string;
  error?: unknown;
  statusCode: number;
  meta?: TMeta;
}
export interface IApiError {
  data: null;
  success: boolean;
  message: string;
  error: any[];
}
