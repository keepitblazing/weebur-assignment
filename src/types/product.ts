export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  reviews: Review[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductsParams {
  limit?: number;
  skip?: number;
  select?: string;
}

export enum ViewMode {
  LIST = "list",
  GRID = "grid",
}

export type BrandType = "Apple" | "Samsung" | "Weebur";

export interface AddProductRequestBody {
  title: string;
  description?: string;
  price: number;
  discountPercentage?: number;
  brand: BrandType;
}
