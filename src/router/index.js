import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Landing from '../views/Landing.vue'
import About from '../views/About.vue'
import Explorar from '../views/Explorar.vue'
import Market from '../views/Market.vue'
import newPost from '../views/newPost.vue'
import ResetPass from '../views/ResetPass.vue'
import Profile from '../views/Profile.vue'
import Collection from '../views/Collection.vue'
import Swaps from '../views/Swaps.vue'
import Trading from '../views/Trading.vue'
import ReviewOffer from '../views/reviewOffer.vue'
import ViewMarketPost from '../views/viewMarketPost.vue'

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
    path: '/market',
    name: 'market',
    component: Market
  },
  {
    path: '/market/newPost',
    name: 'newPost',
    component: newPost
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
    path: '/swaps',
    name: 'swaps',
    component: Swaps
  },
  {
    path: '/trading',
    name: 'trading',
    component: Trading
  },
  {
    path: '/reviewOffer/:id',
    name: 'Review Offer',
    component: ReviewOffer
  },
  {
    path: '/viewMarketPost/:id',
    name: 'ViewMarketPost',
    component: ViewMarketPost
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
