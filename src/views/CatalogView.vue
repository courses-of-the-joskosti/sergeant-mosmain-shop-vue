<script lang="ts">
import { defineComponent } from 'vue'
import axios from '@/axios/axiosInstance'
import { getCategories } from '@/axios/routes'
import type { Category } from '@/axios/types'

export default defineComponent({
  data() {
    return {
      categories: [] as Category[],
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
        .get(getCategories())
        .then((response) => {
          this.categories = response.data
          console.log(this.categories);
          this.isLoading = false
        })
        .catch((error) => {
          console.error(error)
          this.isLoading = false
          this.error = true
          console.log(this.error);
        })
    }
  }
})
</script>

<template>
  <template v-if="isLoading">
    <v-progress-circular indeterminate size="64" />
  </template>
  <template v-else-if="error">
    <p>An error occurred while loading the product.</p>
  </template>
  <template v-else>
    <v-container fluid>
      <h1>Categories</h1>
      <v-row>
        <div v-for="category in categories" :key="category.id">
          <ul>
            <li>{{ category.id }}</li>
            <li>{{ category.name }}</li>
            <li>{{ category.base_name }}</li>
            <li>{{ category.image_url }}</li>
          </ul>
        </div>
      </v-row>
    </v-container>
  </template>
</template>
