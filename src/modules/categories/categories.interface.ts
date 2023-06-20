export interface Category {
  _id: string;
  categoryName: string;
  count?: number;
  createdAt: Date | string;
  status: number;
  updatedAt: Date | string;
}
