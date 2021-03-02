<template>
  <md-tabs id="nav" md-sync-route>
    <md-tab  v-for="tab in tabs" :key="tab.title" :md-label="tab.title" :to="tab.route" :exact="tab.exact">
    </md-tab>
  </md-tabs>
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
