import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { isTouchScreenDevice } from "./isTouchScreenDevice";
import { storeToRefs } from 'pinia';

export const managePlayerInput = () => {
    const store = mainStore()
    const { containerText, characterEqualityArray, playerInputLength, playerInput, route, playerLastInput, previousPlayerInput, correctCount, wrongCount, completionLevel} = storeToRefs(store)

    const customize = customizeStore()
    const {customizers, pauseTyping} = storeToRefs(customize)
    
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
}
























