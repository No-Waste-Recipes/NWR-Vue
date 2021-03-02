<template>
  <div class="recipes">
    <recipe v-for="recipe in recipes" :key="recipe.id" :recipe="recipe"></recipe>
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
      RecipeService.getIngredients([1, 2])
        .then(
          event => {
            this.$set(this, 'recipes', event.recipes)
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
