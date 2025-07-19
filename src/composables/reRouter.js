import router from "../router";
import { mainStore } from "../store/mainStore";
import { authStore } from "../store/authStore";
import { customizeStore } from "../store/customizeStore";
import { nextStore } from "../store/nextStore";
import { storeToRefs } from "pinia";

export default function reRouter () {
    const auth = authStore()
    const store = mainStore()
    const customize = customizeStore()
    const nextstore = nextStore()
    const {goNext} = storeToRefs(nextstore)

    router.beforeEach((to, from) => {
        if (to.name === 'result' && !store.hasCompletedSession || to.name === 'progress' && !auth.isAuthenticated) {
            return {name: 'home'}
        }
    
        if (from.name === 'result' && store.hasCompletedSession) goNext.value = true
    
        customize.toggleCustomTestModal = false
        store.route = to.name
    })
}