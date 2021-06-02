<template>
  <div class="home">
    <img width='350px' src="../assets/Logo-without-Text.png">
    <HelloWorld msg="FAQ"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import HelloWorld from '@/components/HelloWorld.vue' // @ is an alias to /src

@Component({
  components: {
    HelloWorld
  }
})
export default class FAQ extends Vue {}
</script>
