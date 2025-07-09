import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';
import { correctWrongCountStore } from "../store/correctWrongCountStore";
import { typingStateStore } from "../store/typingStateStore";
import { isMobile } from "./isMobile";

export default function inputEvent (event) {
    const typingstatestore = typingStateStore()
    const {playerInputLength, backspaceIsPressed, enterKey, z} = storeToRefs(typingstatestore)

    const correctWrongCountstore = correctWrongCountStore()
    const {wrongCount} = storeToRefs(correctWrongCountstore)
    
    const customize = customizeStore()
    const {backspace, toggleCapsToast, customizers} = storeToRefs(customize)

    const eventData = event.key || event.data
    const eventType  = event.key || event.inputType

    const returnOnWrongInput = () => {
        return customizers.value['stop-on-error'] && wrongCount.value && (eventType !== 'Backspace' || eventType !== 'deleteContentBackward')
    }

    const returnFromCapsLockEvent = () => {
        if (isMobile()) return false

        if (!customizers.value['capslock']) {
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
        let noError = !backspace.value || !wrongCount.value || !playerInputLength.value
        z.value = (eventType === 'Backspace' || eventType === 'deleteContentBackward') && noError
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
        return ' '
    }

    if (eventType === 'Backspace' || eventType === 'deleteContentBackward') {      
        z.value += 't'  
        event.preventDefault()
        backspaceIsPressed.value = true
        return 'delete'
    }
    
    else backspaceIsPressed.value = false
 
    if (eventData.length === 1 && eventData !== 'Dead' && eventData !== ' ') {
        return eventData
    }
}