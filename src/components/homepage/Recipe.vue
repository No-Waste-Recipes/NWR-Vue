<template>
  <div>
    <div class='md-title'>
      {{ recipe.name }}
    </div>
    <div class='picture'>
      Foto whattttttttttttttttttttttttttttt
    </div>
  </div>
</template>

<script>
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

export default {
  name: 'Recipe'
}
</script>

<style lang='sass' scoped>
.picture
  background-color: blue
  height: 100%
</style>
