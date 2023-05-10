<script lang="ts">
import { defineComponent } from 'vue'
import axios from '@/axios/axiosInstance'
import { getProducts } from '@/axios/routes'
import type { Product } from '@/axios/types'
import { mapActions } from 'vuex'

export default defineComponent({
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
    formatNumber(num: number) {
      return num.toLocaleString('ru-RU')
    },
    linkToProduct(id: Number) {
      return `/product/${id}`
    },
    ...mapActions(['addToCart'])
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
          <v-card theme="light" variant="flat" class="d-flex flex-column h-100">
            <v-card-item>
              <a :href="linkToProduct(product.id)">
                <v-img :aspect-ratio="1 / 1" :src="product.image_url"></v-img>
                <p class="text-body-2 text-break">{{ product.name }}</p>
              </a>
            </v-card-item>
            <v-spacer></v-spacer>
            <v-card-actions class="d-flex align-center justify-end pa-4">
              <p class="text-subtitle-1 font-weight-bold pr-2">
                {{ formatNumber(product.price) }} ₽
              </p>
              <v-btn
                variant="flat"
                color="grey-darken-4"
                border
                @click="addToCart(product)"
              >
                Add to cart
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
</template>
