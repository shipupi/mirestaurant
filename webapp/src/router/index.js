import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/views/Home.vue'
import Restaurant from '../components/views/Restaurant.vue'
import Auth from '../components/auth/Auth.vue'
import RestaurantAdmin from '../components/admin/RestaurantAdmin.vue'
import UserAdmin from '../components/admin/UserAdmin.vue'
import EditRestaurant from '../components/admin/EditRestaurant.vue'
import EditUser from '../components/admin/EditUser.vue'
import EditReview from '../components/admin/EditReview.vue'
import CreateUser from '../components/admin/CreateUser.vue'
import CreateRestaurant from '../components/admin/CreateRestaurant.vue'
import NotFound from '../components/errors/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/restaurants/:slug',
    name: 'Restaurant',
    component: Restaurant,
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta: {
      guest: true
    }
  },
  {
    path: '/admin/restaurants',
    name: 'RestaurantAdmin',
    component: RestaurantAdmin,
    meta: {
      adminOnly: true
    }
  },
  {
    path: '/admin/users',
    name: 'UserAdmin',
    component: UserAdmin,
    meta: {
      adminOnly: true
    }
  },
  {
    path: '/admin/restaurants/:slug',
    name: 'EditRestaurant',
    component: EditRestaurant,
    meta: {
      adminOnly: true
    }
  },
  {
    path: '/admin/reviews/:id',
    name: 'EditReview',
    component: EditReview,
    meta: {
      adminOnly: true
    }
  },
  {
    path: '/admin/users/:user_id',
    name: 'EditUser',
    component: EditUser,
    meta: {
      adminOnly: true
    }
  },
  {
    path: '/admin/create_user',
    name: 'CreateUser',
    component: CreateUser,
    meta: {
      adminOnly: true
    }
  },
  {
    path: '/admin/create_restaurant',
    name: 'CreateRestaurant',
    component: CreateRestaurant,
    meta: {
      adminOnly: true
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.adminOnly)) {
    if (localStorage.getItem('jwt') == null) {
      next({
        path: '/auth',
      })
    } else {
      let user = JSON.parse(localStorage.getItem('user'))
      if (to.matched.some(record => record.meta.adminOnly)) {
        if (user.is_admin) {
          next()
        } else {
          next({ name: 'Home' })
        }
      } else {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (localStorage.getItem('jwt') == null) {
      next()
    } else {
      next({ name: 'Home' })
    }
  } else {
    next()
  }
})

export default router
