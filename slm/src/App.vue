<template>
  <div id="app" style="min-height: 100vh;">
      <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
}
</script>

<style lang="scss">
  #app {
    font-family: "Roboto Slab", Geneva, Tahoma, sans-serif;
    font-size: 1.6rem;
    color: #222;
    background-color: #f0eddf;
    height: 100%;
    width: 100%;
  }
</style>