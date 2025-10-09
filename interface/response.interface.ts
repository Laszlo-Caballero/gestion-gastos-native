export interface ApiResponse<T> {
  body: T;
  message: string;
  success: boolean;
}
