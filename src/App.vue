<script lang="ts">
export default {
  data() {
    return {
      count: 1
    }
  },

  mounted() {
    console.log(this.count)
    this.count = 2
  }
}
</script>

<template>
  <div>
    <nav>
      <router-link to="/">Home</router-link> | 
      <router-link to="/catalog">Catalog</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>
