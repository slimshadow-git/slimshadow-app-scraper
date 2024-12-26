export interface FileData {
  file_name: string;
  link: string;
}

export interface ApiSuccessResponse {
  page: number;
  per_page: number;
  total_pages: number;
  total_items: number;
  data: FileData[];
}

export interface ApiErrorResponse {
  error: string;
  total_pages: number;
  total_items: number;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export const isErrorResponse = (response: ApiResponse): response is ApiErrorResponse => {
  return 'error' in response;
}