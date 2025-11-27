import { Product } from './Product';

export class Wine extends Product {
  // Wine-specific properties (only Wine has these)
  label: string;
  typeWine: string;
  color: string;
  grapeVarietal: string;
  winery: string;
  appellation: string;
  vintage: number;

  // Constructor
  constructor(
    price: number,
    store: string,
    typeProduct: string,
    label: string,
    typeWine: string,
    color: string,
    grapeVarietal: string,
    winery: string,
    appellation: string,
    vintage: number
  ) {
    // Call parent (Product) constructor
    super(price, store, typeProduct);
    
    // Set Wine-specific properties
    this.label = label;
    this.typeWine = typeWine;
    this.color = color;
    this.grapeVarietal = grapeVarietal;
    this.winery = winery;
    this.appellation = appellation;
    this.vintage = vintage;
  }
}