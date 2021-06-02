<template>
  <div class="home">
    <img width='350px' alt="Vue logo" src="../assets/Logo-with-Text.png">
    <searchbar :homepage="true" :selected-ingredients="[]"/>
    <HomeRecipes/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src
import searchbar from '@/components/search/searchbar.vue'
import HomeRecipes from '@/components/homepage/HomeRecipes.vue' // @ is an alias to /src

@Component({
  components: {
    HomeRecipes,
    HelloWorld,
    searchbar
  }
})
export default class Home extends Vue {}
</script>
