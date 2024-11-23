import { mainStore } from "../store/mainStore"
import { countdownStore } from "../store/countdownStore"
import {customizeStore} from '../store/customizeStore'
import {alphabetsMode} from './alphabetsMode'
import { storeToRefs } from "pinia"
import { UseGetQuotes } from "./UseGetQuotes"

export const generateTest = async (config, restart) => {
    const main = mainStore()
    const {containerText, storedTest, movie, authoredQuote, allSpacesIndex} = storeToRefs(main)

    const count = countdownStore()
    const {textLength} = storeToRefs(count)

    const customize = customizeStore()
    const {repeat, mode, doubleEachWord } = storeToRefs(customize)

    if (repeat.value || restart ) {
        containerText.value = storedTest.value
    }

    else if (mode.value === 'auto') {
        await UseGetQuotes(config).then( quote => {
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

    else if (mode.value === 'alphabets') containerText.value = alphabetsMode()

    for (let index = 0; index < containerText.value.length; index++) {
        if (containerText.value[index] === ' ') allSpacesIndex.value.push(index)
    }

    if (doubleEachWord.value && allSpacesIndex.value.length) {
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
