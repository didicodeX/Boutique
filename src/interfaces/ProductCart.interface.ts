import type { Category } from "./Filters.interface.js";
import type { ProductInterface } from "./Product.interface.ts";

export interface ProductCartInterface extends ProductInterface {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
  category: Category
  quantity: number
}
