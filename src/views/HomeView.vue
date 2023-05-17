<script lang="ts">
import { defineComponent } from 'vue'
import {
  fetchProducts,
  fetchProductsByName,
  fetchCategories,
  fetchProductsByCategoryId
} from '@/api/index'
import type { Product, Categories } from '@/axios/types'
import Card from '@/components/ProductCard.vue'

export default defineComponent({
  components: {
    'app-card': Card
  },
  data() {
    return {
      products: [] as Product[],
      categories: [] as Categories[],
      isLoading: false,
      error: false,
      searchQuery: '',
      categoryOptions: [] as string[],
      selectedCategory: null as number | null
    }
  },
  async mounted() {
    try {
      await this.fetchCategories()
      await this.fetchProducts()
    } catch (error) {
      console.error(error)
      this.error = true
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await fetchCategories()
        this.categories = response
        this.categoryOptions = this.categories.map((category) => category.name)
      } catch (error) {
        console.error(error)
        this.error = true
      }
    },
    async fetchProducts() {
      try {
        if (this.searchQuery.trim() === '') {
          const response = await fetchProducts()
          this.products = response
        } else {
          const response = await fetchProductsByName(this.searchQuery)
          this.products = response
        }
      } catch (error) {
        console.error(error)
        this.error = true
      }
    },
    async searchProducts() {
      this.error = false
      try {
        await this.fetchProducts()
      } catch (error) {
        console.error(error)
        this.error = true
      }
    },
    async searchProductsByCategory(categoryId: number) {
      try {
        const response = await fetchProductsByCategoryId(categoryId)
        this.products = response
      } catch (error) {
        console.error(error)
        this.error = true
      }
    }
  },
  watch: {
    selectedCategory(val: string) {
      const selectedCategory = this.categories.find((category) => category.name === val)
      if (selectedCategory) {
        this.searchProductsByCategory(selectedCategory.id)
      }
    }
  }
})
</script>

<template>
  <template v-if="isLoading">
    <v-progress-circular indeterminate size="64" />
  </template>
  <template v-else-if="error">
    <p>An error occurred while loading the product.</p>
  </template>
  <template v-else>
    <v-container fluid>
      <h1>Products</h1>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="searchQuery"
            variant="outlined"
            label="Search"
            @input="searchProducts"
          />
          <v-autocomplete
            v-model="selectedCategory"
            label="Autocomplete"
            variant="outlined"
            :items="categoryOptions"
          ></v-autocomplete>
        </v-col>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
          <app-card :product="product" />
        </v-col>
      </v-row>
    </v-container>
  </template>
</template>
