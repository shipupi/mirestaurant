import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Restaurant from '../components/Restaurant.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/restaurants/:slug',
    name: 'Restaurant',
    component: Restaurant

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
