import { mainStore } from "../store/mainStore"
import { getMobileOS } from "./getMobileOS";
import { storeToRefs } from 'pinia';

export const managePlayerInput = () => {

    const store = mainStore()
    const { containerText, playerInputLength, playerInput, playerLastInput, previousPlayerInput, correctCount, wrongCount, completionLevel} = storeToRefs(store)

    if (getMobileOS()) playerLastInput.value = playerInput.value[playerInput.value.length - 1]

    if (!playerInput.value) {
        if (previousPlayerInput.value === containerText.value[0]) correctCount.value--
        else wrongCount.value--
    }
    else {
        if (previousPlayerInput.value.length > playerInput.value.length) {
            if (containerText.value[previousPlayerInput.value.length - 1] === previousPlayerInput.value[previousPlayerInput.value.length - 1]) correctCount.value--
            else wrongCount.value--
        }
        else {
            if (getMobileOS()) {
                if (playerInput.value[playerInput.value.length - 1] === containerText.value[playerInput.value.length - 1]) {
                    correctCount.value ++
                }
                else {
                    wrongCount.value++
                }
            } else {
                if (playerLastInput.value === containerText.value[playerInput.value.length - 1]) {
                    correctCount.value ++
                }
                else {
                    wrongCount.value++
                }
            }
        }
    }

    playerInputLength.value = playerInput.value.length
    completionLevel.value = ((playerInputLength.value) / containerText.value.length) * 100     
}