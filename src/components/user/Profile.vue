<template>
  <div>
    <h1>Profiel van {{ user.username }}</h1>
      <md-field :md-clearable="update">
        <label>Email</label>
        <md-input type="email" v-model="user.email" :readonly="!update"></md-input>
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
      <md-field :md-clearable="update" v-if="update">
        <label>Password</label>
        <md-input type="password" v-model="user.password"></md-input>
        </md-field>
      <md-field :md-clearable="update" v-if="update">
        <label>Repeat your password</label>
        <md-input type="password" v-model="user.repeatPassword"></md-input>
        </md-field>
      <md-field v-if="update" :md-clearable="update">
        <label>New password</label>
        <md-input type="password" v-model="user.newPassword"></md-input>
        </md-field>
      <md-field v-if="user.description && user.description.length > 0" :md-clearable="update">
        <label>Description</label>
        <md-input v-model="user.description" :readonly="!update"></md-input>
      </md-field>
      <md-field v-else :md-clearable="update">
        <label>There is no description yet!</label>
        <md-input v-model="user.description" :readonly="!update"></md-input>
      </md-field>
      <md-button class="md-raised" v-on:click="updateProfile" v-if="!update">Change your information</md-button>
      <md-button class="md-raised" type="submit" v-if="update" v-on:click="updateUser">Update your profile</md-button>
      <md-button class="md-raised" v-on:click="updateProfile" v-if="update" >Cancel</md-button>
      <md-dialog-confirm
        :md-active.sync="active"
        md-title="Delete your profile?"
        md-content="Are you sure that you want to delete your profile?"
        md-confirm-text="Yes"
        md-cancel-text="No"
        @md-confirm="deleteUser"/>
      <md-button class="md-raised" @click="active = true" v-if="!update">Delete your profile</md-button>
    <div v-if='loggedIn' class='container'>
      <div>
        <div class='md-headline'>Favorited by you</div>
        <div class='block-layout' v-if="favoriteRecipes.length !== 0">
          <Recipe class='recipe-box' v-for='recipe in favoriteRecipes' :key='recipe.id' :recipe='recipe.recipe'/>
        </div>
        <div class="block-layout" v-if="favoriteRecipes.length === 0">
          <p class="placeholder">There are no liked recipes yet!</p>
        </div>
      </div>
    </div>
    <div v-if='loggedIn' class="container">
      <div class="md-headline">My recipes</div>
      <div class="block-layout">
        <Myrecipe class="recipe-box" v-for="recipe in myRecipes" :key="recipe.id" :recipe="recipe"/>
      </div>
      <div class="block-layout" v-if="myRecipes.length === 0">
        <p class="placeholder">You haven't made any recipes yet!</p>
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/services/UserService'
import PopularRecipesService from '@/services/PopularRecipesService'
import Recipe from '@/components/recipes/loop/recipe'
import Myrecipe from '@/components/recipes/loop/myrecipe'

export default {
  name: 'Profile',
  components: { Myrecipe, Recipe },
  data () {
    return {
      favoriteRecipes: [],
      myRecipes: [],
      user: Object,
      update: false,
      active: false,
      loggedIn: this.$store.getters.isLoggedIn,
      newPassword: ''
    }
  },
  created () {
    this.getUser()
    this.getFavoriteRecipes()
    this.getMyRecipes()
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
        ).catch(err => console.log(err))
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
    },

    async getMyRecipes () {
      if (!this.loggedIn) return

      UserService.getMyRecipes(this.$store.state.token).then(
        event => {
          this.$set(this, 'myRecipes', event.recipes)
        }
      )
    },

    async getFavoriteRecipes () {
      if (!this.loggedIn) return

      PopularRecipesService.getFavoriteRecipes(this.$store.state.token)
        .then(
          event => {
            this.$set(this, 'favoriteRecipes', event.recipes)
          }
        )
    }
  }
}
</script>

<style lang='sass' scoped>
.container
  background-color: #F6F4F5
  width: 70%
  padding: 15px
  margin: auto auto 20px

  .title
    margin-bottom: 15px

  .block-layout
    display: flex
    flex-direction: row

    .recipe-box
      width: 250px
      height: 200px
      overflow: hidden
      margin-right: 15px

</style>
