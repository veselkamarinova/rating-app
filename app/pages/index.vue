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
        <input v-model.number="newWine.vintage" type="number" placeholder="e.g. 2020 (or leave 0 for NV)" min="0" max="2025">
        <small style="display: block; color: #666; margin-top: 5px;">Enter 0 for Non-Vintage wines</small>
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

    <h1>My Wine Collection ({{ filteredWines.length }} wines)</h1>
    
    <!-- Search Box -->
    <div style="margin-bottom: 20px;">
      <input 
        v-model="searchQuery" 
        type="text" 
        placeholder="🔍 Search wines by name, winery, or grape..."
        style="width: 100%; padding: 10px; font-size: 16px; border: 2px solid #ddd; border-radius: 4px;"
      >
    </div>

    <!-- Filters -->
    <div style="margin-bottom: 20px; display: flex; gap: 10px; flex-wrap: wrap;">
      <div>
        <label><strong>Type:</strong></label>
        <select v-model="typeFilter" style="padding: 8px; border-radius: 4px; border: 2px solid #ddd;">
          <option value="">All Types</option>
          <option :value="WineType.Still">Still</option>
          <option :value="WineType.Sparkling">Sparkling</option>
          <option :value="WineType.Fortified">Fortified</option>
          <option :value="WineType.Dessert">Dessert</option>
          <option :value="WineType.Orange">Orange</option>
        </select>
      </div>

      <div>
        <label><strong>Color:</strong></label>
        <select v-model="colorFilter" style="padding: 8px; border-radius: 4px; border: 2px solid #ddd;">
          <option value="">All Colors</option>
          <option :value="WineColor.Red">Red</option>
          <option :value="WineColor.White">White</option>
          <option :value="WineColor.Rose">Rosé</option>
        </select>
      </div>

      <div>
        <label><strong>Rating:</strong></label>
        <select v-model="ratingFilter" style="padding: 8px; border-radius: 4px; border: 2px solid #ddd;">
          <option value="0">All Ratings</option>
          <option value="5">5 Stars ⭐⭐⭐⭐⭐</option>
          <option value="4">4+ Stars ⭐⭐⭐⭐</option>
          <option value="3">3+ Stars ⭐⭐⭐</option>
          <option value="2">2+ Stars ⭐⭐</option>
          <option value="1">1+ Stars ⭐</option>
        </select>
      </div>

      <button 
        @click="clearFilters" 
        style="padding: 8px 15px; background-color: #6c757d; color: white; border: none; border-radius: 4px; cursor: pointer;"
      >
        Clear Filters
      </button>
    </div>

    <div v-for="wine in filteredWines" :key="wine.label" class="wine-card">
      <h2>{{ wine.label }}</h2>
      <p><strong>Type:</strong> {{ wine.typeWine }}</p>
      <p><strong>Color:</strong> {{ wine.wineColor }}</p>
      <p><strong>Grape:</strong> {{ wine.grapeVarietal }}</p>
      <p><strong>Winery:</strong> {{ wine.winery }}</p>
      <p><strong>Region:</strong> {{ wine.appellation }}</p>
      <p><strong>Vintage:</strong> {{ wine.vintage }}</p>
      <p><strong>Store:</strong> {{ wine.store }}</p>
      <p><strong>Price:</strong> {{ wine.price }} EUR</p>
      <p><strong>Rating:</strong></p>
      <div class="star-rating">
        <span 
          v-for="star in 5" 
          :key="star"
          @click="wine.setRating(star)"
          class="star"
          style="cursor: pointer; font-size: 1.5em;"
        >
          {{ star <= wine.rating ? '⭐' : '☆' }}
        </span>
      </div>
      <button @click="deleteWine(wine)" style="margin-top: 10px; padding: 5px 15px; background-color: #dc3545; color: white; border: none; border-radius: 4px; cursor: pointer;">Delete Wine</button>
      <hr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue';
import { Wine } from '~/models/Wine';
import { WineType, WineColor } from '~/models/enums';

// Search query
const searchQuery = ref('');

// Filter variables
const typeFilter = ref('');
const colorFilter = ref('');
const ratingFilter = ref(0);

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

// Computed property for filtered wines
const filteredWines = computed(() => {
  let result = wines.value;
  
  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(wine => 
      wine.label.toLowerCase().includes(query) ||
      wine.winery.toLowerCase().includes(query) ||
      wine.grapeVarietal.toLowerCase().includes(query) ||
      wine.appellation.toLowerCase().includes(query) ||
      wine.typeWine.toLowerCase().includes(query) ||
      wine.wineColor.toLowerCase().includes(query)
    );
  }
  
  // Apply type filter
  if (typeFilter.value) {
    result = result.filter(wine => wine.typeWine === typeFilter.value);
  }
  
  // Apply color filter
  if (colorFilter.value) {
    result = result.filter(wine => wine.wineColor === colorFilter.value);
  }
  
  // Apply rating filter
  if (ratingFilter.value > 0) {
    result = result.filter(wine => wine.rating >= ratingFilter.value);
  }
  
  return result;
});

// Load wines from localStorage on page load
onMounted(() => {
  const savedWines = localStorage.getItem('wines');
  
  if (savedWines) {
    try {
      const parsed = JSON.parse(savedWines);
      const wineObjects = parsed.map((data: any) => {
        const wine = new Wine(
          data.price,
          data.store,
          data.typeProduct,
          data.label,
          data.typeWine,
          data.wineColor,
          data.grapeVarietal,
          data.winery,
          data.appellation,
          data.vintage
        );
        wine.setRating(data.rating);
        return wine;
      });
      wines.value = wineObjects;
    } catch (error) {
      console.error('Error loading wines:', error);
    }
  }
});

// Save wines to localStorage whenever they change
watch(wines, () => {
  localStorage.setItem('wines', JSON.stringify(wines.value));
}, { deep: true });

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

// Function to delete a wine
const deleteWine = (wineToDelete: Wine) => {
  wines.value = wines.value.filter(wine => wine !== wineToDelete);
};

// Function to clear all filters
const clearFilters = () => {
  searchQuery.value = '';
  typeFilter.value = '';
  colorFilter.value = '';
  ratingFilter.value = 0;
};

// Function to display stars
const getStars = (rating: number): string => {
  return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
};
</script>