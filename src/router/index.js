import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultView from '../views/ResultView.vue'
import UserView from '../views/UserView.vue'
import AboutView from '../views/AboutView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/result',
      name: 'result',
      component: ResultView,
    },
    {
      path: '/user',
      name: 'user',
      component: UserView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router