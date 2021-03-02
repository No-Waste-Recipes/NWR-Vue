<template>
  <div id="app">
    <HeaderComponent/>
    <CreateRecipeComponent/>
    <router-view/>
  </div>
</template>

<script lang="ts">
import HeaderComponent from '@/components/Header.vue' // @ is an alias to /src
import CreateRecipeComponent from '@/components/CreateRecipe.vue'

export default {
  components: {
    HeaderComponent,
    CreateRecipeComponent
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

</style>
