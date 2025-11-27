<template>
  <div>
    <h1>Wine Test</h1>
    <p>Label: {{myWine.label }}</p>
    <p>typeWine: {{ myWine.typeWine }}</p>
    <p>Grape: {{ myWine.grapeVarietal }}</p>
    <p>Vintage: {{ myWine.vintage }}</p>
    <p>Winery: {{ myWine.winery }}</p>
    <p>Price: {{ myWine.price }} EUR</p>
    <p>Rating: {{ getStars(myWine.rating) }}</p>
  </div>
</template>

<script setup lang="ts">
import { Wine } from '~/models/Wine';

const myWine = new Wine(
  18.87,                    // price
  'Vila Melnik',            // store
  'wine',                   // typeProduct
  'Aplauz',                 // label
  'Red',                    // typeWine
  'Red',                    // color
  'Melnik 55',                 // grapeVarietal
  'Vila Melnik',            // winery
  'Bulgaria',               // appellation
  2021                      // vintage
);
// Rate the wine!
myWine.setRating(4);

// Function to display stars
const getStars = (rating: number): string => {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
};
</script>