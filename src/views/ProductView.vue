<script lang="ts">
import { defineComponent } from 'vue'
import axios from '@/axios/axiosInstance'
import { getProductId } from '@/axios/routes'
import type { Product } from '@/axios/types'

export default defineComponent({
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      product: {} as Product,
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
        .get(getProductId(this.id))
        .then(({ data }) => {
          if (data && data.length > 0) {
            this.product = data[0]
          } else {
            this.error = true
          }
          this.isLoading = false
        })
        .catch((error) => {
          console.error(error)
          this.isLoading = false
          this.error = true
        })
    }
  }
})
</script>

<template>
  <template v-if="isLoading">
    <v-container>
      <v-row justify="center">
        <v-col align-self="center" class="text-center">
          <v-sheet class="pa-2 ma-2 justify-center">
            <v-progress-circular indeterminate size="64" />
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </template>
  <template v-else-if="error">
    <p>An error occurred while loading the product.</p>
  </template>
  <template v-else>
    <h2>{{ product.title }}</h2>
    <p>{{ product.description }}</p>
    <p>Price: {{ product.price }}</p>
  </template>
</template>
