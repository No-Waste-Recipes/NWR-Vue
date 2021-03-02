<template>
  <div class="searchbar">
    <div class="searchbar-style md-elevation-3">
    <input type="text" class="search-input" placeholder="Search" v-model="ingredientName"  @change="getIngredients">
      <md-icon>visibility</md-icon>
    </div>
    <div class="search-results" v-if="ingredients.length || selectedIngredients.length">
      <div class="search-results-ingredients-selected-tab result-tab">
        <h3>Currently selected ingredients:</h3>
        <div class="search-results-ingredients-selected" v-for="(selectedIngredient, index) in selectedIngredients" :key="selectedIngredient.id">
          <div class="search-result-selected-ingredient item" >{{selectedIngredient.name}}
            <input type="number" id="quantity" class="quantity-ingredient" value="0">
            <select id="volume-ingredient" name="volume">
              <option id="grams" value="gram">gram</option>
              <option value="milliliters">milliliters</option>
            </select>
            <div v-on:click="removeSelectedIngredient(index)">
              <md-icon>clear</md-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="search-results-ingredients-search-tab result-tab">
        <h3>Ingredients:</h3>
        <div class="search-results-ingredients-search" v-for="(ingredient, index) in ingredients" :key="ingredient.id">
            <div class="search-result-ingredient-search item" v-on:click="setSelectedIngredient(index)">{{ingredient.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchService from '@/services/SearchService'

export default {
  name: 'searchbar',
  data () {
    return {
      ingredientName: '',
      ingredients: [],
      selectedIngredients: [],
      event: {}
    }
  },
  created () {
    this.getIngredients()
  },
  methods: {
    removeSelectedIngredient (index) {
      this.ingredients.push(this.selectedIngredients[index])
      this.$delete(this.selectedIngredients, index)
    },
    setSelectedIngredient (index) {
      this.selectedIngredients.push(this.ingredients[index])
      this.$delete(this.ingredients, index)
    },
    async getIngredients () {
      if (this.ingredientName.length > 0) {
        const excludedIngredients = []
        let i = 0
        for (i = 0; i < this.selectedIngredients.length; i++) {
          excludedIngredients.push(this.selectedIngredients[i].id)
        }
        SearchService.getIngredients(this.ingredientName, excludedIngredients)
          .then(
            event => {
              this.$set(this, 'ingredients', event.ingredients)
            }
          )
      }
    }
  }
}
</script>

<style scoped lang="sass">
  .quantity-ingredient
    -webkit-appearance: none
    -moz-appearance: textfield
    border: none
    width: 75px
    margin: 0px 5px 0px 3px
    background: #E9E9E9

  .volume-ingredient
    background: #E9E9E9
    border: none
    width: 100px

  .searchbar
    position: relative
    width: 600px
    margin: 0 auto

    .searchbar-style
      display: -ms-flexbox
      display: flex
      margin-bottom: 15px
      background-color: #E9E9E9

    .search-input
      border: none
      background-color: #E9E9E9
      font-size: 20px
      padding: 5px 10px
      width: 100%

    .search-results
      position: absolute
      width: 100%
      top: 40px
      border-radius: 10px
      text-align: left
      padding: 10px 0
      box-shadow: 0 0 4px #000
      font-size: 17px

      .result-tab
        border-bottom: 1px solid #000
        padding-bottom: 5px
        padding-top: 2px

        &:last-of-type
          border-bottom: 0

        h3
          margin: 0

        .item
          background-color: rgba(83,83,83, 0.16)
          padding: 5px 10px 5px 10px
          margin: 5px

        .search-results-ingredients-selected
          display: inline-block

          .search-result-selected-ingredient
            display: inline-block
            background-color: rgba(117, 189, 132, 0.16)

</style>
