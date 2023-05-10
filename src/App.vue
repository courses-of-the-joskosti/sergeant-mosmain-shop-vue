<script lang="ts">
import { mapState } from 'vuex'

export default {
  name: 'App',
  data() {
    return {
      items: [
        {
          icon: 'mdi-home',
          text: 'Home',
          link: '/'
        },
        {
          icon: 'mdi-dots-grid',
          text: 'catalog',
          link: '/catalog'
        }
      ]
    }
  },
  computed: {
    ...mapState(['cart']),
    cartItemsCount(): number {
      return this.cart.length
    }
  }
}
</script>

<template>
  <v-app>
    <v-app-bar>
      <v-app-bar-title>Name</v-app-bar-title>
      <template v-slot:append>
        <v-btn
          v-for="(item, i) in items"
          :key="i"
          class="mx-2 h-100"
          rounded="0"
          size="large"
          :to="item.link"
        >
          <v-icon start :icon="item.icon"></v-icon>
          {{ item.text }}
        </v-btn>
        <v-btn class="mx-2 h-100" rounded="0" size="large" to="/cart">
          <v-badge v-if="cartItemsCount !== 0" :content="cartItemsCount" color="error" class="mr-3">
            <v-icon start icon="mdi-cart"></v-icon>
          </v-badge>
          <v-icon v-else start icon="mdi-cart"></v-icon>
          cart
        </v-btn>
      </template>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>
