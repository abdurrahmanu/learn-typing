import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';
import {timerStore} from '../store/timerStore'
import { typingStateStore } from "../store/typingStateStore";

export const mobileInputEvent = (e) => {
    const typingstatestore = typingStateStore()
    const {playerInput, playerInputLength, focus, enterKey, backspaceIsPressed} = storeToRefs(typingstatestore)

    const timerstore = timerStore()
    const {startTime, beginCountdown, beatCountdown} = storeToRefs(timerstore)
    
    const store = mainStore()
    const { containerText, mobileBackspace, hasCompletedSession, route} = storeToRefs(store)
    
    const customize = customizeStore()
    const {pauseTyping, customizers} = storeToRefs(customize)
    
    if (mobileBackspace.value) {
        mobileBackspace.value = false
        return
    }
    
    e.inputType === 'deleteContentBackward' ? backspaceIsPressed.value = true : backspaceIsPressed.value = false
    
    if (route.value !== 'home') return
    if (!focus.value || (e.key === 'Enter' && !enterKey.value) || pauseTyping.value || hasCompletedSession.value) return

    if (playerInputLength.value === 1)  {
        if (customizers.value['timer']) {
            beatCountdown.value = false
            beginCountdown.value = true
        }
        startTime.value = performance.now();
    } 

    if (e.key === 'Enter' && enterKey.value)  playerInput.value += ' '
    
    if (playerInput.value.length === containerText.value.length) {
        if (customizers.value['timer']) beatCountdown.value = true
        hasCompletedSession.value = true
    }
}