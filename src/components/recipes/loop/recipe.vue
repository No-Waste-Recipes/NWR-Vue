<template>
  <div class="recipe md-elevation-3">
    <h2>{{recipe.title}}</h2>
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

<style scoped lang="sass">
  .recipe
    background-color: #FFF
    padding: 10px 5px
    text-align: left
</style>
