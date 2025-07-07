import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';
import { correctWrongCountStore } from "../store/correctWrongCountStore";
import {timerStore} from '../store/timerStore'
import { typingStateStore } from "../store/typingStateStore";

export default function inputEvent (e) {
    const typingstatestore = typingStateStore()
    const {playerInput, playerInputLength, backspaceIsPressed, playerLastInput, enterKey} = storeToRefs(typingstatestore)

    const timerstore = timerStore()
    const {startTime, beginCountdown, beatCountdown} = storeToRefs(timerstore)

    const correctWrongCountstore = correctWrongCountStore()
    const {wrongCount} = storeToRefs(correctWrongCountstore)

    const store = mainStore()
    const { containerText, hasCompletedSession} = storeToRefs(store)
    
    const customize = customizeStore()
    const {backspace, pauseTyping, toggleCapsToast, customizers} = storeToRefs(customize)

    const returnOnWrongInput = () => {
        return customizers.value['stop-on-error'] && wrongCount.value && e.key !== 'Backspace'
    }

    const returnFromCapsLockEvent = () => {
        if (!customizers.value['capslock']) {
            if (e.getModifierState('CapsLock') && e.key !== 'CapsLock') {
                if (!toggleCapsToast.value) toggleCapsToast.value = true
                return true
            }

            if (e.key === 'CapsLock') {
                if (e.getModifierState('CapsLock')) toggleCapsToast.value = true
                else toggleCapsToast.value = false
                return true
            }
        }
    }

    const invalidBackspaceEvent = () => {
        if (e.key === 'Backspace') {
            if (!backspace.value || !wrongCount.value || !playerInput.value.length) return true
        }
    }

    if (
        pauseTyping.value ||
        returnOnWrongInput() || 
        returnFromCapsLockEvent() ||
        invalidBackspaceEvent()
    ) return

    if (e.key === 'Enter' && !enterKey.value) return

    let eventSelector = e.key

    const startTimer = () => {
        if (playerInputLength.value === 1)  {
            if (customizers.value['timer']) {
                beatCountdown.value = false
                beginCountdown.value = true
            }
            startTime.value = performance.now();
        } 
    }

    if ((e.key === 'Enter' && enterKey.value) || e.key === ' ') {
        if (e.key === ' ') e.preventDefault()
        playerLastInput.value = ' '
    }

    if (e.key === 'Backspace') {        
        backspaceIsPressed.value = true
        playerInputLength.value--
        playerInput.value = playerInput.value.slice(0, -1)
        playerLastInput.value = playerInput.value[playerInput.value.length - 1]
        return
    }
    
    else backspaceIsPressed.value = false
 
    if (e.key.length === 1 && e.key !== 'Dead') playerLastInput.value = eventSelector 

    playerInput.value += playerLastInput.value
    playerInputLength.value = playerInput.value.length

    if (playerInputLength.value === containerText.value.length) {
        if (customizers.value['timer']) beatCountdown.value = true
        hasCompletedSession.value = true
    }

    if (playerInputLength.value === 1) startTimer() 
}
