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
import AdminDashboard from '../component/Admin/adminController/Dashboard.vue'
import BarberController from '../component/Admin/barberController/Dashboard.vue'
import CustomerController from '../component/Admin/customerController/Dashboard.vue'
import BookingSub from '../component/Appointment/booking.vue'

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
  },
  {
    path: '/booking',
    name: 'Booking',
    component: BookingSub
  },
  {
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
  },
  {
    path: '/barber-controller',
    name: 'BarberController',
    component: BarberController,
    meta: { requiresAuth: true, role: 'Admin' }
  },
  {
    path: '/customer-controller',
    name: 'CustomerController',
    component: CustomerController,
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
  console.log('isAuthenticated:', isAuthenticated)
  console.log('userRole:', userRole)
  console.log('Navigating to:', to.path)
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
