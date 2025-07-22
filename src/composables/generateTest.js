import { mainStore } from "../store/mainStore"
import { countdownStore } from "../store/countdownStore"
import { customizeStore } from '../store/customizeStore'
import { getAlphabets } from './getAlphabets'
import { storeToRefs } from "pinia"
import { getTest } from "./getTest"
import { computed } from "vue"

export const generateTest = async () => {
    const store = mainStore()
    const {currentTest, storedTest, allSpacesIndex} = storeToRefs(store)

    const test = computed(() => {
        return currentTest.value.test
    })
    
    const count = countdownStore()
    const {textLength} = storeToRefs(count)
    
    const customize = customizeStore()
    const {repeat, customizers} = storeToRefs(customize)

    if (repeat.value) {
        currentTest.value = {name: '', author: '', value: ''}
        currentTest.value.test = storedTest.value
    }

    else {
        const mode = customizers.value['modes']

        if (mode === 'word-test') {
            currentTest.value.test = ''
            currentTest.value = await getTest()
        }

        else currentTest.value.test = getAlphabets()
    }

    for (let index = 0; index < test.value.length; index++) {
        if (test.value[index] === ' ') {
            allSpacesIndex.value.push(index)
        }
    }

    if (customizers.value['double-words'] && allSpacesIndex.value.length) {
        let text = ''

        for (let index = 0; index < Math.ceil(allSpacesIndex.value.length / 2); index++) {
            let word = text.slice(allSpacesIndex.value[index - 1], allSpacesIndex.value[index])
            let firstWordSpace = (index === 0 ? ' ' : '') 

            text += word + firstWordSpace + word
        }

        allSpacesIndex.value = []

        for (let index = 0; index < test.value.length; index++) {
            if (text[index] === ' ') allSpacesIndex.value.push(index)
        }

        currentTest.value.test = text
    }

    storedTest.value = currentTest.value
    textLength.value = currentTest.value.length
}





