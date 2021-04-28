<template>
  <div class="approve-list">
    <h2>Approve</h2>
    <div v-show="approveList.length >= 1" v-for="recipe in approveList" :key='recipe.id'>
      <RouterLink :to="{ name: 'AdminRecipeApproveDetail', params: { slug: recipe.slug}}">
        <div class="recipe-container">
          <div class="recipe-name">
            <h3>{{ recipe.title }}</h3>
          </div>
        </div>
      </RouterLink>
    </div>
    <div v-show="approveList.length < 1" class="no-recipes">
      <h2>All recipes have been approved denied</h2>
    </div>
    <RouterLink :to="{ name: 'Admin'}">Back</RouterLink>
  </div>
</template>

<script lang="ts">

import { Component, Vue } from 'vue-property-decorator'
import AdminRecipeService from '@/services/admin/AdminRecipeService'

@Component
export default class HeaderComponent extends Vue {
  data () {
    return {
      approveList: []
    }
  }

  created () {
    this.approveRecipes()
  }

  approveRecipes () {
    AdminRecipeService.getApproveRecipes(this.$store.state.token)
      .then(
        event => {
          this.$set(this, 'approveList', event.result)
        }
      )
  }
}

</script>

<style lang="sass" scoped>
  .recipe-container
    border: 1px solid #000
    padding: 10px

</style>
