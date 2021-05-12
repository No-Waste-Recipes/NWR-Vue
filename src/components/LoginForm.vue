<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Login</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="text" name="email" id="email" v-model="form.email" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" v-model="form.password" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary">Login</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required
} from 'vuelidate/lib/validators'
export default {
  name: 'LoginForm',
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null
    }
  }),
  validations: {
    form: {
      email: {
        required
      },
      password: {
        required
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    login: function () {
      console.log('reached')
      const email = this.form.email
      const password = this.form.password
      this.$store.dispatch('login', {
        email,
        password
      })
        .then(() => this.$router.push('/'))
        .catch(err => console.log(err))
    },
    validateUser () {
      this.$v.$touch()
      console.log(!this.$v.$invalid)
      if (!this.$v.$invalid) {
        console.log('reached')
        this.login()
      }
    }
  }
}
</script>

<style scoped lang="sass">
  form
    margin: 20px 0
</style>
