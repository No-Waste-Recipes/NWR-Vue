<template>
  <div class="recipe">
    <div class="block top">
      <div class="title">
        <h1>{{recipe.title}}</h1>
      </div>
      <div class="author">
        <p v-if="recipe.user">Gemaakt door: <span class="author-name">{{ recipe.user.username }}</span></p>
      </div>
    </div>
    <div class="block image" style="background-image: url('https://www.leukerecepten.nl/wp-content/uploads/2020/10/basis-recept-wafels.jpg')">
    </div>
    <div class="block middle">
      <div class="md-layout md-gutter">
        <div class="md-layout-item description">
          <h2>Description</h2>
          <p>{{recipe.description}}</p>
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
        <div v-for="comment in recipe.comments" :key="comment.id" class="comment">
          <div class="user">
            {{comment.user.username}}
          </div>
          <div class="content">
            {{comment.text}}
          </div>
        </div>
      </div>
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

export default {
  name: 'detail',
  data () {
    return {
      recipe: Object,
      commentText: '',
      loggedIn: this.$store.getters.isLoggedIn,
      commentError: false
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
                username: event.comment.user.username
              },
              userId: event.comment.userId
            })
          }
        )
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

      .comments
        .comment
          padding: 20px
          border: 3px solid #F6F4F5
          margin: 0px -30px 20px -30px

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

      &.middle

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
