import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';

export const mobileInputEvent = (e) => {
        const store = mainStore()
        const { containerText, beatCountdown, hasCompletedSession, route, playerInputLength, wrongCount, playerInput, backspaceIsPressed, beginCountdown, startTime, enterKey, timedTyping, focus} = storeToRefs(store)
        const { sessionComplete } = store

        const customize = customizeStore()
        const {backspace, pauseTyping} = storeToRefs(customize)

    if (route.value !== 'home') return
    if (!focus.value || (e.key === 'Enter' && !enterKey.value) || pauseTyping.value || hasCompletedSession.value) return
    if (e.inputType === 'deleteContentBackward') {
        if (!backspace.value || playerInputLength.value === 0 || wrongCount.value === 0) return
        backspaceIsPressed.value = true
    }
    if (e.inputType === 'deleteContentBackward') return
    backspaceIsPressed.value = false
    if (playerInputLength.value === 1)  {
        if (timedTyping.value) {
            beatCountdown.value = false
            beginCountdown.value = true
        }
        startTime.value = performance.now();
    } 

    if (e.key === 'Enter' && enterKey.value)  playerInput.value += ' '
    if (playerInput.value.length === containerText.value.length) {
        if (timedTyping.value) beatCountdown.value = true
        sessionComplete()
    }
}