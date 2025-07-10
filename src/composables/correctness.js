import { typingStateStore } from "../store/typingStateStore"
import { charCountStore } from "../store/charCountStore"
import { timerStore } from "../store/timerStore"
import { mainStore } from "../store/mainStore"
import { storeToRefs } from "pinia"
import {ref} from 'vue'

export default function correctness () {
    const typingstatestore = typingStateStore()
    const { playerInputLength, playerLastInput, backspaceIsPressed} = storeToRefs(typingstatestore)

    const charcountstore = charCountStore()
    const {correctCharCount, incorrectCharCount} = storeToRefs(charcountstore)

    const timerstore = timerStore()
    const {characterEqualityArray} = storeToRefs(timerstore)

    const mainstore = mainStore()
    const { containerText} = storeToRefs(mainstore)


    const equality = ref(playerLastInput.value === containerText.value[playerInputLength.value - 1])
        
    if (backspaceIsPressed.value) {
        if (equality.value) correctCharCount.value--
        else incorrectCharCount.value--
    }

    else {
        if (equality.value) correctCharCount.value++
        else incorrectCharCount.value++
    }

    characterEqualityArray.value.push(equality.value)
}