import { storeToRefs } from "pinia"
import { customizeStore } from "../store/customizeStore"
import { typingStateStore } from "../store/typingStateStore"
import { mainStore } from "../store/mainStore"

export default function focusInputElement (delay) {
    const mainstore = mainStore()
    const {route} = storeToRefs(mainstore)

    const customize = customizeStore()
    const { pauseTyping } = storeToRefs(customize)

    const typingstatestore = typingStateStore()
    const {inputEl, focus} = storeToRefs(typingstatestore)

    if (pauseTyping.value && route.value !== 'home') return

    focus.value = true
}