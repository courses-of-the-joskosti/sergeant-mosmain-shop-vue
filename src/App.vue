<script lang="ts">
export default ({
  data() {}
});
</script>

<template>
  <div theme="dark">
    <nav>
      <router-link to="/">Home</router-link> | 
      <router-link to="/catalog">Catalog</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>
