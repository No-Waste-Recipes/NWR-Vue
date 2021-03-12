<template>
  <detail></detail>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Detail from '../components/recipes/detail.vue'

@Component({
  components: {
    Detail
  }
})
export default class RecipeDetail extends Vue {}
</script>

<style scoped>

</style>
