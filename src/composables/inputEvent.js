import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';
import { charCountStore } from "../store/charCountStore";
import { typingStateStore } from "../store/typingStateStore";
import { isMobile } from "./isMobile";
import { evaluateInput } from "./evaluateInput";
import { ref } from "vue";

export default function inputEvent (event) {
    const value = ref('')

    const typingstatestore = typingStateStore()
    const {playerInputLength, backspaceIsPressed, enterKey, z} = storeToRefs(typingstatestore)

    const charcountstore = charCountStore()
    const {incorrectCharCount} = storeToRefs(charcountstore)
    
    const customize = customizeStore()
    const {backspace, toggleCapsToast, customizers} = storeToRefs(customize)

    const eventData = event.key || event.data
    const eventType  = event.key || event.inputType

    const returnOnWrongInput = () => {
        return customizers.value['stop-on-error'] && incorrectCharCount.value && (eventType !== 'Backspace' || eventType !== 'deleteContentBackward')
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
        let noError = !backspace.value || !incorrectCharCount.value || !playerInputLength.value
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
    
    return value.value
}