<script lang="ts">
import { defineComponent } from 'vue'
import type { Product } from '@/axios/types'
import { mapActions, useStore } from 'vuex'
import { formatNumber } from '@/utils'

export default defineComponent({
  name: 'CartView',
  data() {
    return {
      selectedProducts: [] as number[],
      selectAllChecked: false as Boolean,
      hideDeleteButton: true as Boolean
    }
  },
  computed: {
    cart(): Product[] {
      const store = useStore()
      return store.state.cart
    },
    getTotalPrice() {
      const selectedProducts = this.cart.filter((product) =>
        this.selectedProducts.includes(product.id)
      )
      const totalPrice = selectedProducts.reduce((sum, product) => sum + product.total_price, 0)
      return totalPrice
    },
    formatNumber(): (num: number) => string {
      return formatNumber
    }
  },
  methods: {
    ...mapActions(['removeFromCart']),
    deleteSelection() {
      const selectedIds = [...this.selectedProducts]
      selectedIds.forEach((id) => {
        this.removeFromCart(id)
      })
      this.selectedProducts = []
      localStorage.removeItem('selectedProducts') // Удаляем сохраненное значение из локального хранилища
      this.selectAllChecked = false // Снимаем выделение с кнопки "Выбрать все"
    },
    toggleSelection() {
      // Сохраняем состояние выбранных товаров в локальном хранилище
      localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts))

      if (this.selectedProducts.length === this.cart.length) {
        this.selectAllChecked = true
      } else {
        this.selectAllChecked = false
      }

      // Проверяем количество выбранных товаров и скрываем кнопку "Удалить выбранное", если ничего не выбрано
      if (this.selectedProducts.length === 0) {
        this.hideDeleteButton = true
      } else {
        this.hideDeleteButton = false
      }
    },
    toggleSelectAll() {
      if (this.selectAllChecked) {
        // Выбираем все товары
        this.selectedProducts = this.cart.map((product) => product.id)
        this.hideDeleteButton = false
      } else {
        // Снимаем выделение со всех товаров
        this.selectedProducts = []
        this.hideDeleteButton = true
      }

      // Сохраняем состояние выбранных товаров в локальном хранилище
      localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts))
    },
    removeProduct(productId: number, isSelected: boolean) {
      if (isSelected) {
        // Удаление выбранного товара из selectedProducts
        const index = this.selectedProducts.indexOf(productId)
        if (index !== -1) {
          this.selectedProducts.splice(index, 1)
        }
      }

      this.removeFromCart(productId)
      // Сохраняем состояние выбранных товаров в локальном хранилище
      localStorage.setItem('selectedProducts', JSON.stringify(this.selectedProducts))
    }
  },
  mounted() {
    const savedSelectedProducts = localStorage.getItem('selectedProducts')
    if (savedSelectedProducts) {
      this.selectedProducts = JSON.parse(savedSelectedProducts)
    }

    // Показать кнопку удалить выбранное, если выбран >0 чекбоксов
    if (this.selectedProducts.length > 0) {
      this.hideDeleteButton = false
    }

    // Установка состояния чекбокса "Выбрать все"
    if (this.selectedProducts.length === this.cart.length) {
      this.selectAllChecked = true
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
              <div class="d-flex">
                <v-checkbox-btn
                  class="mt-2 ml-2 w-auto"
                  color="red"
                  label="Выбрать все"
                  v-model="selectAllChecked"
                  @change="toggleSelectAll"
                ></v-checkbox-btn>
                <v-btn
                  color="red"
                  class="mt-2 mx-2"
                  @click="deleteSelection"
                  v-if="!hideDeleteButton"
                  >Удалить выбранные</v-btn
                >
              </div>
              <v-card
                v-for="product in cart"
                :key="product.id"
                variant="tonal"
                theme="light"
                class="d-flex flex-no-wrap justify-space-between pa-2 ma-2"
              >
                <v-card-actions>
                  <v-checkbox-btn
                    @change="toggleSelection"
                    v-model="selectedProducts"
                    :value="product.id"
                  ></v-checkbox-btn>
                </v-card-actions>
                <v-avatar class="ma-3" size="150" rounded="0">
                  <v-img :aspect-ratio="1 / 1" :src="product.images[0]"></v-img>
                </v-avatar>

                <v-card-text class="flex-wrap pa-0">
                  <p>{{ product.title }}</p>

                  <v-card-subtitle class="pa-0">
                    Страна: {{ product.manufacturer }}
                  </v-card-subtitle>

                  <v-card-subtitle class="pa-0">
                    Количество: {{ product.quantity }}
                  </v-card-subtitle>
                  <v-card-subtitle class="pa-0">
                    ID: {{ product.id }}
                  </v-card-subtitle>
                </v-card-text>

                <span>{{ formatNumber(product.price) }}</span>

                <v-btn
                  class="ms-2"
                  variant="outlined"
                  size="small"
                  @click="removeProduct(product.id, selectedProducts.includes(product.id))"
                >
                  Удалить
                </v-btn>
              </v-card>
            </v-card>
          </v-row>
        </v-container>
      </v-col>

      <v-col cols="4" sm="12" lg="4">
        <v-card
          ><span class="fw-bold"
            >Сумма выбранных товаров: {{ formatNumber(getTotalPrice) }}</span
          ></v-card
        >
      </v-col>
    </v-row>
  </v-container>
</template>
