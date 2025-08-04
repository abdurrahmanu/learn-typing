import { settingsStore } from "../store/settingsStore";
import { storeToRefs } from 'pinia';
import { characterStore } from "../store/characterStore";
import { typingStateStore } from "../store/typingStateStore";
import { isMobile } from "./isMobile";
import { timerStore } from "../store/timerStore";
import { ref } from "vue";

export default function inputEvent (event) {
    const value = ref('')

    const typingstatestore = typingStateStore()
    const {playerInputLength, backspaceIsPressed, enterKey, beginTest} = storeToRefs(typingstatestore)

    const timerstore = timerStore()
    const {beatCountdown, beginCountdown, startTime} = storeToRefs(timerstore)

    const characterstore = characterStore()
    const {incorrectCharCount} = storeToRefs(characterstore)
    
    const customize = settingsStore()
    const {toggleCapsToast, settings} = storeToRefs(customize)

    const eventData = event.key || event.data
    const eventType  = event.key || event.inputType

    const returnOnWrongInput = () => {
        return settings.value['backspace'] === 'correct' && incorrectCharCount.value && (eventType !== 'Backspace' && eventType !== 'deleteContentBackward')
    }

    const returnFromCapsLockEvent = () => {
        if (isMobile()) return false

        if (!settings.value['capslock']) {
            if (event.getModifierState('CapsLock') && eventData !== 'CapsLock') {
                if (!toggleCapsToast.value) toggleCapsToast.value = true
                return true
            }

            if (eventData === 'CapsLock') {
                if (e.getModifierState('CapsLock')) toggleCapsToast.value = true
                else toggleCapsToast.value = false
                return true
            }
        }
    }

    const invalidBackspaceEvent = () => {
        let noError = !settings.value['backspace'] || !incorrectCharCount.value || !playerInputLength.value
        return (eventType === 'Backspace' || eventType === 'deleteContentBackward') && noError
    }

    const invaLidEnterEvent = () => {   
        return eventData === 'Enter' && !enterKey.value
    }

    if (
        returnOnWrongInput() || 
        invalidBackspaceEvent() ||
        invaLidEnterEvent() ||
        returnFromCapsLockEvent()
    ) return

    if (eventData === 'Enter' || eventData === ' ') {
        event.preventDefault()
        value.value = ' '
    }

    if (eventType === 'Backspace' || eventType === 'deleteContentBackward') {      
        event.preventDefault()
        backspaceIsPressed.value = true
        value.value = 'delete'
    }
    
    else backspaceIsPressed.value = false
 
    if (eventData.length === 1 && eventData !== 'Dead' && eventData !== ' ') {
        value.value = eventData
    }

    const startTimer = () => {
        if (settings.value['countdown']) {
            beatCountdown.value = false
            beginCountdown.value = true
        }
        startTime.value = performance.now();
    }

    if (!playerInputLength.value && value.value && !beginCountdown.value) {
        startTimer() 
        beginTest.value = true
    }

    return value.value
}