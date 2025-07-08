import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';
import { correctWrongCountStore } from "../store/correctWrongCountStore";
import { typingStateStore } from "../store/typingStateStore";

export default function inputEvent (e) {
    const typingstatestore = typingStateStore()
    const {playerInputLength, backspaceIsPressed, enterKey} = storeToRefs(typingstatestore)
    
    const correctWrongCountstore = correctWrongCountStore()
    const {wrongCount} = storeToRefs(correctWrongCountstore)
    
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
            if (!backspace.value || !wrongCount.value || !playerInputLength.value) return true
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

    if ((e.key === 'Enter' && enterKey.value) || e.key === ' ') {
        if (e.key === ' ') e.preventDefault()
        return ' '
    }

    if (e.key === 'Backspace') {        
        backspaceIsPressed.value = true
        return 'delete'
    }
    
    else backspaceIsPressed.value = false
 
    if (e.key.length === 1 && e.key !== 'Dead' && e.key !== ' ') {
        return eventSelector
    }
}