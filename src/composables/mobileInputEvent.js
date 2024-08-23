import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';

export const mobileInputEvent = (e) => {
    const store = mainStore()
    const { containerText, mobileBackspace, beatCountdown, hasCompletedSession, route, playerInputLength, playerInput, backspaceIsPressed, beginCountdown, startTime, enterKey, timedTyping, focus} = storeToRefs(store)
    const { sessionComplete } = store
    
    const customize = customizeStore()
    const {pauseTyping} = storeToRefs(customize)

    if (mobileBackspace.value) {
        mobileBackspace.value = false
        return
    }
    
    e.inputType === 'deleteContentBackward' ? backspaceIsPressed.value = true : backspaceIsPressed.value = false

    if (route.value !== 'home') return
    if (!focus.value || (e.key === 'Enter' && !enterKey.value) || pauseTyping.value || hasCompletedSession.value) return
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