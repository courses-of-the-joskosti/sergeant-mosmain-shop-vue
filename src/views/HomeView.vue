<script lang="ts">
import { defineComponent } from 'vue'
import axios from '@/axios/axiosInstance'
import { getProducts } from '@/axios/routes'
import type { Product } from '@/axios/types'
import Card from '@/components/ProductCard.vue'

export default defineComponent({
  components: {
    'app-card': Card
  },
  data() {
    return {
      products: [] as Product[],
      isLoading: true,
      error: false
    }
  },
  mounted() {
    this.fetchProduct()
  },
  methods: {
    fetchProduct() {
      axios
        .get(getProducts())
        .then((response) => {
          this.products = response.data
          this.isLoading = false
        })
        .catch((error) => {
          console.error(error)
          this.isLoading = false
          this.error = true
        })
    },
    linkToProduct(id: Number) {
      return `/product/${id}`
    },
    ...mapActions(['addToCart'])
  },
  computed: {
    formatNumber(): (num: number) => string {
      return formatNumber
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
        <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
          <app-card :product="product"/>
        </v-col>
      </v-row>
    </v-container>
  </template>
</template>
