import type { Category } from "./type.ts";
import type { ProductInterface } from "./Product.interface.ts";

export interface ProductCartInterface extends ProductInterface {
  _id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  category: Category
  quantity: number
}
