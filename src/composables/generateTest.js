import { mainStore } from "../store/mainStore"
import { countdownStore } from "../store/countdownStore"
import { customizeStore } from '../store/customizeStore'
import { getAlphabets } from './getAlphabets'
import { storeToRefs } from "pinia"
import { getTest } from "./getTest"

export const generateTest = async () => {
    const store = mainStore()
    const {currentTest, storedTest, allSpacesIndex} = storeToRefs(store)
    
    const count = countdownStore()
    const {textLength} = storeToRefs(count)
    
    const customize = customizeStore()
    const {repeat, customizers } = storeToRefs(customize)

    if (repeat.value) {
        currentTest.value = ''
        currentTest.value = storedTest.value
    }

    else {
        const mode = customizers.value['modes']

        if (mode === 'word-test') {
            let test = await getTest()
            currentTest.value = test['test']
        }

        else currentTest.value = getAlphabets()
    }

    for (let index = 0; index < currentTest.value.length; index++) {
        if (currentTest.value[index] === ' ') {
            allSpacesIndex.value.push(index)
        }
    }

    if (customizers.value['double-words'] && allSpacesIndex.value.length) {
        let text = currentTest.value
        currentTest.value = ''

        for (let index = 0; index < Math.ceil(allSpacesIndex.value.length / 2); index++) {
            let word = text.slice(allSpacesIndex.value[index - 1], allSpacesIndex.value[index])
            let firstWordSpace = (index === 0 ? ' ' : '') 

            currentTest.value += word + firstWordSpace + word
        }

        allSpacesIndex.value = []
        for (let index = 0; index < currentTest.value.length; index++) {
            if (currentTest.value[index] === ' ') allSpacesIndex.value.push(index)
        }
    }

    storedTest.value = currentTest.value
    textLength.value = currentTest.value.length
}





