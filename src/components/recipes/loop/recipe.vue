<template>
  <RouterLink :to="{ name: 'RecipeDetail', params: { slug: recipe.slug }}">
    <div class="recipe md-elevation-3">
      <h2>{{recipe.title}}</h2>
      <div class="ingredients">
        <div class="ingredient" v-bind:class="{ 'active': inIngredients(ingredient.ingredient.name) }" v-for="ingredient in recipe.ingredients" :key='ingredient.id'>
          {{ingredient.ingredient.name}}
        </div>
      </div>

      <div v-if='hasImage' class="image" :style="{ backgroundImage: `url(http://localhost:3000/${recipe.photo})` }"/>

    </div>
  </RouterLink>
</template>

<script>
export default {
  name: 'recipe',
  props: {
    recipe: {},
    selectedIngredients: {},
    hasImage: Boolean
  },
  methods: {
    inIngredients (name) {
      let i = 0
      for (i = 0; i < this.selectedIngredients.length; i++) {
        if (this.selectedIngredients[i].name === name) { return true }
      }
      return false
    }
  }
}
</script>

<style scoped lang="sass">
.recipe
  background-color: #FFF
  padding: 10px 8px
  text-align: left
  height: 100%
  margin-bottom: 20px

  h2
    margin: 0 0 8px 0

  .image
    height: 150px
    background-position: center
    border-radius: 10px
    background-size: cover

  .ingredient
    display: inline-block
    margin-right: 10px
    border: 1px solid #000
    padding: 7px
    border-radius: 7px

    &.active
      background-color: #75BD84
      color: #fff
</style>
