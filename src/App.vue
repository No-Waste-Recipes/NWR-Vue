<template>
  <div id='app'>
    <HeaderComponent v-if='!isAdmin'/>
    <div class='wrapper'>
      <div class='container'>
        <router-view/>
      </div>
      <div class='push'></div>
    </div>

    <FooterComponent class='footer' v-if='!isAdmin'></FooterComponent>
  </div>
</template>

<script lang='ts'>
import FooterComponent from '@/components/Footer.vue'
import HeaderComponent from '@/components/Header.vue'
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component({
  components: {
    HeaderComponent,
    FooterComponent
  }
})

export default class App extends Vue {
  get isAdmin () {
    return this.$route.meta.admin
  }

  created () {
    axios.interceptors.response.use((response) => {
      return response
    }, (error) => {
      if (error.response.status === 401) {
        this.$store.dispatch('logout')
          .then(() => {
            this.$router.push('/login')
          })
      }
    })
  }
}
</script>

<style lang='sass'>
body
  margin: 0
  padding: 0
  height: 100%

.md-menu-content.md-select-menu
  z-index: 9999 !important

#app
  height: 100%
  width: 100%
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

.wrapper
  min-height: 100%
  margin-bottom: -300px

.footer, .push
  height: 300px
</style>
