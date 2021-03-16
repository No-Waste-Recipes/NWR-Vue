import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import FAQ from '../views/FAQ.vue'
import Overview from '../views/Overview.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import RecipeDetail from '../views/RecipeDetail.vue'
import CreateRecipeView from '../views/createRecipeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/faq',
    name: 'Faq',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: FAQ
  },
  {
    path: '/overview',
    name: 'overview',
    component: Overview
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/recipe/:slug',
    name: 'RecipeDetail',
    component: RecipeDetail
  },
  {
    path: '/createrecipe',
    name: 'CreateRecipeView',
    component: CreateRecipeView
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
