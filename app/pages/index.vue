<template>
  <div>
    <h1>My Wine Collection</h1>
    <div v-for="wine in wines" :key="wine.label">
      <h2>{{ wine.label }}</h2>
      <p>Type: {{ wine.typeWine }}</p>
      <p>Color: {{ wine.wineColor }}</p>
      <p>Grape: {{ wine.grapeVarietal }}</p>
      <p>Vintage: {{ wine.vintage }}</p>
      <p>Winery: {{ wine.winery }}</p>
      <p>Price: {{ wine.price }} EUR</p>
      <p>Rating: {{ getStars(wine.rating) }}</p>
      <hr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Wine } from '~/models/Wine';
import { WineType, WineColor } from '~/models/enums';

// Create an array of wines
const wines: Wine[] = [
  new Wine(
    18.87,
    'Vila Melnik',
    'wine',
    'Aplauz',
    WineType.Still,
    WineColor.Red,
    'Melnik 55',
    'Vila Melnik',
    'с. Хърсово',
    2021
  ),
  new Wine(
    25.99,
    'Wine Shop Sofia',
    'wine',
    'Château Margaux',
    WineType.Still,
    WineColor.Red,
    'Cabernet Sauvignon',
    'Château Margaux',
    'Bordeaux',
    2018
  ),
  new Wine(
    15.50,
    'Local Store',
    'wine',
    'Chardonnay Reserve',
    WineType.Still,
    WineColor.White,
    'Chardonnay',
    'Domaine Leflaive',
    'Burgundy',
    2020
  )
];

// Rate the wines
wines[0]?.setRating(5);
wines[1]?.setRating(4);
wines[2]?.setRating(3);

const getStars = (rating: number): string => {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
};
</script>