import { createStore } from 'vuex'
import type { Product } from '@/axios/types'
const storage = window.localStorage;

interface State {
  cart: Product[]
}

export default createStore<State>({
  state: {
    cart: []
  },
  mutations: {
    addToCart(state, product: Product) {
      const index = state.cart.findIndex((p) => p.id === product.id)
      if (index !== -1) {
        state.cart[index].quantity += 1
        state.cart[index].total_price = state.cart[index].quantity * state.cart[index].price
      } else {
        const item = { ...product, quantity: 1, total_price: product.price }
        state.cart.push(item)
      }
      // Сохраняем состояние после каждого изменения
      storage.setItem('cart', JSON.stringify(state.cart));
    },
    setCartFromStorage(state) {
      // Чтение состояния из localStorage при инициализации хранилища
      const cart = storage.getItem('cart');
      if (cart) {
        state.cart = JSON.parse(cart);
      }
    },

    removeFromCart(state, productId: number) {
      const index = state.cart.findIndex((p) => p.id === productId)
      if (index !== -1) {
        state.cart.splice(index, 1)
      }
      // Обновляем состояние в localStorage после удаления товара
      storage.setItem('cart', JSON.stringify(state.cart));
    }
  },
  actions: {
    addToCart({ commit }, product: Product) {
      commit('addToCart', product);
    },
    removeFromCart({ commit }, productId: Number) {
      commit('removeFromCart', productId);
    }
  },
  // Вызовите мутацию setCartFromCookies после инициализации хранилища
  // чтобы восстановить состояние из cookies
  plugins: [(store) => store.commit('setCartFromStorage')]
})
