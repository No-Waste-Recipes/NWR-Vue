<template>
  <div>
    <div class='container'>
      <div>
        <div class='md-headline'>Favorited by you</div>
        <div class='block-layout'>

          <div class='recipe-box' v-for="recipe in recipes" :key="recipe.id">
            <div class='md-title'>
              {{recipe.name}}
            </div>
            <div class='picture'>
              foto
            </div>
          </div>

        </div>
      </div>
    </div>

    <div class='container'>
      <div>
        <div class='md-headline'>PogChamp Recipes</div>
        <div class='block-layout'>

          <div class='recipe-box' v-for="recipe in recipes" :key="recipe.id">
            <div class='md-title'>
              {{recipe.name}}
            </div>
            <div class='picture'>
              foto
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import PopularRecipesService from '@/services/PopularRecipesService'

export default {
  name: 'HomeRecipes',
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
      PopularRecipesService.getPopularRecipes()
        .then(
          event => {
            this.$set(this, 'recipes', event.recipes)
          }
        )
    }
  }
}
</script>

<style lang='sass' scoped>
  .container
    background-color: #F6F4F5
    width: 70%
    padding: 15px
    margin: auto auto 20px

    .recipe-box
      width: 250px
      height: 200px
      overflow: hidden
      margin-right: 15px

    .picture
      background-color: blue
      height: 100%

    .block-layout
      display: flex
      flex-direction: row
</style>
