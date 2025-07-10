import { mainStore } from "../store/mainStore"
import { storeToRefs } from 'pinia';
import {charCountStore} from '../store/charCountStore'
import { timerStore } from "../store/timerStore";
import { typingStateStore } from "../store/typingStateStore";
import { customizeStore } from "../store/customizeStore";
import { ref } from 'vue';

export const evaluateInput = (char) => {
    const typingstatestore = typingStateStore()
    const { playerInputLength, playerLastInput, backspaceIsPressed} = storeToRefs(typingstatestore)

    const timerstore = timerStore()
    const {characterEqualityArray, beatCountdown, beginCountdown, startTime} = storeToRefs(timerstore)

    const charcountstore = charCountStore()
    const {correctCharCount, incorrectCharCount} = storeToRefs(charcountstore)

    const mainstore = mainStore()
    const { containerText, hasCompletedSession} = storeToRefs(mainstore)

    const customize = customizeStore()
    const {customizers} = storeToRefs(customize)

    const startTimer = () => {
        if (playerInputLength.value === 1)  {
            if (customizers.value['timer']) {
                beatCountdown.value = false
                beginCountdown.value = true
            }
            startTime.value = performance.now();
        } 
    }

    console.log(char)

    if (playerInputLength.value === 1 && !beginCountdown.value) startTimer() 
    
    const equality = ref(playerLastInput.value === containerText.value[playerInputLength.value - 1])
        
    // why does incorrectChar persist as 1 no matter how backspace is pressed ?
    // for last input, playerInput is already empty before function call, so the last incorrect input value is never evaluated as incorrect.

    if (backspaceIsPressed.value) {
        if (equality.value) correctCharCount.value--
        else incorrectCharCount.value--
    }

    else {
        if (equality.value) correctCharCount.value++
        else incorrectCharCount.value++
    }

    characterEqualityArray.value.push(equality.value)

    if (playerInputLength.value === containerText.value.length) {
        if (customizers.value['timer']) beatCountdown.value = true
        hasCompletedSession.value = true
    }
}













