<template>
  <CreateRecipeComponent/>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import CreateRecipeComponent from '@/components/CreateRecipeComponent.vue'
import searchbar from '@/components/search/searchbar.vue'

@Component({
  components: {
    CreateRecipeComponent,
    searchbar
  }
})
export default class CreateRecipeView extends Vue {}
</script>

<style scoped>

</style>
