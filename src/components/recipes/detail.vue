<template>
  <div class="recipe">
    <div class="block top">
      <div class="delete-recipe" v-if="canDeleteRecipe()" v-on:click="clickDeleteRecipe = true">
        Verwijderen
      </div>
      <div class="report-recipe" v-if="loggedIn" v-on:click="reportRecipe">
        Report
      </div>
      <div class="edit-recipe" v-if="canDeleteRecipe()">
        <RouterLink :to="{ name: 'EditRecipeView', params: { slug: recipe.slug }}">Edit</RouterLink>
      </div>

      <md-dialog-confirm
        :md-active.sync="clickDeleteRecipe"
        md-title="Delete your recipe?"
        md-content="Are you sure that you want to delete your recipe?"
        md-confirm-text="Yes"
        md-cancel-text="No"
        @md-confirm="deleteRecipe" />
      <div class="title">
        <h1>{{recipe.title}}</h1>
      </div>
      <div class="author">
        <p v-if="recipe.user">Gemaakt door: <span class="author-name">{{ recipe.user.username }}</span></p>
      </div>
    </div>
    <div class="block image" :style="{ backgroundImage: `url(http://localhost:3000/${recipe.photo})` }">
    </div>
    <div class="block">
      <md-button
        v-if='loggedIn'
        class='like-button-unliked'
        v-bind:class="{ 'like-button-liked': likedStatus }"
        v-on:click="addFavoriteRecipes()"
      >Like</md-button>
      <div class="md-layout md-gutter">
        <div class="md-layout-item description">
          <h2>Description</h2>
          <p v-html="recipe.description"></p>
        </div>
        <div class="md-layout-item md-size-30">
          <div class="ingredients-block md-elevation-3">
            <h3>Ingredienten</h3>
            <ul v-for="ingredient in recipe.ingredients" :key="ingredient.id" class="ingredients">
              <li class="ingredient">{{ingredient.ingredient.name}}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="block bottom">
      <div class="comments">
        <h3>Comments</h3>
        <div v-for="(comment, index) in recipe.comments" :key="comment.id" class="comment">
          <div class="delete-comment" v-if="canShowDelete(comment)" v-on:click="deleteComment(comment, index)">
            Verwijderen
          </div>
          <div class="report-recipe" v-if="loggedIn" v-on:click="reportComment(comment)">
            Report
          </div>
          <div class="user">
            {{comment.user.username}}
          </div>
          <div class="content">
            {{comment.text}}
          </div>
        </div>
      </div>
      <md-dialog-alert
        :md-active.sync="reportRecipeStatus"
        md-content="Het recept is gereport"
        md-confirm-text="Oke" />
      <md-dialog-alert
        :md-active.sync="reportCommentStatus"
        md-content="De comment is gereport"
        md-confirm-text="Oke" />
      <div v-if="loggedIn" class="place-comment">
        <md-field :class="{'md-invalid': this.commentError}">
          <label>Plaats comment</label>
          <md-textarea v-model="commentText"></md-textarea>
          <span class="md-helper-text">Vul de hier tekst in</span>
          <span class="md-error">Er is een fout</span>
        </md-field>
        <button v-on:click="placeComment">Submit</button>
      </div>
    </div>
  </div>
</template>

<script>
import RecipeService from '@/services/RecipeService'
import PopularRecipesService from '@/services/PopularRecipesService'

export default {
  name: 'detail',
  data () {
    return {
      recipe: Object,
      commentText: '',
      loggedIn: this.$store.getters.isLoggedIn,
      commentError: false,
      likedStatus: null,
      clickDeleteRecipe: false,
      reportRecipeStatus: false,
      reportCommentStatus: false
    }
  },
  created () {
    this.getRecipe()
  },
  methods: {
    canDeleteRecipe () {
      return `${this.recipe.user.id}` === `${this.$store.state.userId}` || this.$store.state.userRole === 'ADMIN'
    },
    async deleteRecipe () {
      RecipeService.deleteRecipe(this.recipe.id, this.$store.state.token)
        .then(
          () => {
            this.$router.push('/')
          }
        )
    },
    async deleteComment (comment, index) {
      RecipeService.deleteComment(this.$route.params.slug, comment.id, this.$store.state.token)
        .then(
          () => {
            this.$delete(this.recipe.comments, index)
          }
        )
    },
    async reportRecipe () {
      RecipeService.reportRecipe(this.$route.params.slug, true, this.$store.state.token)
        .then(
          () => {
            this.reportCommentStatus = true
          }
        )
    },
    async reportComment (comment) {
      RecipeService.reportComment(this.$route.params.slug, true, comment.id, this.$store.state.token)
        .then(
          () => {
            this.reportCommentStatus = true
          }
        )
    },
    canShowDelete (comment) {
      return `${comment.user.id}` === `${this.$store.state.userId}` || this.$store.state.userRole === 'ADMIN'
    },
    async getRecipe () {
      await RecipeService.getRecipe(this.$route.params.slug)
        .then(
          event => {
            this.$set(this, 'recipe', event.result)
            this.checkFavoriteRecipes()
          }
        )
    },
    async placeComment () {
      if (!this.commentText) {
        this.commentError = true
        return
      }
      this.commentError = false
      const data = {
        text: this.commentText
      }
      RecipeService.placeComment(this.$route.params.slug, data, this.$store.state.token)
        .then(
          event => {
            this.commentText = ''
            this.recipe.comments.push({
              id: event.comment.id,
              recipeId: event.comment.recipeId,
              text: event.comment.text,
              user: {
                id: this.$store.state.userId,
                username: event.comment.user.username
              },
              userId: event.comment.userId
            })
          }
        )
    },

    async addFavoriteRecipes () {
      await PopularRecipesService.addFavoriteRecipe(this.$store.state.token, this.recipe.id)
      await this.checkFavoriteRecipes()
    },

    async checkFavoriteRecipes () {
      if (this.loggedIn) {
        const favorite = await PopularRecipesService.getFavoriteRecipe(this.$store.state.token, this.recipe.id)
        this.likedStatus = !(favorite.recipes.length === 0)
      }
    }
  }
}
</script>

<style scoped lang="sass">
  .recipe
    text-align: left

    .block
      background-color: #FFF
      padding: 40px

      .delete-recipe
        color: red
        cursor: pointer

      .comments
        .comment
          padding: 20px
          border: 3px solid #F6F4F5
          margin: 0px -30px 20px -30px

          .delete-comment
            text-align: right
            color: red
            cursor: pointer

            &:hover
              text-decoration: underline

          .user
            font-weight: bold
            font-size: 20px
            border-bottom: 3px solid #75BD84
            display: inline-block
            line-height: 1.3

          .content
            margin-top: 10px

      &.image
        height: 400px
        background-position: center
        border-radius: 25px
        margin: -40px -20px 20px -20px
        background-size: cover

      &.top
        border-radius: 0 0 25px 25px
        margin: 0 0 20px 0
        padding-top: 10px

      .like-button-unliked
        border: 1px solid black
        border-radius: 4px

      .like-button-liked
        border: 1px solid #75BD84
        background-color: #75BD84

      .ingredients-block
        padding: 5px 20px
        background-color: #F6F4F5
        border-radius: 20px

        h3
          border-bottom: 3px solid #75BD84
          line-height: 2

        .ingredients
          list-style-type: none
          padding: 0

    .title
      h1
        font-size: 40px
        border-bottom: 3px solid #75BD84
        line-height: 2

    .author
      .author-name
        font-weight: bold

</style>
