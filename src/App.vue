<template>
  <div id="app">
    <HeaderComponent/>
    <div class="container">
      <router-view/>
    </div>
    <FooterComponent></FooterComponent>
  </div>
</template>

<script lang="ts">
import FooterComponent from '@/components/Footer.vue'
import HeaderComponent from '@/components/Header.vue' // @ is an alias to /src

export default {
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style lang="sass">
.md-menu-content.md-select-menu
  z-index: 9999!important
#app
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50

  .container
    width: 100%
    padding-right: 15px
    padding-left: 15px
    margin-right: auto
    margin-left: auto

    @media (min-width: 576px)
      max-width: 540px

    @media (min-width: 768px)
      max-width: 720px

    @media (min-width: 992px)
      max-width: 960px

    @media (min-width: 1200px)
      max-width: 1140px
</style>
