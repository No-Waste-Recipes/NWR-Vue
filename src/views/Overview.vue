<template>
  <recipes></recipes>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Recipes from '../components/recipes/recipes.vue'

@Component({
  components: {
    Recipes
  }
})
export default class Overview extends Vue {}
</script>

<style scoped>

</style>
