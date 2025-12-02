export class Product {
  price: number;
  store: string;
  typeProduct: string;
  country?: string;
  producer?: string;

  constructor(
    price: number,
    store: string,
    typeProduct: string,
    country?: string,
    producer?: string
  ) {
    this.price = price;
    this.store = store;
    this.typeProduct = typeProduct;
    this.country = country;
    this.producer = producer;
  }
}
