<template>
  <div class="recipe">
    <h1>{{recipe.title}}</h1>
    <p>{{recipe.description}}</p>
    <p>Ingredients</p>
    <div v-for="ingredient in recipe.ingredient" :key="ingredient.id">
      <p>{{ingredient.ingredients.name}}</p>
    </div>
    <p>Gemaakt door:</p>
    <p v-if="recipe.user">{{ recipe.user.username }}</p>
  </div>
</template>

<script>
import RecipeService from '@/services/RecipeService'

export default {
  name: 'detail',
  data () {
    return {
      recipe: Object
    }
  },
  created () {
    this.getRecipe()
  },
  methods: {
    async getRecipe () {
      RecipeService.getRecipe(this.$route.params.slug)
        .then(
          event => {
            console.log(event)
            this.$set(this, 'recipe', event.result)
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
