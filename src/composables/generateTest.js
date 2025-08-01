import { mainStore } from "../store/mainStore"
import { settingsStore } from '../store/settingsStore'
import { storeToRefs } from "pinia"
import { getTest } from "./getTest"
import { computed } from "vue"

export const generateTest = async () => {
    const store = mainStore()
    const {currentTest, storedTest, allSpacesIndex} = storeToRefs(store)

    const test = computed(() => {
        return currentTest.value.test
    })

    const settingstore = settingsStore()
    const {settings} = storeToRefs(settingstore)

    currentTest.value.test = ''
    currentTest.value = await getTest()
    
    for (let index = 0; index < test.value.length; index++) {
        if (test.value[index] === ' ') {
            allSpacesIndex.value.push(index)
        }
    }

    if (settings.value['double-words'] && allSpacesIndex.value.length) {
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
}





