import { mainStore } from "../store/mainStore"
import { storeToRefs } from "pinia"
import { UseGetQuotes } from "./UseGetQuotes"
import {alphabetsMode} from './alphabetsMode'

export const generateTest = async (config, restart) => {
    const main = mainStore()
    const {containerText, storedTextForRepeat, movie, authoredQuote, enableRepeat, mode} = storeToRefs(main)

    if (enableRepeat.value || restart ) {
        containerText.value = storedTextForRepeat.value
        }

    else if (mode.value === 'auto') {
        await UseGetQuotes(config).then( quote => {
            if (typeof quote === 'object') {  
                if (!quote[2]) {
                    containerText.value = quote[1]
                    console.log(containerText.value);
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
    
    storedTextForRepeat.value = containerText.value
}
