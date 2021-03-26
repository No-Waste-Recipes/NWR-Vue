<template>
  <div>
    <md-tabs id="nav" md-sync-route>
      <md-tab  v-for="tab in tabs" :key="tab.title" :md-label="tab.title" :to="tab.route" :exact="tab.exact">
      </md-tab>
      <md-tab v-if="isLoggedIn" key="logout" md-label="logout" @click="logout">
      </md-tab>
      <md-tab v-if="!isLoggedIn" key="login" md-label="login" to="/login">
      </md-tab>
      <md-tab v-if="!isLoggedIn" key="register" md-label="register" to="/register">
      </md-tab>
      <md-tab v-if="!isLoggedIn" key="profile" md-label="profile" to="/profile">
      </md-tab>
    </md-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class HeaderComponent extends Vue {
  data () {
    return {
      tabs: [
        { title: 'Home', route: '/', exact: true },
        { title: 'About', route: '/about' },
        { title: 'F.A.Q', route: '/faq' }
      ]
    }
  }

  public logout (): void {
    this.$store.dispatch('logout')
      .then(() => {
        this.$router.push('/login')
      })
  }

  get isLoggedIn () {
    return this.$store.getters.isLoggedIn
  }
}
</script>

<style lang="sass">
  #nav
    a
      font-weight: bold
      color: #2c3e50
      &.router-link-exact-active
        color: #75BD84

    .md-tabs-indicator
      background-color: #75BD84
</style>
