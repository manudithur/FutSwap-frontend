import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Landing from '../views/Landing.vue'
import About from '../views/About.vue'
import Explorar from '../views/Explorar.vue'
import ResetPass from '../views/ResetPass.vue'
import Profile from '../views/Profile.vue'
import Collection from '../views/Collection.vue'
import Trading from '../views/Trading.vue'

import mdiVue from 'mdi-vue/v2'
import * as mdijs from '@mdi/js'

Vue.use(VueRouter)
Vue.use(mdiVue, {
  icons: mdijs
})

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/landing',
    name: 'landing',
    component: Landing
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/explorar',
    name: 'explorar',
    component: Explorar
  },
  {
    path: '/resetPass',
    name: 'resetPass',
    component: ResetPass
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/collection',
    name: 'collection',
    component: Collection
  },
  {
    path: '/trading',
    name: 'trading',
    component: Trading
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
