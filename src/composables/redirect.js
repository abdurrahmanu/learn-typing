import router from "../router";

export default function routeRedirect () {
    const auth = authStore()
    const store = mainStore()
    const typingstore = typingStore()
    const settingstore = settingsStore()
    const nextstore = nextStore()
    const {goNext} = storeToRefs(nextstore)

    router.beforeEach((to, from) => {
        if (to.name === 'result' && !typingstore.testCompleted || to.name === 'progress' && !auth.isAuthenticated) {
            return {name: 'home'}
        }
    
        if (from.name === 'result' && typingstore.testCompleted) goNext.value = true
    
        settingstore.toggleCustomModal = false
        store.route = to.name
    })
}