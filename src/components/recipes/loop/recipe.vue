<template>
  <div class="recipe">
    <h2>{{recipe.name}}</h2>
  </div>
</template>

<script>
export default {
  name: 'recipe',
  props: {
    recipe: {}
  }
}
</script>

<style scoped>

</style>
