<template>
  <div class="recipe-overview">
    <div class="md-layout md-gutter">
      <div class="md-layout-item md-size-30">
        <div class="filters md-elevation-3">

        </div>
      </div>
      <div class="md-layout-item">
        <div class="recipes">
          <recipe v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"></recipe>
        </div>
      </div>
    </div>
  </div>
</template>

<script >
import Recipe from '@/components/recipes/loop/recipe'
import RecipeService from '@/services/RecipeService'
export default {
  name: 'recipes',
  components: { Recipe },
  data () {
    return {
      recipes: []
    }
  },
  created () {
    this.getRecipes()
  },
  methods: {
    async getRecipes () {
      RecipeService.getIngredients(this.$route.query.ingredients)
        .then(
          event => {
            this.$set(this, 'recipes', event.recipes)
          }
        )
    }
  }
}
</script>

<style scoped lang="sass">
  .recipe-overview
    width: 1080px
    margin: 0 auto

    .recipes
      background-color: rgba(233,233,233, 0.30)
      padding: 20px 10px

    .filters
      height: 500px
</style>
