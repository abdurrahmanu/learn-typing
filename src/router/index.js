import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultView from '../views/ResultView.vue'
import TypingView from '../views/TypingView.vue'
import UserProgressView from '../views/UserProgressView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      props: true,
      children: [
        {
          path: '',
          name: 'typing',
          component: TypingView,
          props: true,
        },
        {
          path: '/result',
          name: 'result',
          component: ResultView,
          props: true
        }
      ]
    },
    {
      path: '/progress',
      name: 'progress',
      component: UserProgressView,
      props: true
    }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
