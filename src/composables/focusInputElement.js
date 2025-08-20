export default function focusInputElement (delay) {
    const mainstore = mainStore()
    const {route} = storeToRefs(mainstore)

    const settingstore = settingsStore()
    const { pauseTyping } = storeToRefs(settingstore)

    const typingstatestore = typingStore()
    const {focus} = storeToRefs(typingstatestore)

    if (pauseTyping.value && route.value !== 'home') return

    focus.value = true
}