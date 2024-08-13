import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';

export const inputEvent = (e) => {
    const store = mainStore()
    const { containerText, beatCountdown, playerInputLength, route, correctCount, hasCompletedSession,  playerInput, wrongCount, backspaceIsPressed, playerLastInput, beginCountdown, startTime, enterKey, timedTyping} = storeToRefs(store)
    const { sessionComplete } = store
    
    const customize = customizeStore()
    const {backspace, pauseTyping} = storeToRefs(customize)

    
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
                if (timedTyping.value) {
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
                if (timedTyping.value) beatCountdown.value = true
                sessionComplete()
            }
        }
}
