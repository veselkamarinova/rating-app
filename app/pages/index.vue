<template>
  <div
    class="min-vh-100"
    style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)"
  >
    <div class="container py-5">
      <div class="text-center mb-5">
        <h1
          class="display-3 fw-bold mb-3"
          style="
            background: linear-gradient(
              135deg,
              #6a1b4d 0%,
              #8b3a62 50%,
              #6a1b4d 100%
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          "
        >
          <span style="background: none; -webkit-text-fill-color: initial"
            >🍷</span
          >
          Wine Rating Collection
        </h1>
        <p class="lead text-secondary fs-5">
          Curate and discover your perfect wines
        </p>
      </div>

      <div class="card border-0 shadow mb-5">
        <div class="card-body p-4">
          <div class="d-flex align-items-center mb-4">
            <div
              class="rounded-circle d-flex align-items-center justify-content-center me-3"
              style="
                width: 48px;
                height: 48px;
                background: linear-gradient(135deg, #6a1b4d 0%, #8b3a62 100%);
              "
            >
              <span class="text-white fs-4">+</span>
            </div>
            <div>
              <h2 class="h4 mb-0 fw-bold text-dark">Add New Wine</h2>
              <p class="text-muted small mb-0">Expand your collection</p>
            </div>
          </div>
          <form @submit.prevent="addWine">
            <div class="mb-3">
              <label class="form-label fw-semibold">Label:</label>
              <input
                v-model="newWine.label"
                class="form-control"
                placeholder="e.g. Château Margaux"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Wine Type:</label>
              <select v-model="newWine.typeWine" class="form-select" required>
                <option :value="WineType.Still">Still</option>
                <option :value="WineType.Sparkling">Sparkling</option>
                <option :value="WineType.Fortified">Fortified</option>
                <option :value="WineType.Dessert">Dessert</option>
                <option :value="WineType.Orange">Orange</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Wine Color:</label>
              <select v-model="newWine.wineColor" class="form-select" required>
                <option :value="WineColor.Red">Red</option>
                <option :value="WineColor.White">White</option>
                <option :value="WineColor.Rose">Rosé</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Grape Varietal:</label>
              <input
                v-model="newWine.grapeVarietal"
                class="form-control"
                placeholder="e.g. Cabernet Sauvignon"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Winery:</label>
              <input
                v-model="newWine.winery"
                class="form-control"
                placeholder="e.g. Château Margaux"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold"
                >Appellation / Region:</label
              >
              <input
                v-model="newWine.appellation"
                class="form-control"
                placeholder="e.g. Bordeaux, Bulgaria"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Vintage (Year):</label>
              <input
                v-model.number="newWine.vintage"
                type="number"
                class="form-control"
                placeholder="e.g. 2020 (or leave 0 for NV)"
                min="0"
                max="2025"
              />
              <small class="form-text text-muted"
                >Enter 0 for Non-Vintage wines</small
              >
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Price:</label>
              <input
                v-model.number="newWine.price"
                type="number"
                step="0.01"
                class="form-control"
                placeholder="e.g. 25.99"
                min="0"
                required
              />
            </div>

            <div class="mb-3">
              <label class="form-label fw-semibold">Store / Shop:</label>
              <input
                v-model="newWine.store"
                class="form-control"
                placeholder="e.g. Wine Shop Sofia"
                required
              />
            </div>

            <div class="d-grid gap-2">
              <button
                type="submit"
                class="btn btn-lg text-white fw-semibold"
                style="
                  background: linear-gradient(135deg, #6a1b4d 0%, #8b3a62 100%);
                  border: none;
                  padding: 14px;
                  border-radius: 12px;
                  transition: transform 0.2s, box-shadow 0.2s;
                "
                onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(106, 27, 77, 0.3)'"
                onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
              >
                ✨ Add to Collection
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="card border-0 shadow mb-4">
        <div class="card-body p-4">
          <div class="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h2 class="h3 mb-1 fw-bold text-dark">My Collection</h2>
              <p class="text-muted mb-0">
                <span
                  class="badge rounded-pill"
                  style="
                    background: linear-gradient(
                      135deg,
                      #6a1b4d 0%,
                      #8b3a62 100%
                    );
                  "
                >
                  {{ filteredWines.length }}
                  {{ filteredWines.length === 1 ? "wine" : "wines" }}
                </span>
                <span v-if="hasActiveFilters" class="ms-2 small text-muted"
                  >· Filtered</span
                >
              </p>
            </div>
          </div>
          <div class="mb-4">
            <input
              v-model="searchQuery"
              type="text"
              class="form-control form-control-lg border-0 shadow-sm"
              style="border-radius: 12px; background-color: #f8f9fa"
              placeholder="🔍 Search wines by name, winery, grape, color, or region..."
            />
          </div>

          <div class="row g-3 mb-4">
            <div class="col-md-3">
              <label class="form-label fw-semibold text-dark small"
                >Type:</label
              >
              <select
                v-model="typeFilter"
                class="form-select border-0 shadow-sm"
                style="border-radius: 10px; background-color: #f8f9fa"
              >
                <option value="">All Types</option>
                <option :value="WineType.Still">Still</option>
                <option :value="WineType.Sparkling">Sparkling</option>
                <option :value="WineType.Fortified">Fortified</option>
                <option :value="WineType.Dessert">Dessert</option>
                <option :value="WineType.Orange">Orange</option>
              </select>
            </div>

            <div class="col-md-3">
              <label class="form-label fw-semibold text-dark small"
                >Color:</label
              >
              <select
                v-model="colorFilter"
                class="form-select border-0 shadow-sm"
                style="border-radius: 10px; background-color: #f8f9fa"
              >
                <option value="">All Colors</option>
                <option :value="WineColor.Red">Red</option>
                <option :value="WineColor.White">White</option>
                <option :value="WineColor.Rose">Rosé</option>
              </select>
            </div>

            <div class="col-md-3">
              <label class="form-label fw-semibold text-dark small"
                >Rating:</label
              >
              <select
                v-model="ratingFilter"
                class="form-select border-0 shadow-sm"
                style="border-radius: 10px; background-color: #f8f9fa"
              >
                <option value="0">All Ratings</option>
                <option value="5">5 Stars ⭐⭐⭐⭐⭐</option>
                <option value="4">4+ Stars ⭐⭐⭐⭐</option>
                <option value="3">3+ Stars ⭐⭐⭐</option>
                <option value="2">2+ Stars ⭐⭐</option>
                <option value="1">1+ Stars ⭐</option>
              </select>
            </div>

            <div class="col-md-3">
              <label class="form-label fw-semibold text-dark small"
                >Sort By:</label
              >
              <select
                v-model="sortBy"
                class="form-select border-0 shadow-sm"
                style="border-radius: 10px; background-color: #f8f9fa"
              >
                <option value="">Default (Most Recent)</option>
                <option value="rating-desc">Rating (High to Low)</option>
                <option value="rating-asc">Rating (Low to High)</option>
                <option value="price-asc">Price (Low to High)</option>
                <option value="price-desc">Price (High to Low)</option>
                <option value="vintage-desc">Vintage (Newest First)</option>
                <option value="vintage-asc">Vintage (Oldest First)</option>
                <option value="label-asc">Label (A-Z)</option>
                <option value="label-desc">Label (Z-A)</option>
              </select>
            </div>
          </div>

          <div class="d-grid mb-3">
            <button
              @click="clearFilters"
              class="btn btn-outline-dark border-2"
              style="border-radius: 10px; font-weight: 500"
            >
              ↻ Clear All Filters
            </button>
          </div>
        </div>
      </div>

      <div class="row">
        <div
          v-for="wine in displayedWines"
          :key="wine.label"
          class="col-md-6 col-lg-4 mb-4"
        >
          <div
            class="card h-100 border-0 shadow"
            style="
              border-radius: 16px;
              transition: transform 0.3s, box-shadow 0.3s;
            "
            onmouseover="this.style.transform='translateY(-8px)'; this.style.boxShadow='0 12px 24px rgba(0,0,0,0.15)'"
            onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.1)'"
          >
            <div class="card-body p-4">
              <div
                class="d-flex justify-content-between align-items-start mb-3"
              >
                <h3 class="h5 mb-0 fw-bold text-dark">{{ wine.label }}</h3>
              </div>
              <div class="small text-muted mb-3">
                <p class="mb-2">
                  <span class="fw-semibold text-dark">Type:</span>
                  {{ wine.typeWine }}
                </p>
                <p class="mb-2">
                  <span class="fw-semibold text-dark">Color:</span>
                  {{ wine.wineColor }}
                </p>
                <p class="mb-2">
                  <span class="fw-semibold text-dark">Grape:</span>
                  {{ wine.grapeVarietal }}
                </p>
                <p class="mb-2">
                  <span class="fw-semibold text-dark">Winery:</span>
                  {{ wine.winery }}
                </p>
                <p class="mb-2">
                  <span class="fw-semibold text-dark">Region:</span>
                  {{ wine.appellation }}
                </p>
                <p class="mb-2">
                  <span class="fw-semibold text-dark">Vintage:</span>
                  {{ wine.vintage === 0 ? "NV (Non-Vintage)" : wine.vintage }}
                </p>
                <p class="mb-2">
                  <span class="fw-semibold text-dark">Store:</span>
                  {{ wine.store }}
                </p>
              </div>
              <div
                class="d-flex justify-content-between align-items-center mb-3 p-3 rounded"
                style="
                  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
                "
              >
                <span class="text-muted small">Price</span>
                <span class="fw-bold fs-5" style="color: #6a1b4d"
                  >{{ wine.price }} EUR</span
                >
              </div>

              <div class="mb-3">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <span class="fw-semibold text-dark small">Your Rating</span>
                </div>
                <div class="star-rating">
                  <span
                    v-for="star in 5"
                    :key="star"
                    @click="wine.setRating(star)"
                    class="star"
                    style="
                      cursor: pointer;
                      font-size: 1.8rem;
                      transition: transform 0.2s;
                    "
                    onmouseover="this.style.transform='scale(1.2)'"
                    onmouseout="this.style.transform='scale(1)'"
                  >
                    {{ star <= wine.rating ? "⭐" : "☆" }}
                  </span>
                </div>
              </div>
              <div class="d-grid gap-2">
                <button
                  @click="deleteWine(wine)"
                  class="btn btn-outline-danger border-2"
                  style="border-radius: 10px; font-weight: 500"
                >
                  🗑️ Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Load More Button -->
      <div v-if="hasMoreWines" class="text-center mt-4">
        <button
          @click="loadMore"
          class="btn btn-lg text-white fw-semibold"
          style="
            background: linear-gradient(135deg, #6a1b4d 0%, #8b3a62 100%);
            border: none;
            padding: 14px 48px;
            border-radius: 12px;
            transition: transform 0.2s, box-shadow 0.2s;
          "
          onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 8px 20px rgba(106, 27, 77, 0.3)'"
          onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='none'"
        >
          Load More Wines ({{ filteredWines.length - 6 }} remaining)
        </button>
        <p class="text-muted small mt-3">
          Showing 6 of {{ filteredWines.length }} wines
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from "vue";
import { Wine } from "~/models/Wine";
import { WineType, WineColor } from "~/models/enums";

// Search query
const searchQuery = ref("");

// Filter variables
const typeFilter = ref("");
const colorFilter = ref("");
const ratingFilter = ref(0);

// Sort variable
const sortBy = ref("");

// Pagination state
const showAll = ref(false);

// Form data for new wine
const newWine = ref({
  label: "",
  price: 0,
  store: "",
  typeWine: WineType.Still,
  wineColor: WineColor.Red,
  grapeVarietal: "",
  winery: "",
  appellation: "",
  vintage: 0, // Default to 0 (NV)
});

// Make wines array reactive
const wines = ref<Wine[]>([
  new Wine(
    18.87,
    "Vila Melnik",
    "wine",
    "Aplauz",
    WineType.Still,
    WineColor.Red,
    "Melnik 55",
    "Vila Melnik",
    "с. Хърсово",
    2021
  ),
  new Wine(
    25.99,
    "Wine Shop Sofia",
    "wine",
    "Château Margaux",
    WineType.Still,
    WineColor.Red,
    "Cabernet Sauvignon",
    "Château Margaux",
    "Bordeaux",
    2018
  ),
  new Wine(
    15.5,
    "Local Store",
    "wine",
    "Chardonnay Reserve",
    WineType.Still,
    WineColor.White,
    "Chardonnay",
    "Domaine Leflaive",
    "Burgundy",
    2020
  ),
]);

// Rate the existing wines
wines.value[0]?.setRating(5);
wines.value[1]?.setRating(4);
wines.value[2]?.setRating(3);

// Check if any filters are active
const hasActiveFilters = computed(() => {
  return (
    searchQuery.value !== "" ||
    typeFilter.value !== "" ||
    colorFilter.value !== "" ||
    ratingFilter.value > 0 ||
    sortBy.value !== ""
  );
});

// Computed property for filtered wines
const filteredWines = computed(() => {
  let result = wines.value;

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(
      (wine) =>
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
    result = result.filter((wine) => wine.typeWine === typeFilter.value);
  }

  // Apply color filter
  if (colorFilter.value) {
    result = result.filter((wine) => wine.wineColor === colorFilter.value);
  }

  // Apply rating filter
  if (ratingFilter.value > 0) {
    result = result.filter((wine) => wine.rating >= ratingFilter.value);
  }

  // Apply sorting
  if (sortBy.value) {
    result = [...result]; // Create a copy to avoid mutating original

    switch (sortBy.value) {
      case "rating-desc":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "rating-asc":
        result.sort((a, b) => a.rating - b.rating);
        break;
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "vintage-desc":
        result.sort((a, b) => b.vintage - a.vintage);
        break;
      case "vintage-asc":
        result.sort((a, b) => a.vintage - b.vintage);
        break;
      case "label-asc":
        result.sort((a, b) => a.label.localeCompare(b.label));
        break;
      case "label-desc":
        result.sort((a, b) => b.label.localeCompare(a.label));
        break;
    }
  }

  return result;
});

// Computed property for displayed wines (with pagination)
const displayedWines = computed(() => {
  // Show all wines if filters are active or showAll is true
  if (hasActiveFilters.value || showAll.value) {
    return filteredWines.value;
  }
  // Otherwise show only first 6 wines
  return filteredWines.value.slice(0, 6);
});

// Check if there are more wines to show
const hasMoreWines = computed(() => {
  return (
    !hasActiveFilters.value && !showAll.value && filteredWines.value.length > 6
  );
});

// Load wines from localStorage on page load
onMounted(() => {
  const savedWines = localStorage.getItem("wines");

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
      console.error("Error loading wines:", error);
    }
  }
});

// Save wines to localStorage whenever they change
watch(
  wines,
  () => {
    localStorage.setItem("wines", JSON.stringify(wines.value));
  },
  { deep: true }
);

// Function to add new wine
const addWine = () => {
  const wine = new Wine(
    newWine.value.price,
    newWine.value.store,
    "wine",
    newWine.value.label,
    newWine.value.typeWine,
    newWine.value.wineColor,
    newWine.value.grapeVarietal,
    newWine.value.winery,
    newWine.value.appellation,
    newWine.value.vintage
  );

  wines.value.unshift(wine); // Add to BEGINNING of array

  // Reset form to default values
  newWine.value = {
    label: "",
    price: 0,
    store: "",
    typeWine: WineType.Still,
    wineColor: WineColor.Red,
    grapeVarietal: "",
    winery: "",
    appellation: "",
    vintage: 0, // Default to 0 (NV)
  };
};

// Function to delete a wine
const deleteWine = (wineToDelete: Wine) => {
  wines.value = wines.value.filter((wine) => wine !== wineToDelete);
};

// Function to clear all filters
const clearFilters = () => {
  searchQuery.value = "";
  typeFilter.value = "";
  colorFilter.value = "";
  ratingFilter.value = 0;
  sortBy.value = "";
  showAll.value = false;
};

// Function to load more wines
const loadMore = () => {
  showAll.value = true;
};

// Function to display stars
const getStars = (rating: number): string => {
  return "⭐".repeat(rating) + "☆".repeat(5 - rating);
};
</script>

<style scoped>
/* Minimal custom styles - Bootstrap handles most styling */
</style>
