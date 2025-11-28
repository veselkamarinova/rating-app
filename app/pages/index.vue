<template>
  <div>
    <h1>Add New Wine</h1>
    <form @submit.prevent="addWine" class="wine-form">
      <div class="form-group">
        <label>Label:</label>
        <input v-model="newWine.label" placeholder="e.g. Château Margaux" required>
      </div>

      <div class="form-group">
        <label>Wine Type:</label>
        <select v-model="newWine.typeWine" required>
          <option :value="WineType.Still">Still</option>
          <option :value="WineType.Sparkling">Sparkling</option>
          <option :value="WineType.Fortified">Fortified</option>
          <option :value="WineType.Dessert">Dessert</option>
          <option :value="WineType.Orange">Orange</option>
        </select>
      </div>

      <div class="form-group">
        <label>Wine Color:</label>
        <select v-model="newWine.wineColor" required>
          <option :value="WineColor.Red">Red</option>
          <option :value="WineColor.White">White</option>
          <option :value="WineColor.Rose">Rosé</option>
        </select>
      </div>

      <div class="form-group">
        <label>Grape Varietal:</label>
        <input v-model="newWine.grapeVarietal" placeholder="e.g. Cabernet Sauvignon" required>
      </div>

      <div class="form-group">
        <label>Winery:</label>
        <input v-model="newWine.winery" placeholder="e.g. Château Margaux" required>
      </div>

      <div class="form-group">
        <label>Appellation / Region:</label>
        <input v-model="newWine.appellation" placeholder="e.g. Bordeaux, Bulgaria" required>
      </div>

      <div class="form-group">
        <label>Vintage (Year):</label>
        <input v-model.number="newWine.vintage" type="number" placeholder="e.g. 2020" min="1900" max="2025" required>
      </div>

      <div class="form-group">
        <label>Price:</label>
        <input v-model.number="newWine.price" type="number" step="0.01" placeholder="e.g. 25.99" min="0" required>
      </div>

      <div class="form-group">
        <label>Store / Shop:</label>
        <input v-model="newWine.store" placeholder="e.g. Wine Shop Sofia" required>
      </div>

      <button type="submit" class="submit-btn">Add Wine to Collection</button>
    </form>

    <hr>

    <h1>My Wine Collection ({{ wines.length }} wines)</h1>
    <div v-for="wine in wines" :key="wine.label" class="wine-card">
      <h2>{{ wine.label }}</h2>
      <p><strong>Type:</strong> {{ wine.typeWine }}</p>
      <p><strong>Color:</strong> {{ wine.wineColor }}</p>
      <p><strong>Grape:</strong> {{ wine.grapeVarietal }}</p>
      <p><strong>Winery:</strong> {{ wine.winery }}</p>
      <p><strong>Region:</strong> {{ wine.appellation }}</p>
      <p><strong>Vintage:</strong> {{ wine.vintage }}</p>
      <p><strong>Store:</strong> {{ wine.store }}</p>
      <p><strong>Price:</strong> {{ wine.price }} EUR</p>
      <p><strong>Rating:</strong> {{ getStars(wine.rating) }}</p>
      <hr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Wine } from '~/models/Wine';
import { WineType, WineColor } from '~/models/enums';

// Form data for new wine
const newWine = ref({
  label: '',
  price: 0,
  store: '',
  typeWine: WineType.Still,
  wineColor: WineColor.Red,
  grapeVarietal: '',
  winery: '',
  appellation: '',
  vintage: 2024
});

// Make wines array reactive
const wines = ref<Wine[]>([
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
]);

// Rate the existing wines
wines.value[0]?.setRating(5);
wines.value[1]?.setRating(4);
wines.value[2]?.setRating(3);

// Function to add new wine
const addWine = () => {
  const wine = new Wine(
    newWine.value.price,
    newWine.value.store,
    'wine',
    newWine.value.label,
    newWine.value.typeWine,
    newWine.value.wineColor,
    newWine.value.grapeVarietal,
    newWine.value.winery,
    newWine.value.appellation,
    newWine.value.vintage
  );
  
  wines.value.unshift(wine);  // Add to BEGINNING of array
  
  // Reset form to default values
  newWine.value = {
    label: '',
    price: 0,
    store: '',
    typeWine: WineType.Still,
    wineColor: WineColor.Red,
    grapeVarietal: '',
    winery: '',
    appellation: '',
    vintage: 2024
  };
};

// Function to display stars
const getStars = (rating: number): string => {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
};
</script>