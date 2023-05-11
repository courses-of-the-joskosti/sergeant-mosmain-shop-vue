<script lang="ts">
import { defineComponent } from 'vue'
import type { Product } from '@/axios/types'
import { mapActions, useStore } from 'vuex'


export default defineComponent({
  name: 'CartView',
  computed: {
    cart(): Product[] {
      // Получение данных из хранилища (cookie) через Vuex
      const store = useStore()
      return store.state.cart
    }
  },
  methods: {
    ...mapActions(['removeFromCart'])
  }
})
</script>

<template>
  <div>
    <h2>Корзина</h2>
    <ul>
      <li v-for="product in cart" :key="product.id">
        <!-- Отображение информации о товаре -->
        <span>{{ product.name }}</span> |
        <span>{{ product.price }}</span> |
        <span>{{ product.quantity }} шт.</span> |

        <!-- Кнопка для удаления товара -->
        <button @click="removeFromCart(product.id)">Удалить</button>
      </li>
    </ul>
  </div>
</template>
