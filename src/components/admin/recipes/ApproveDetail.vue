<template>
  <div class="approve-detail">
    <div class="recipe-title">
      <h1>Title: {{ recipe.title }}</h1>
    </div>
    <div class="recipe-owner">
      <div v-if="recipe.user" class="username">Username: {{recipe.user.username}}</div>
    </div>
    <div class="recipe-description">
      <p>Description:</p>
      <p v-html="recipe.description"></p>
    </div>
    <div class="recipe-ingredients">
      <h3>Ingredients</h3>
      <ul v-for="ingredients in recipe.ingedients" :key="ingredients.id">
        <li>{{ingredients.title}}</li>
      </ul>
    </div>
    <div class="approve">
      <button v-on:click="approveRecipe">Approve</button>
    </div>
    <div class="deny">
      <button v-on:click="denyRecipe">Deny</button>
    </div>
  </div>
</template>

<script>

import { Component, Vue } from 'vue-property-decorator'
import RecipeService from '@/services/RecipeService'
import AdminRecipeService from '@/services/admin/AdminRecipeService'

@Component
export default class ApproveDetail extends Vue {
  data () {
    return {
      recipe: Object
    }
  }

  created () {
    this.getRecipe()
  }

  approveRecipe () {
    this.updateRecipe('APPROVED')
  }

  denyRecipe () {
    this.updateRecipe('DENIED')
  }

  updateRecipe (status) {
    AdminRecipeService.approveRecipe(this.recipe.slug, status, this.$store.state.token)
      .then(() => {
        this.$router.push('/admin/recipe/approve')
      })
  }

  getRecipe () {
    RecipeService.getRecipe(this.$route.params.slug)
      .then(
        event => {
          this.$set(this, 'recipe', event.result)
        }
      )
  }
}
</script>

<style scoped>

</style>
