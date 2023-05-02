<script lang="ts">
import { defineComponent } from 'vue'
import axios from '@/axios/axiosInstance'
import { getProducts } from '@/axios/routes'
import type { Product } from '@/axios/types'

export default defineComponent({
  data() {
    return {
      products: [] as Product[]
    }
  },
  mounted() {
    axios.get(getProducts()).then((response) => {
      this.products = response.data
    })
  }
})
</script>

<template>
  <h1>Products</h1>

  <v-container>
    <v-row no-gutters align="start" style="height: 150px">
      <v-col sm="12" md="6" lg="12" xl="12" xxl="12" style="min-width: 250px">
        <v-sheet>
          <p>test</p>
        </v-sheet>
      </v-col>

      <v-col sm="12" md="6" lg="12" xl="12" xxl="12" style="min-width: 250px">
        <v-sheet>
          <p>test</p>
        </v-sheet>
      </v-col>

      <v-col sm="12" md="6" lg="12" xl="12" xxl="12" style="min-width: 250px">
        <v-sheet>
          <p>test</p>
        </v-sheet>
      </v-col>

      <v-col sm="12" md="6" lg="12" xl="12" xxl="12" style="min-width: 250px">
        <v-sheet class="bg-red">
          <p>OPAOPA</p>
        </v-sheet>
      </v-col>

      <v-col sm="12" md="6" lg="12" xl="12" xxl="12" style="min-width: 250px">
        <v-sheet>
          <p>test</p>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>

  <v-container>
    <v-row>
      <v-col v-for="product in products" :key="product.id" cols="12" sm="6" md="4" lg="3">
        <v-card theme="light" class="mx-auto my-12">
          <v-img aspect-ratio="1/1" :src="product.image_url" :height="250" class="ma-1"></v-img>
          <v-card-item>
            <p class="text-subtitle-1">{{ product.name }}</p>

            <v-card-subtitle>
              <span class="me-1">{{ product.description }}</span>
            </v-card-subtitle>
            <div class="d-flex align-center justify-end">
              <p class="text-subtitle-1 font-weight-bold pr-2">{{ product.price }} ₽</p>
              <v-btn append-icon="mdi-cart" color="grey-darken-4">test</v-btn>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <!-- <div class="product-card" v-for="product in products" :key="product.id">
      <div>
        <img :src="product.image_url" style="height: 100px" />
      </div>
      <p>{{ product.name }}</p>
      <p>{{ product.price }}<b>₽</b></p>
    </div> -->
  </v-container>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-wrap: wrap;
}

.product-card {
  display: flex;
  flex-direction: column;
  width: 33%;
}
</style>
