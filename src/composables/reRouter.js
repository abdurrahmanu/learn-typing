import router from "../router";
import { mainStore } from "../store/mainStore";
import { authStore } from "../store/authStore";
import { settingsStore } from "../store/settingsStore";
import { nextStore } from "../store/nextStore";
import { typingStateStore } from "../store/typingStateStore";
import { storeToRefs } from "pinia";

export default function reRouter () {
    const auth = authStore()
    const store = mainStore()
    const typingstore = typingStateStore()
    const customize = settingsStore()
    const nextstore = nextStore()
    const {goNext} = storeToRefs(nextstore)

    router.beforeEach((to, from) => {
        if (to.name === 'result' && !typingstore.testCompleted || to.name === 'progress' && !auth.isAuthenticated) {
            return {name: 'home'}
        }
    
        if (from.name === 'result' && typingstore.testCompleted) goNext.value = true
    
        customize.toggleCustomModal = false
        store.route = to.name
    })
}