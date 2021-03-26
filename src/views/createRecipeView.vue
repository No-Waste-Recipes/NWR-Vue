<template>
  <CreateRecipeComponent/>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import CreateRecipeComponent from '@/components/CreateRecipeComponent.vue'

@Component({
  components: {
    CreateRecipeComponent
  }
})
export default class CreateRecipeView extends Vue {}
</script>

<style scoped>

</style>
