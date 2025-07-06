import { mainStore } from "../store/mainStore"
import { isTouchScreenDevice } from "./isTouchScreenDevice";
import { storeToRefs } from 'pinia';
import {correctWrongCountStore} from '../store/correctWrongCountStore'
import { timerStore } from "../store/timerStore";
import { typingStateStore } from "../store/typingStateStore";

export const managePlayerInput = () => {
    const typingstatestore = typingStateStore()
    const {completionLevel, playerInput, playerInputLength, playerLastInput, previousPlayerInput} = storeToRefs(typingstatestore)

    const timerstore = timerStore()
    const {characterEqualityArray} = storeToRefs(timerstore)

    const correctWrongCountstore = correctWrongCountStore()
    const {correctCount, wrongCount} = storeToRefs(correctWrongCountstore)
    
    const mainstore = mainStore()
    const { containerText, route, zzz} = storeToRefs(mainstore)
    
    if (route.value !== 'home') return
    if (isTouchScreenDevice()) playerLastInput.value = playerInput.value[playerInput.value.length - 1]

    if (containerText.value) {
        if (previousPlayerInput.value.length > playerInput.value.length) {
            if (containerText.value[previousPlayerInput.value.length - 1] === previousPlayerInput.value[previousPlayerInput.value.length - 1]) correctCount.value--
            else wrongCount.value--
        }
        else {
            if (isTouchScreenDevice()) {
                if (playerInput.value[playerInput.value.length - 1] === containerText.value[playerInput.value.length - 1]) correctCount.value ++
                else {
                    wrongCount.value++
                }
            }
            else {
                if (playerLastInput.value === containerText.value[playerInput.value.length - 1]) correctCount.value ++
                else {
                    wrongCount.value++
                }
            }
        }

        characterEqualityArray.value.push(playerInput.value[playerInput.value.length - 1] === containerText.value[playerInput.value.length - 1])
    }

    
    playerInputLength.value = playerInput.value.length
    completionLevel.value = ((playerInputLength.value) / containerText.value.length) * 100 
    zzz.value = true
}
























