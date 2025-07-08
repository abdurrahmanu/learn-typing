import { mainStore } from "../store/mainStore"
import { storeToRefs } from 'pinia';
import {correctWrongCountStore} from '../store/correctWrongCountStore'
import { timerStore } from "../store/timerStore";
import { typingStateStore } from "../store/typingStateStore";
import { customizeStore } from "../store/customizeStore";

export const managePlayerInput = () => {
    const typingstatestore = typingStateStore()
    const { playerInput, playerInputLength, playerLastInput} = storeToRefs(typingstatestore)

    const timerstore = timerStore()
    const {characterEqualityArray, beatCountdown, beginCountdown, startTime} = storeToRefs(timerstore)

    const correctWrongCountstore = correctWrongCountStore()
    const {correctCount, wrongCount} = storeToRefs(correctWrongCountstore)

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

    if (playerInputLength.value === 1) startTimer() 
    
    if (playerLastInput.value === containerText.value[playerInput.value.length - 1]) correctCount.value ++
    else wrongCount.value++

    characterEqualityArray.value.push(playerInput.value[playerInput.value.length - 1] === containerText.value[playerInput.value.length - 1])

    if (playerInputLength.value === containerText.value.length) {
        if (customizers.value['timer']) beatCountdown.value = true
        hasCompletedSession.value = true
    }
}















