<template>
  <div> {{user.email}}</div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  name: 'Profile',
  data () {
    return {
      user: Object
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    async getUser () {
      UserService.getUserProfile(this.$store.state.token)
        .then(
          event => {
            console.log(event)
            this.$set(this, 'user', event.user)
          })
    }
  }
}
</script>

<style scoped>

</style>
