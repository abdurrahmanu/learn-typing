import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';
import { correctWrongCountStore } from "../store/correctWrongCountStore";
import { typingStateStore } from "../store/typingStateStore";
import { isMobile } from "./isMobile";

export default function inputEvent (event) {
    const typingstatestore = typingStateStore()
    const {playerInputLength, backspaceIsPressed, enterKey} = storeToRefs(typingstatestore)

    const correctWrongCountstore = correctWrongCountStore()
    const {wrongCount} = storeToRefs(correctWrongCountstore)
    
    const customize = customizeStore()
    const {backspace, pauseTyping, toggleCapsToast, customizers} = storeToRefs(customize)

    const eventType = event.key || event.data
    const eventForm  = event.key || event.inputType

    const returnOnWrongInput = () => {
        return customizers.value['stop-on-error'] && wrongCount.value && (eventForm !== 'Backspace' || eventForm !== 'deleteContentBackward')
    }

    const returnFromCapsLockEvent = () => {
        if (isMobile()) return false

        if (!customizers.value['capslock']) {
            if (event.getModifierState('CapsLock') && eventType !== 'CapsLock') {
                if (!toggleCapsToast.value) toggleCapsToast.value = true
                return true
            }

            if (eventType === 'CapsLock') {
                if (e.getModifierState('CapsLock')) toggleCapsToast.value = true
                else toggleCapsToast.value = false
                return true
            }
        }
    }

    const invalidBackspaceEvent = () => {
        let noError = !backspace.value || !wrongCount.value || !playerInputLength.value
        return (eventForm === 'Backspace' || eventForm === 'deleteContentBackward') && noError
    }

    const invaLidEnterEvent = () => {   
        return eventType === 'Enter' && !enterKey.value
    }

    if (
        pauseTyping.value ||
        returnOnWrongInput() || 
        invalidBackspaceEvent() ||
        invaLidEnterEvent() ||
        returnFromCapsLockEvent()
    ) return

    if (eventType === 'Enter' || eventType === ' ') {
        event.preventDefault()
        return ' '
    }

    if ((eventForm === 'Backspace' || eventForm === 'deleteContentBackward')) {        
        backspaceIsPressed.value = true
        return 'delete'
    }
    
    else backspaceIsPressed.value = false
 
    if (eventType.length === 1 && eventType !== 'Dead' && eventType !== ' ') {
        return eventType
    }
}