import { createStore } from 'vuex'
import type { Product } from '@/axios/types'

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
    }
  },
  actions: {
    addToCart({ commit }, product: Product) {
      commit('addToCart', product)
    }
  }
})
