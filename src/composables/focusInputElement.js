import { storeToRefs } from "pinia"
import { settingsStore } from "../store/settingsStore"
import { typingStore } from "../store/typingStore"
import { mainStore } from "../store/mainStore"

export default function focusInputElement (delay) {
    const mainstore = mainStore()
    const {route} = storeToRefs(mainstore)

    const customize = settingsStore()
    const { pauseTyping } = storeToRefs(customize)

    const typingstatestore = typingStore()
    const {focus} = storeToRefs(typingstatestore)

    if (pauseTyping.value && route.value !== 'home') return

    focus.value = true
}