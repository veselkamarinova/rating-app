import { Product } from "./Product";
import { WineType, WineColor, ProductType } from "./enums";

export class Wine extends Product {
  label: string;
  typeWine: WineType;
  wineColor: WineColor;
  grapeVarietal: string;
  winery: string;
  appellation: string;
  vintage: number;
  rating: number;

  constructor(
    price: number,
    store: string,
    productType: string,
    label: string,
    typeWine: WineType,
    wineColor: WineColor,
    grapeVarietal: string,
    winery: string,
    appellation: string,
    vintage: number
  ) {
    super(price, store, productType);

    this.label = label;
    this.typeWine = typeWine;
    this.wineColor = wineColor;
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
      console.error("Rating must be between 0 and 5");
    }
  }
}
