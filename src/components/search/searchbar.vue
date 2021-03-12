<template>
  <div class="searchbar">
    <div class="searchbar-styles">
      <md-field class="search-input" >
        <label>Search</label>
        <md-input v-model="ingredientName" @change="getIngredients"></md-input>
        <md-icon class="icon">search</md-icon>
      </md-field>
    </div>
    <div class="search-results md-elevation-5" v-if="ingredients.length || selectedIngredients.length">
      <div class="search-results-ingredients-selected-tab result-tab">
        <h4>Currently selected ingredients:</h4>
        <div class="search-results-ingredients-selected" v-for="(selectedIngredient, index) in selectedIngredients" :key="selectedIngredient.id">
          <div class="search-result-selected-ingredient item" >{{selectedIngredient.name}}
            <md-field class="quantity-ingredient" id="quantity" md-inline>
              <label class="quantity-ingredient-label">Number</label>
              <md-input class="quantity-ingredient-input" v-model="inline"></md-input>
            </md-field>
                <md-field class="volume-ingredient" id="volume">
                  <md-select v-model="volume" id="volume-label" placeholder="Hoeveelheid">
                    <md-option value="gram">gram</md-option>
                    <md-option value="milliliter">milliliter</md-option>
                    <md-option value="stuks">stuks</md-option>
                  </md-select>
                </md-field>
            <div class="remove-selected" v-on:click="removeSelectedIngredient(index)">
              <md-icon class="icon">clear</md-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="search-results-ingredients-search-tab result-tab">
        <h4>Ingredients:</h4>
        <div class="search-results-ingredients-search" v-for="(ingredient, index) in ingredients" :key="ingredient.id">
            <div class="search-result-ingredient-search item" v-on:click="setSelectedIngredient(index)">{{ingredient.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchService from '@/services/SearchService'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

export default {
  name: 'searchbar',
  data () {
    return {
      ingredientName: '',
      ingredients: [],
      selectedIngredients: [],
      event: {},
      volume: ''
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
  .icon
    background-color: transparent !important

  .searchbar
    position: relative
    width: 600px
    margin: 0 auto
    z-index: 9999

    .searchbar-style
      display: -ms-flexbox
      display: flex
      margin-bottom: 15px

    .search-input
      border: none
      font-size: 20px
      width: 100%

    .search-results
      position: absolute
      width: 100%
      top: 40px
      border-radius: 10px
      text-align: left
      padding: 10px 0
      font-size: 14px
      margin-top: 15px
      background-color: white

      .result-tab
        border-bottom: 1px solid #000
        padding-bottom: 5px
        padding-top: 2px

        &:last-of-type
          border-bottom: 0

        h4
          margin: 0
          text-indent: 5px

        .item
          background-color: #E9E9E9
          padding: 5px 10px 5px 10px
          margin: 5px

        .search-results-ingredients-selected
          display: inline-block
          position: relative

          .search-result-selected-ingredient
            display: inline-block
            background-color: rgba(117, 189, 132, 0.16)

            .quantity-ingredient
              border: none
              margin: 0px 5px 0px 3px
              display: inline-block
              position: relative
              padding-top: 0px
              width: 75px
              min-height: 20px
              text-align: center

              .quantity-ingredient-label
                font-size: 14px
                bottom: 10px
                top: 5px

              .quantity-ingredient-input
                -moz-appearance: textfield

              .quantity-ingredient-input::-webkit-inner-spin-button
                -webkit-appearance: none

            .volume-ingredient
              border: none
              position: relative
              display: inline-block
              width: 40%
              padding-top: 0px
              margin: 0px 5px 0px 0px
              min-height: 20px

            .remove-selected
              display: inline-block

</style>
