<template>
  <RouterLink :to="{ name: 'RecipeDetail', params: { slug: recipe.slug }}">
    <div class="recipe md-elevation-3">
      <h2>{{ recipe.title }}</h2>
      <h3 id="statusrecipe">{{ getStatus }}</h3>
    </div>
  </RouterLink>
</template>

<script>
export default {
  name: 'Myrecipe',
  props: {
    recipe: {},
    status: String
  },
  computed: {
    getStatus () {
      const firstLetter = this.recipe.status.charAt(0).toUpperCase()
      return firstLetter + this.recipe.status.replaceAll('_', ' ').toLowerCase().slice(1)
    }
  }
}
</script>

<style scoped lang="sass">
.recipe
  background-color: #FFF
  padding: 5px
  text-align: left
</style>
