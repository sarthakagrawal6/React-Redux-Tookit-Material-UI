export interface ApiResponse<T = any> {
  message: string;
  status: number;
  data: T;
}
export type ApiState = "loading" | "succeeded" | "failed" | "idle";

export interface PaginatedQuery {
  pageIndex: number;
  pageSize: number;
  search?: string;
  sort_by?: string;
  sort_order?: "asc" | "desc";
}
