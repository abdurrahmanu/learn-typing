import { mainStore } from "../store/mainStore"
import { countdownStore } from "../store/countdownStore"
import {customizeStore} from '../store/customizeStore'
import {getAlphabets} from './getAlphabets'
import { storeToRefs } from "pinia"
import { getQuotes } from "./getQuotes"

export const generateTest = async (config, restart) => {
    const store = mainStore()
    const {containerText, storedTest, movie, authoredQuote, allSpacesIndex} = storeToRefs(store)

    const count = countdownStore()
    const {textLength} = storeToRefs(count)

    const customize = customizeStore()
    const {repeat, customizers } = storeToRefs(customize)

    if (repeat.value || restart ) containerText.value = storedTest.value

    else if (customizers.value['modes'] === 'word-test') {
        await getQuotes(config).then( quote => {
            if (typeof quote === 'object') {  
                if (!quote[2]) {
                    containerText.value = quote[1]
                    authoredQuote.value = {
                        author: quote[0]
                    }
                }
                else {
                    containerText.value = quote[2]
                    movie.value = {
                        name : quote[0],
                        quoteAuthor: quote[1]
                    }
                }
            } 
            else {
                movie.value = {}
                authoredQuote.value = {}
                containerText.value = quote
                }
        })
    }

    else if (customizers.value['modes'] === 'alphabet-test') containerText.value = getAlphabets()

    for (let index = 0; index < containerText.value.length; index++) {
        if (containerText.value[index] === ' ') {
            allSpacesIndex.value.push(index)
        }
    }

    if (customizers.value['double-words'] && allSpacesIndex.value.length) {
        let text = containerText.value
        containerText.value = ''
        for (let index = 0; index < allSpacesIndex.value.length - 1; index++) {
            if (index === 0) {
                containerText.value += text.slice(0, allSpacesIndex.value[index]) + ' ' + text.slice(0, allSpacesIndex.value[index])
            } else if (index !== allSpacesIndex.value.length - 1) {
                containerText.value += text.slice(allSpacesIndex.value[index - 1], allSpacesIndex.value[index])  + text.slice(allSpacesIndex.value[index - 1], allSpacesIndex.value[index])
            } else {
                containerText.value += text.slice(0, allSpacesIndex.value[index]) + ' ' + text.slice(0, allSpacesIndex.value[index])
            }
        }

        allSpacesIndex.value = []
        for (let index = 0; index < containerText.value.length; index++) {
            if (containerText.value[index] === ' ') allSpacesIndex.value.push(index)
        }
    }

    storedTest.value = containerText.value
    textLength.value = containerText.value.length
}
