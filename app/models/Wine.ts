import { Product } from './Product';

export class Wine extends Product {
  label: string;
  typeWine: string;
  color: string;
  grapeVarietal: string;
  winery: string;
  appellation: string;
  vintage: number;
  rating: number;

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
    super(price, store, typeProduct);
    
    this.label = label;
    this.typeWine = typeWine;
    this.color = color;
    this.grapeVarietal = grapeVarietal;
    this.winery = winery;
    this.appellation = appellation;
    this.vintage = vintage;
    this.rating = 0;
  }

  setRating(stars: number): void {
    if (stars >= 0 && stars <= 5) {
      this.rating = stars;
    } else {
      console.error('Rating must be between 0 and 5');
    }
  }
}