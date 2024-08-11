import { mainStore } from "../store/mainStore"
import { countdownStore } from "../store/countdownStore"
import {customizeStore} from '../store/customizeStore'
import { storeToRefs } from "pinia"
import { UseGetQuotes } from "./UseGetQuotes"
import {alphabetsMode} from './alphabetsMode'

export const generateTest = async (config, restart) => {
    const main = mainStore()
    const {containerText, storedTest, timedTyping, movie, authoredQuote, savedCountdown, allSpacesIndex} = storeToRefs(main)

    const count = countdownStore()
    const {countdown} = storeToRefs(count)

    const customize = customizeStore()
    const {repeat, mode} = storeToRefs(customize)

    if (timedTyping.value) countdown.value = savedCountdown.value

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

    else if (mode.value === 'alphabets') {
        containerText.value = alphabetsMode()
    }
    
    for (let index = 0; index < containerText.value.length; index++) {
        if (containerText.value[index] === ' ') allSpacesIndex.value.push(index)
    }

    storedTest.value = containerText.value
}
