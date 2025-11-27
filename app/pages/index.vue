<template>
  <div>
    <h1>Wine Test</h1>
    <p>Label: {{myWine.label }}</p>
    <p>Price: {{ myWine.price }} EUR</p>
    <p>Vintage: {{ myWine.vintage }}</p>
    <p>Grape: {{ myWine.grapeVarietal }}</p>
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
</script>