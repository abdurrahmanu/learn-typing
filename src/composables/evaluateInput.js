import { typingStateStore } from "../store/typingStateStore";
import { mainStore } from "../store/mainStore";
import { storeToRefs } from "pinia";
import { characterStore } from "../store/characterStore";
import { timerStore } from "../store/timerStore";
import { customizeStore } from "../store/customizeStore";

export default function evaluateInput(value) {    
    const characterstore = characterStore()
    const {correctCharCount, incorrectCharCount} = storeToRefs(characterstore)

    const customizestore = customizeStore()
    const {toggleCustomTestModal} = storeToRefs(customizestore)

    const typingstatestore = typingStateStore()
    const {playerInput, deletedValue, playerInputLength, backspaceIsPressed, playerLastInput} = storeToRefs(typingstatestore)

    const mainstore = mainStore()
    const {currentTest} = storeToRefs(mainstore)

    const {test} = currentTest.value

    const timerstore = timerStore()
    const { characterEqualityArray} = storeToRefs(timerstore)

    if (toggleCustomTestModal.value) return // temporary --------- will fix later

    if (value === 'delete') {
        deletedValue.value = playerInput.value.slice(-1);
        playerInput.value = playerInput.value.slice(0, -1);
    } else {
        playerInput.value += value;
    }

    if (backspaceIsPressed.value) {
        let equality = deletedValue.value === test[playerInputLength.value]
        if (equality) correctCharCount.value--
        else incorrectCharCount.value--

        characterEqualityArray.value.push(equality)
    } 
    
    else {
        let equality = playerLastInput.value === test[playerInputLength.value - 1]
        if (equality) correctCharCount.value++
        else incorrectCharCount.value++

        characterEqualityArray.value.push(equality)
    }
}