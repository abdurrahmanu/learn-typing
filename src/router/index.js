import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultView from '../views/ResultView.vue'
import UserProgressView from '../views/UserProgressView.vue'
import AuthView from '../views/AuthView.vue'
import AccountView from '../views/AccountView.vue'

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
      path: '/progress',
      name: 'progress',
      component: UserProgressView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    }
  ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

// const {quotesWithoutAuthors} = englishWords()
// for (let index = 0; index < quotesWithoutAuthors.length; index++) {
//   if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length <= 9 ) {
//     newQuotes.value['ten'].push(quotesWithoutAuthors[index])
//   }   else if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length  <= 19) {
//     newQuotes.value['twenty'].push(quotesWithoutAuthors[index])
//   } else  if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length  <= 29) {
//     newQuotes.value['thirty'].push(quotesWithoutAuthors[index])
//   } else if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length  <= 39) {
//     newQuotes.value['fourty'].push(quotesWithoutAuthors[index])
//   }
// }
