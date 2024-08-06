import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';

export const inputEvent = (e) => {
    const store = mainStore()
    const { containerText, beatCountdown, playerInputLength, route, hasCompletedSession,  playerInput, wrongCount, backspaceIsPressed, playerLastInput, beginCountdown, startTime, enterKey, timedTyping} = storeToRefs(store)
    const { sessionComplete } = store
    
    const customize = customizeStore()
    const {backspace, pauseTyping} = storeToRefs(customize)
    
    if (e.key === 'Escape') return
    if (route.value !== 'home') return
    if (e.type === 'keydown' && e.key === 'Backspace') backspaceIsPressed.value = true
    else backspaceIsPressed.value = false
    if (route.value !== 'home') return
    if ((e.key === 'Enter' && !enterKey.value) || pauseTyping.value) return

    if (e.type === 'keydown' && e.key === 'Backspace') {
        if (!backspace.value || playerInputLength.value === 0 || wrongCount.value === 0) return
        playerInputLength.value--
        playerInput.value = playerInput.value.slice(0, -1)
        playerLastInput.value = playerInput.value[playerInput.value.length - 1]
    }

    if (e.type === 'keydown') return
    if (e.type === 'keypress')  backspaceIsPressed.value = false   
    let eventSelector = e.key || e.data
    if (e.key === 'Enter' && !enterKey.value) return 
    playerInputLength.value++
    if (playerInputLength.value === 1)  {
        if (timedTyping.value) {
            beatCountdown.value = false
            beginCountdown.value = true
        }
        startTime.value = performance.now();
    } 

    if ((e.key === 'Enter' && e.type === 'keypress' && enterKey.value) || e.key === ' ') {
        if (e.key === ' ') e.preventDefault()
        playerLastInput.value = ' '
    }
    else  playerLastInput.value = eventSelector
    playerInput.value += playerLastInput.value
    if (playerInputLength.value === containerText.value.length) {
        if (timedTyping.value) beatCountdown.value = true
        sessionComplete()
    }
}
