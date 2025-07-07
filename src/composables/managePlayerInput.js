import { mainStore } from "../store/mainStore"
import { storeToRefs } from 'pinia';
import {correctWrongCountStore} from '../store/correctWrongCountStore'
import { timerStore } from "../store/timerStore";
import { typingStateStore } from "../store/typingStateStore";

export const managePlayerInput = () => {
    const typingstatestore = typingStateStore()
    const { playerInput, playerInputLength, playerLastInput} = storeToRefs(typingstatestore)

    const timerstore = timerStore()
    const {characterEqualityArray} = storeToRefs(timerstore)

    const correctWrongCountstore = correctWrongCountStore()
    const {correctCount, wrongCount} = storeToRefs(correctWrongCountstore)
    
    const mainstore = mainStore()
    const { containerText} = storeToRefs(mainstore)
    
    if (playerLastInput.value === containerText.value[playerInput.value.length - 1]) correctCount.value ++
    else wrongCount.value++

    characterEqualityArray.value.push(playerInput.value[playerInput.value.length - 1] === containerText.value[playerInput.value.length - 1])
    playerInputLength.value = playerInput.value.length
}























