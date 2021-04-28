<template>
  <div>
    <div v-if='loggedIn && favoriteRecipes.length !== 0' class='container'>
      <div>
        <div class='md-headline'>Favorited by you</div>
        <div class='block-layout'>
          <Recipe class='recipe-box' v-for='recipe in favoriteRecipes' :key='recipe.id' :recipe='recipe.recipe'/>
        </div>
      </div>
    </div>

    <div class='container'>
      <div>
        <div class='md-headline title'>Popular Recipes</div>
        <div class='block-layout'>
          <Recipe class='recipe-box' v-for='recipe in popularRecipes' :key='recipe.id' :recipe='recipe'/>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import PopularRecipesService from '@/services/PopularRecipesService'
import Recipe from '@/components/recipes/loop/recipe'

export default {
  name: 'HomeRecipes',
  components: { Recipe },
  data () {
    return {
      popularRecipes: [],
      favoriteRecipes: [],
      loggedIn: this.$store.getters.isLoggedIn
    }
  },
  created () {
    this.getPopularRecipes()
    this.getFavoriteRecipes()
  },
  methods: {
    async getPopularRecipes () {
      PopularRecipesService.getPopularRecipes()
        .then(
          event => {
            this.$set(this, 'popularRecipes', event.recipes)
          }
        )
    },

    async getFavoriteRecipes () {
      if (!this.loggedIn) return

      PopularRecipesService.getFavoriteRecipes(this.$store.state.token)
        .then(
          event => {
            this.$set(this, 'favoriteRecipes', event.recipes)
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

  .title
    margin-bottom: 15px

  .block-layout
    display: flex
    flex-direction: row

    .recipe-box
      width: 250px
      height: 200px
      overflow: hidden
      margin-right: 15px
</style>
