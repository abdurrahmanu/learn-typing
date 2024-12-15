import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultView from '../views/ResultView.vue'
import UserView from '../views/UserView.vue'
import AccountView from '../views/AccountView.vue'
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
      path: '/account',
      name: 'account',
      component: AccountView,
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
