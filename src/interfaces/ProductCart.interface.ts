import type { ProductInterface } from "./Product.interface.ts";

export interface ProductCartInterface extends ProductInterface {
  quantity: number
}
