export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  id: number;
  title: string;
  src_url: string;
  gallery?: string[];
  category: string;
  price_idr: number;
  price_usd: number;
  discount_amount: number;
  discount_percentage: number;
  rating: number;
  stock: number;
  description: string;
  pre_order_is: boolean;
  pre_order_duration: number;
  specification: Record<string, string>;
  price?: number; 
};