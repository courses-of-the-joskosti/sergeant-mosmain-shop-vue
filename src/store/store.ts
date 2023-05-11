import { createStore } from 'vuex'
import type { Product } from '@/axios/types'
import Cookies from 'js-cookie'

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
        state.cart[index].total_price =
          state.cart[index].quantity * state.cart[index].price
      } else {
        const item = { ...product, quantity: 1, total_price: product.price }
        state.cart.push(item)
      }
      // Сохраняем состояние в cookies после каждого изменения
      Cookies.set('cart', JSON.stringify(state.cart))
    },
    setCartFromCookies(state) {
      // Чтение состояния из cookies при инициализации хранилища
      const cart = Cookies.get('cart')
      if (cart) {
        state.cart = JSON.parse(cart)
      }
    }
  },
  actions: {
    addToCart({ commit }, product: Product) {
      commit('addToCart', product)
    }
  },
  // Вызовите мутацию setCartFromCookies после инициализации хранилища
  // чтобы восстановить состояние из cookies
  plugins: [(store) => store.commit('setCartFromCookies')]
})
