import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
    userId: localStorage.getItem('userId') || '',
    userRole: localStorage.getItem('userRole') || ''
  },
  mutations: {
    AuthRequest (state) {
      state.status = 'loading'
    },
    AuthSuccess (state, { token, user }) {
      state.status = 'success'
      state.token = token
      state.user = user
    },
    AuthError (state) {
      state.status = 'error'
    },
    logout (state) {
      state.status = ''
      state.token = ''
    }
  },
  actions: {
    login ({ commit }, user) {
      return new Promise((resolve) => {
        commit('AuthRequest')
        axios({ url: 'http://localhost:3000/users/login', data: user, method: 'POST' })
          .then(resp => {
            const token = resp.data.token
            const user = resp.data.user
            localStorage.setItem('token', token)
            localStorage.setItem('userId', user.id)
            localStorage.setItem('userRole', user.role)
            axios.defaults.headers.common.Authorization = token
            commit('AuthSuccess', { token, user })
            resolve(resp)
          })
      })
    },
    register ({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit('AuthRequest')
        axios({ url: 'http://localhost:3000/users/register', data: user, method: 'POST' })
          .then(resp => {
            if (!resp.data.errors) {
              const token = resp.data.token
              localStorage.setItem('token', token)
              axios.defaults.headers.common.Authorization = token
              commit('AuthSuccess', { token, user })
            }
            resolve(resp)
          })
          .catch(err => {
            commit('AuthError', err)
            localStorage.removeItem('token')
            reject(err)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve) => {
        commit('logout')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('userRole')
        delete axios.defaults.headers.common.authorization
        resolve()
      })
    }
  },
  modules: {
  },
  getters: {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    user: state => state.user
  }
})
