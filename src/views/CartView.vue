<script lang="ts">
import { defineComponent } from 'vue'
import type { Product } from '@/axios/types'
import { mapActions, useStore } from 'vuex'

export default defineComponent({
  name: 'CartView',
  data() {
    return {
      selectedProducts: [] as number[]
    }
  },
  computed: {
    cart(): Product[] {
      const store = useStore()
      return store.state.cart
    }
  },
  methods: {
    ...mapActions(['removeFromCart']),
    deleteSelection() {
      // Удаляем выбранные продукты из хранилища Vuex
      this.selectedProducts.forEach((productId) => {
        this.removeFromCart(productId)
      })

      // Очищаем массив выбранных идентификаторов
      this.selectedProducts = []
    },
    toggleSelection(productId: number) {
      if (this.selectedProducts.includes(productId)) {
        // Если товар уже выбран, удаляем его из массива
        const index = this.selectedProducts.indexOf(productId)
        this.selectedProducts.splice(index, 1)
      } else {
        // Если товар еще не выбран, добавляем его в массив
        this.selectedProducts.push(productId)
      }
      console.log(this.selectedProducts)
    }
  }
})
</script>

<template>
  <v-container grid-list-xs>
    <v-container fluid>
      <v-row>
        <v-col>
          <h2>Корзина</h2>
        </v-col>
      </v-row>
    </v-container>
    <v-row>
      <v-col cols="8" sm="12" lg="8">
        <v-container fluid>
          <v-row>
            <v-card>
              <v-btn color="red" @click="deleteSelection">Удалить выбранные</v-btn>
              <v-card
                v-for="product in cart"
                :key="product.id"
                variant="tonal"
                theme="light"
                class="d-flex flex-no-wrap justify-space-between pa-2 ma-2"
              >
                <v-card-actions>
                  <v-checkbox-btn
                    @change="toggleSelection(product.id)"
                    :value="product.id"
                  ></v-checkbox-btn>
                </v-card-actions>
                <v-avatar class="ma-3" size="150" rounded="0">
                  <v-img :aspect-ratio="1 / 1" :src="product.image_url"></v-img>
                </v-avatar>

                <v-card-text class="flex-wrap pa-0">
                  <p>{{ product.name }}</p>

                  <v-card-subtitle class="pa-0">
                    Страна: {{ product.manufacturer }}
                  </v-card-subtitle>
                </v-card-text>

                <span>{{ product.price }}</span>

                <v-btn
                  class="ms-2"
                  variant="outlined"
                  size="small"
                  @click="removeFromCart(product.id)"
                >
                  Удалить
                </v-btn>
              </v-card>
            </v-card>
          </v-row>
        </v-container>
      </v-col>

      <v-col cols="4" sm="12" lg="4">
        <v-card>Make an order block</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
