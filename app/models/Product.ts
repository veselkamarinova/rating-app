export class Product {
  price: number;
  store: string;
  typeProduct: string;

  constructor(price: number, store: string, typeProduct: string) {
    this.price = price;
    this.store = store;
    this.typeProduct = typeProduct;
  }
}