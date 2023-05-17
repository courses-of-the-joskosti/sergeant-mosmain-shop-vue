<script lang="ts">
import { defineComponent } from 'vue'
import { formatNumber } from '@/utils'
import type { Product } from '@/axios/types'
import { mapActions } from 'vuex'

export default defineComponent({
  props: {
    product: {
      type: Object as () => Product,
      required: true
    }
  },
  methods: {
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
      <v-btn variant="flat" color="grey-darken-4" border @click="addToCart(product)">
        Add to cart
      </v-btn>
    </v-card-actions>
  </v-card>
</template>