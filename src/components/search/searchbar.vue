<template>
  <div class="searchComponent">
    <div class="searchbar" v-click-outside="searchBar">
      <div class="searchbar-content">
        <md-field class="search-input">
          <label>Search</label>
          <md-input v-model="ingredientName" v-on:click="searchOpen = true" v-on:keydown="getIngredients"></md-input>
          <div v-on:click="goToOverview">
            <md-icon class="icon">search</md-icon>
          </div>
        </md-field>
      </div>
      <div class="search-results md-elevation-5" v-if="searchOpen">
        <div class="search-results-ingredients-selected-tab result-tab" v-if="homepage">
          <h4>Currently selected ingredients:</h4>
          <div class="search-results-ingredients-selected" v-for="(selectedIngredient, index) in selectedIngredients"
               :key="selectedIngredient.id">
            <div class="search-result-selected-ingredient item">{{ selectedIngredient.name }}
              <md-field class="quantity-ingredient" id="quantity" md-inline>
                <label class="label">Number</label>
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
            <div class="search-result-ingredient-search item" v-on:click="setSelectedIngredient(index)">
              {{ ingredient.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!homepage" class="ingredients-underneath">
      <h4>Currently selected ingredients:</h4>
      <div class="selected-ingredients">
        <div class="selected-ingredient item" v-for="(selectedIngredient, index) in selectedIngredients"
             :key="selectedIngredient.id">{{ selectedIngredient.name }}
          <md-field class="quantity-ingredient quantity" md-inline>
            <label class="label">Number</label>
            <md-input class="quantity-ingredient-input"></md-input>
          </md-field>
          <md-field class="volume-ingredient volume">
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
  </div>
</template>

<script>
import SearchService from '@/services/SearchService'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import vClickOutside from 'v-click-outside'
import Vue from 'vue'
Vue.use(vClickOutside)

export default {
  name: 'searchbar',
  props: {
    selectedIngredients: [],
    homepage: Boolean,
    updating: Boolean
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data () {
    return {
      ingredientName: '',
      ingredients: [],
      event: {},
      volume: '',
      searchOpen: Boolean
    }
  },
  created () {
    this.searchOpen = false
    this.getIngredients()
  },
  methods: {
    searchBar () {
      this.searchOpen = false
    },
    removeSelectedIngredient (index) {
      this.ingredients.push(this.selectedIngredients[index])
      this.$delete(this.selectedIngredients, index)
      if (!this.updating) {
        this.goToOverview()
      }
    },
    setSelectedIngredient (index) {
      this.selectedIngredients.push(this.ingredients[index])
      this.$delete(this.ingredients, index)
      this.searchOpen = true
    },
    goToOverview () {
      this.ingredients = []
      this.$router.push({
        path: 'overview',
        query: { ingredient: this.selectedIngredients.map(e => e.id) }
      })
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
              this.searchOpen = true
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
  cursor: pointer

.ingredients-underneath
  .selected-ingredients
    display: inline-block
    text-align: left

    .selected-ingredient
      display: inline-block
      padding: 0 10px
      background-color: rgba(117, 189, 132, 0.16)
      margin: 10px
      max-height: 45px
      border-radius: 6px

      .remove-selected
        display: inline-block

      .md-field
        display: inline-block
        width: initial
        padding-top: 0
        margin-right: 7px
        height: initial
        max-height: 30px
        min-height: 30px

        .label, .md-input
          font-size: 14px

        &.quantity-ingredient
          label
            top: 8px

        &.volume-ingredient
          width: 70px
        .md-input.quantity-ingredient-input
          width: 60px

.searchbar
  position: relative
  width: 600px
  margin: 0 auto
  z-index: 9999

  .searchbar-content
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
    z-index: 4

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

            .label
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
