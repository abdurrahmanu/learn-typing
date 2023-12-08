import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
  ]
  // children: [
  //   {
  //     path: 'typing',
  //     name: 'typing',
  //     component: TypingView
  //   },
  //   {
  //     path: 'leaderboard',
  //     name: 'leaderboard',
  //     component: LeaderBoardView
  //   },
  //   {
  //     path: 'result/:data',
  //     name: 'result',
  //     component: ResultView,
  //   },
  //   {
  //     path: 'progress',
  //     name: 'progress',
  //     component: UserProgressView
  //   },
  // ]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
