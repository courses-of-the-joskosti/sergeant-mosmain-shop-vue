import type { Store } from 'vuex'
import { createStore } from 'vuex'
import type { RootState } from './types'

export default createStore<RootState>({
  state: {
    // определите состояния магазина здесь
  },
  mutations: {
    // определите мутации магазина здесь
  },
  actions: {
    // определите действия магазина здесь
  },
  modules: {
    // определите подмодули здесь
  }
})