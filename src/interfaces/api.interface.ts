export interface ApiResponse<T = any> {
  message: string;
  status: number;
  data: T;
}
export type ApiState = "loading" | "succeeded" | "failed" | "idle";
