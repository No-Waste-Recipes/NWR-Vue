<template>
  <div>
    {{errors}}
    <form novalidate class="md-layout" @submit.prevent="validateUser">
      <md-card class="md-layout-item">
        <md-card-header>
          <div class="md-title">Register</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('username')">
            <label for="username">Username</label>
            <md-input type="text" name="username" id="username" v-model="form.username" />
            <span class="md-error" v-if="!$v.form.username.required">The username is required</span>
            <span class="md-error" v-else-if="!$v.form.username.minLength">The username needs to be at least 3 characters</span>
          </md-field>

          <md-field :class="getValidationClass('firstName')">
            <label for="firstName">First name</label>
            <md-input type="text" name="firstName" id="firstName" v-model="form.firstName" />
            <span class="md-error" v-if="!$v.form.firstName.required">The first name is required</span>
            <span class="md-error" v-else-if="!$v.form.firstName.minLength">First name needs to be at least 3 characters</span>
          </md-field>

          <md-field :class="getValidationClass('lastName')">
            <label for="lastName">Last name</label>
            <md-input type="text" name="lastName" id="lastName" v-model="form.lastName" />
            <span class="md-error" v-if="!$v.form.lastName.required">The last name is required</span>
            <span class="md-error" v-else-if="!$v.form.lastName.minLength">Last name needs to be at least 3 characters</span>
          </md-field>

          <md-field :class="getValidationClass('email')">
            <label for="email">Email</label>
            <md-input type="email" name="email" id="email" autocomplete="email" v-model="form.email" />
            <span class="md-error" v-if="!$v.form.email.required">The email is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>

          <md-field :class="getValidationClass('password')">
            <label for="password">Password</label>
            <md-input type="password" name="password" id="password" v-model="form.password" />
            <span class="md-error" v-if="!$v.form.password.required">The password is required</span>
            <span class="md-error" v-else-if="!$v.form.password.minLength">The password needs to be at least 6 characters</span>
          </md-field>

          <md-field :class="getValidationClass('passwordConfirmation')">
            <label for="passwordConfirmation">Password confirmation</label>
            <md-input type="password" name="passwordConfirmation" id="passwordConfirmation" v-model="form.passwordConfirmation" />
            <span class="md-error" v-if="!$v.form.email.required">The password confirmation is required</span>
            <span class="md-error" v-else-if="!$v.form.email.email">Invalid email</span>
          </md-field>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary">Register user</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
import { validationMixin } from 'vuelidate'
import {
  required,
  email,
  minLength
} from 'vuelidate/lib/validators'
export default {
  name: 'Register',
  mixins: [validationMixin],
  data: () => ({
    form: {
      username: null,
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      passwordConfirmation: null
    }
  }),
  validations: {
    form: {
      firstName: {
        required,
        minLength: minLength(3)
      },
      lastName: {
        required,
        minLength: minLength(3)
      },
      username: {
        required,
        minLength: minLength(3)
      },
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(6)
      },
      passwordConfirmation: {
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
    register: function () {
      const data = {
        username: this.form.username,
        // eslint-disable-next-line @typescript-eslint/camelcase
        first_name: this.form.firstName,
        // eslint-disable-next-line @typescript-eslint/camelcase
        last_name: this.form.lastName,
        email: this.form.email,
        password: this.form.password
      }
      this.$store.dispatch('register', data)
        .then(resp => {
          if (resp.data.errors) {
            this.errors = resp.data.errors
          } else {
            this.$router.push('/login')
          }
        })
        .catch(err => console.log(err))
    },
    validateUser () {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.register()
      }
    }
  }
}
</script>

<style scoped lang="sass">
  form
    margin: 20px 0
</style>
