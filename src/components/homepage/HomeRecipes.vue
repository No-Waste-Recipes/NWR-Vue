<template>
  <div>
    <div class='container'>
      <div>
        <div class='md-headline'>Favorited by you</div>
        <div class='block-layout'>
          <Recipe class='recipe-box' v-for='recipe in recipes' :key='recipe.id' :recipe='recipe'/>
        </div>
      </div>
    </div>

    <div class='container'>
      <div>
        <div class='md-headline'>PogChamp Recipes</div>
        <div class='block-layout'>
          <Recipe class='recipe-box' v-for='recipe in recipes' :key='recipe.id' :recipe='recipe'/>
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

  .block-layout
    display: flex
    flex-direction: row

    .recipe-box
      width: 250px
      height: 200px
      overflow: hidden
      margin-right: 15px
</style>
