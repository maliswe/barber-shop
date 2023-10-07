import Vue from 'vue'
import store from '../store/store.js'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Login from '../views/Login.vue'
import Service from '../views/Service.vue'
import Register from '../views/Register.vue'
import Contact from '../views/Contact.vue'
import Gallery from '../views/Gallery.vue'
import Book from '../views/Book.vue'
import BarberDashboard from '../component/Barber/barberDashboard.vue'
import AdminDashboard from '../component/Admin/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/service',
    name: 'Service',
    component: Service
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/Gallery',
    name: 'Gallery',
    component: Gallery
  },
  {
    path: '/book',
    name: 'Book',
    component: Book
  }, {
    path: '/barber-dashboard',
    name: 'BarberDashoard',
    component: BarberDashboard,
    meta: { requiresAuth: true, role: 'Barber' }
  },
  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: AdminDashboard,
    meta: { requiresAuth: true, role: 'Admin' }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.isLoggedIn
  const userRole = store.state.role
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next('/login')
    } else {
      if (to.matched.some(record => record.meta.role && record.meta.role !== userRole)) {
        next('/')
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

export default router
