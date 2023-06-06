<script lang="ts">
import { defineComponent } from 'vue'
import {
  fetchProducts,
  fetchProductsByName,
  fetchProductsCount,
  fetchProductsByNameCount
} from '@/api/index'
import type { Product, Category } from '@/axios/types'
import Card from '@/components/ProductCard.vue'

export default defineComponent({
  components: {
    'app-card': Card
  },
  data() {
    return {
      products: [] as Product[],
      categories: [] as Category[],
      isLoading: false,
      error: false,
      searchQuery: '',
      categoryOptions: [] as string[],
      productsPerPage: 8 as number,
      limit: 0 as number,
      totalProducts: 0 as number
      // selectedCategory: null as number | null
    }
  },
  async mounted() {
    try {
      // await this.fetchCategories()
      await this.fetchProducts()
    } catch (error) {
      console.error(error)
      this.error = true
    } finally {
      this.isLoading = false
    }
  },
  methods: {
    refsreshLimit() {
      this.limit = this.productsPerPage
    },
    // async fetchCategories() {
    //   try {
    //     const response = await fetchCategories()
    //     this.categories = response
    //     this.categoryOptions = this.categories.map((category) => category.name)
    //   } catch (error) {
    //     console.error(error)
    //     this.error = true
    //   }
    // },
    async fetchProducts() {
      if (this.limit == 0) {
        this.refsreshLimit()
      }
      try {
        if (this.searchQuery.trim() === '') {
          const response = await fetchProducts(this.limit)
          this.products = response
          this.totalProducts = await fetchProductsCount()
        } else {
          const response = await fetchProductsByName(this.searchQuery, this.limit)
          this.products = response
          this.totalProducts = await fetchProductsByNameCount(this.searchQuery)
        }
      } catch (error) {
        console.error(error)
        this.error = true
      }
    },
    async searchProducts() {
      this.error = false
      this.refsreshLimit()

      try {
        await this.fetchProducts()
      } catch (error) {
        console.error(error)
        this.error = true
      }
    },
    // async searchProductsByCategory(categoryId: number) {
    //   try {
    //     const response = await fetchProductsByCategoryId(categoryId)
    //     this.products = response
    //   } catch (error) {
    //     console.error(error)
    //     this.error = true
    //   }
    // }
    showMore() {
      this.limit += this.productsPerPage
      this.fetchProducts()
    }
  },
  watch: {
    //   selectedCategory(val: string) {
    //     const selectedCategory = this.categories.find((category) => category.name === val)
    //     if (selectedCategory) {
    //       this.searchProductsByCategory(selectedCategory.id)
    //     }
    //   }
  },
  computed: {
    getClicks() {
      return this.totalProducts - this.limit > 0 ? true : false
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
        </v-col>
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
          <app-card :product="product" />
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn v-if="getClicks" class="w-100" color="success" @click="showMore">show more</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </template>
</template>
