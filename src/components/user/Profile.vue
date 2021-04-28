<template>
  <div>
    <h1>Profiel van {{ user.username }}</h1>
    <md-field :md-clearable="update">
      <label>Email</label>
      <md-input v-model="user.email" :readonly="!update"></md-input>
    </md-field>
    <md-field :md-clearable="update">
      <label>Username</label>
      <md-input v-model="user.username" :readonly="!update"></md-input>
    </md-field>
    <md-field :md-clearable="update">
      <label>First name</label>
      <md-input v-model="user.first_name" :readonly="!update"></md-input>
    </md-field>
    <md-field :md-clearable="update">
      <label>Last name</label>
      <md-input v-model="user.last_name" :readonly="!update"></md-input>
    </md-field>
    <md-field v-if="user.description && user.description.length > 0" :md-clearable="update">
      <label>Description</label>
      <md-input v-model="user.description" :readonly="!update"></md-input>
    </md-field>
    <md-field v-else :md-clearable="update">
      <label>There is no description yet!</label>
      <md-input v-model="user.description" :readonly="!update"></md-input>
    </md-field>
    <md-button class="md-raised" v-on:click="updateProfile" v-if="!update" >Change your information</md-button>
    <md-button class="md-raised" v-on:click="updateProfile" v-if="update" >Cancel</md-button>
    <md-button class="md-raised" v-if="update" v-on:click="updateUser">Update your profile</md-button>
      <md-dialog-confirm
        :md-active.sync="active"
        md-title="Delete your profile?"
        md-content="Are you sure that you want to delete your profile?"
        md-confirm-text="Yes"
        md-cancel-text="No"
        @md-confirm="deleteUser" />
      <md-button class="md-raised" @click="active = true">Delete your profile</md-button>
  </div>
</template>

<script>
import UserService from '@/services/UserService'

export default {
  name: 'Profile',
  data () {
    return {
      user: Object,
      update: false,
      active: false
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
    },
    async updateProfile () {
      this.update = this.update !== true
    },
    async updateUser () {
      UserService.updateUserProfile(this.$store.state.token, this.user)
        .then(
          event => {
            console.log(event)
            this.$set(this, 'user', event.user)
            this.update = false
          }
        )
    },
    async deleteUser () {
      UserService.deleteUserProfile(this.$store.state.token)
        .then(
          event => {
            console.log(event)
            this.$store.dispatch('logout')
              .then(() => {
                this.$router.push('/')
              })
          }
        )
    }
  }
}
</script>

<style scoped>

</style>
