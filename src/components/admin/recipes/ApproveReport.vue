<template>
  <div class="reports">
      <h2>Recipes</h2>
      <div v-for="(recipe, index) in this.reportedRecipesList" :key="recipe.id">
          <div class="recipe">
            <RouterLink :to="{ name: 'RecipeDetail', params: { slug: recipe.slug }}">
              {{ recipe.title }}
            </RouterLink>
            <a v-on:click="approveRecipe(recipe.slug, index)">Approve</a>
            <a v-on:click="deleteRecipe(recipe.slug, index)" class="delete">Delete</a>
          </div>
      </div>
      <h2>Comments</h2>
      <div v-for="(comment, index) in this.reportedCommentsList" :key="comment.id">
        <div class="comment">
          <RouterLink :to="{ name: 'RecipeDetail', params: { slug: comment.recipe.slug }}">
            {{comment.text}}
          </RouterLink>
          <a v-on:click="approveComment(comment.recipe.slug, comment, index)">Approve</a>
          <a v-on:click="deleteComment(comment.recipe.slug, comment, index)" class="delete">Delete</a>
        </div>
      </div>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import AdminRecipeService from '@/services/admin/AdminRecipeService'
import RecipeService from '@/services/RecipeService'

@Component
export default class ApproveReport extends Vue {
  data () {
    return {
      reportedRecipesList: [],
      reportedCommentsList: []
    }
  }

  created () {
    this.reportedRecipes()
    this.reportedComments()
  }

  reportedRecipes () {
    AdminRecipeService.getReportedRecipes(this.$store.state.token)
      .then(
        event => {
          this.$set(this, 'reportedRecipesList', event.result)
        }
      )
  }

  reportedComments () {
    AdminRecipeService.getReportedComments(this.$store.state.token)
      .then(
        event => {
          this.$set(this, 'reportedCommentsList', event.result)
        }
      )
  }

  async approveRecipe (slug, index) {
    RecipeService.reportRecipe(slug, false, this.$store.state.token)
      .then(
        () => {
          this.$delete(this.reportedRecipesList, index)
        }
      )
  }

  async approveComment (slug, comment, index) {
    RecipeService.reportComment(slug, false, comment.id, this.$store.state.token)
      .then(
        () => {
          this.$delete(this.reportedCommentsList, index)
        }
      )
  }

  async deleteRecipe (recipeId, index) {
    RecipeService.deleteRecipe(recipeId, this.$store.state.token)
      .then(
        () => {
          this.$delete(this.reportedRecipesList, index)
        }
      )
  }

  async deleteComment (recipeSlug, comment, index) {
    RecipeService.deleteComment(recipeSlug, comment.id, this.$store.state.token)
      .then(
        () => {
          this.$delete(this.reportedCommentsList, index)
        }
      )
  }
}
</script>

<style scoped>
  a:hover {
    cursor: pointer;
  }

  a {
    display: block;
  }

  div a.delete {
    color: red;
  }

  .recipe, .comment {
    border: 1px solid #000;
  }
</style>
