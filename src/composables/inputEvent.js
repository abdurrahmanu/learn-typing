import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { isTouchScreenDevice } from "./isTouchScreenDevice";
import { storeToRefs } from 'pinia';
import { correctWrongCountStore } from "../store/correctWrongCountStore";
import {timerStore} from '../store/timerStore'
import { typingStateStore } from "../store/typingStateStore";

export const inputEvent = (e) => {
    const typingstatestore = typingStateStore()
    const {playerInput, playerInputLength, backspaceIsPressed, playerLastInput, enterKey} = storeToRefs(typingstatestore)

    const timerstore = timerStore()
    const {startTime, beginCountdown, beatCountdown} = storeToRefs(timerstore)

    const correctWrongCountstore = correctWrongCountStore()
    const {wrongCount} = storeToRefs(correctWrongCountstore)

    const store = mainStore()
    const { containerText, hasCompletedSession, route} = storeToRefs(store)
    
    const customize = customizeStore()
    const {backspace, pauseTyping, toggleCapsToast, customizers} = storeToRefs(customize)

    if (customizers.value['stop-on-error'] && wrongCount.value && !isTouchScreenDevice() && e.key !== 'Backspace') return

    if (!customizers.value['capslock'] && !toggleCapsToast.value && e.key !== 'CapsLock' && e.getModifierState('CapsLock')) toggleCapsToast.value = true
    if (!customizers.value['capslock'] && e.getModifierState('CapsLock') && e.key !== 'CapsLock') return
    if (e.key === 'CapsLock' && !customizers.value['capslock']) {
        if (e.getModifierState('CapsLock')) toggleCapsToast.value = true
        else toggleCapsToast.value = false
        return
    }

    if (e.key === 'Escape') return
    if (route.value !== 'home') return
    if (e.key === 'Backspace' && !backspace.value) return
    if (e.key === 'Backspace' && !wrongCount.value) return
    if (e.key === 'Backspace' && !playerInput.value.length) return
    if ((e.key === 'Enter' && !enterKey.value) || pauseTyping.value) return

    if (e.key === 'Backspace') {
        backspaceIsPressed.value = true
        playerInputLength.value--
        playerInput.value = playerInput.value.slice(0, -1)
        playerLastInput.value = playerInput.value[playerInput.value.length - 1]
    }
    else backspaceIsPressed.value = false

    let eventSelector = e.key || e.data

    if (e.type !== 'keydown') {
            if (e.key === 'Enter' && !enterKey.value) return 
            playerInputLength.value++
            if (playerInputLength.value === 1)  {
                if (customizers.value['timer']) {
                    beatCountdown.value = false
                    beginCountdown.value = true
                }
                startTime.value = performance.now();
            } 
        
            if ((e.key === 'Enter' && enterKey.value) || e.key === ' ') {
                if (e.key === ' ') e.preventDefault()
                playerLastInput.value = ' '
            }
        
            else  playerLastInput.value = eventSelector
            playerInput.value += playerLastInput.value

            if (playerInputLength.value === containerText.value.length) {
                if (customizers.value['timer']) beatCountdown.value = true
                hasCompletedSession.value = true
            }
        }
}
