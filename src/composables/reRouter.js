import router from "../router";

export default function reRouter () {
    const auth = authStore()
    const store = mainStore()
    const typingstore = typingStore()
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