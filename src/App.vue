<template>
  <div id="app">
    <HeaderComponent/>
    <CreateRecipeComponent/>
    <router-view/>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script lang="ts">
import FooterComponent from '@/components/Footer.vue'
import HeaderComponent from '@/components/Header.vue' // @ is an alias to /src
import CreateRecipeComponent from '@/components/CreateRecipe.vue'

export default {
  components: {
    HeaderComponent,
    FooterComponent,
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
