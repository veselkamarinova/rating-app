export class Product {
  name: string;
  price: number;
  store: string;
  type: string;

  constructor(name: string, price: number, store: string, type: string) {
    this.name = name;
    this.price = price;
    this.store = store;
    this.type = type;
  }
}