<template>
  <div class="users">
    <md-table md-card>
      <md-table-toolbar>
        <h1 class="md-title">Users</h1>
      </md-table-toolbar>

      <md-table-row>
        <md-table-head md-numeric>ID</md-table-head>
        <md-table-head>Username</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Role</md-table-head>
        <md-table-head>Delete</md-table-head>
      </md-table-row>
      <md-table-row v-for="(user, index) in users" :key="user.id">
        <md-table-cell md-numeric>{{user.id}}</md-table-cell>
        <md-table-cell>{{ user.username }}</md-table-cell>
        <md-table-cell>{{ user.email }}</md-table-cell>
        <md-table-cell>{{ user.role }}</md-table-cell>
        <md-table-cell><a class="delete" @click="userDeleteClick(index)">delete User</a></md-table-cell>
      </md-table-row>
    </md-table>
    <md-dialog-confirm
      :md-active.sync="active"
      md-title="Delete your profile?"
      md-content="Are you sure that you want to delete your profile?"
      md-confirm-text="Yes"
      md-cancel-text="No"
      @md-confirm="deleteUser" />
    <RouterLink :to="{ name: 'Admin'}">Back</RouterLink>
  </div>
</template>

<script>
import AdminUserService from '@/services/admin/AdminUserService'

export default {
  name: 'UsersOverview',
  data () {
    return {
      users: [],
      active: false,
      deletingProfileRow: Number
    }
  },
  created () {
    this.getAllUsers()
  },
  methods: {
    userDeleteClick (index) {
      this.active = true
      this.deletingProfileRow = index
    },
    async getAllUsers () {
      AdminUserService.getUsers(this.$store.state.token)
        .then(
          event => {
            this.$set(this, 'users', event.users)
          }
        )
    },
    async deleteUser () {
      AdminUserService.deleteUserProfile(this.$store.state.token, this.users[this.deletingProfileRow].id)
        .then(
          () => {
            this.$delete(this.users, this.deletingProfileRow)
          }
        )
    }
  }
}
</script>

<style scoped lang="sass">
  .users
    text-align: left

  .delete
    cursor: pointer
</style>
