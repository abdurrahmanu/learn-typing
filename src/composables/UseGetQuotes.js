import { ref } from 'vue'
import { englishWords } from '../../data/englishWords.js';
import { useCustomizeFormat } from './customizers/useCustomizeFormat';

export function  UseGetQuotes (config, customText) {
    const res = ref('')
    const {mostUsed, mediumUsed, rarelyUsed, numbers, wiseQuotes, quotesWithoutAuthors} = englishWords()

    function generateText(length) {
        if (config[2] === 'quotes') {
            if (customText) {
                console.log('object');
                let quotes = [...customText, ...wiseQuotes, ...quotesWithoutAuthors]
                let quote = ref(quotes[Math.floor(Math.random() * quotes.length)])
                res.value = quote.value
                return
            }
            let quotes = [...wiseQuotes, ...quotesWithoutAuthors]
            let quote = ref(quotes[Math.floor(Math.random() * quotes.length)])
            res.value = quote.value
        }
        
        else {
            const words = ref([])
            let choice = Math.round(Math.random() * 1000)

            if ( customText && (choice % 2 === 0 && choice < 320)) {
                words.value = [...customText]
                let length = words.value.length - 1
                let index = Math.round(Math.random() * length)
                res.value = words.value[index]
            }
            else {
                if (config[5] === 'numbers') {
                    if (config[1] === 'most-used') words.value = [...mostUsed, ...numbers]
                    if (config[1] === 'less-used') words.value = [...mediumUsed, ...numbers]
                    if (config[1] === 'rarely-used') words.value =  [...rarelyUsed, ...numbers]
                }
                else {                

                    if (config[1] === 'most-used') words.value = mostUsed
                    if (config[1] === 'less-used') words.value = [...mediumUsed, ...mostUsed]
                    if (config[1] === 'rarely-used') words.value = [...rarelyUsed, ...mostUsed, ...mediumUsed]
                }
    
                if (length) {
                    for (let index = 0; index < length; index++) {
                        if (index == 0) {
                            res.value += words.value[Math.round(Math.random() * words.value.length)]
                        } else {
                                res.value += ' ' + words.value[Math.round(Math.random() * words.value.length)]
                        }
                    }
                }
                else {
                    for (let index = 0; index < Math.round(Math.random() * 40) + 10; index++) {
                        if (index == 0) {
                            res.value += words.value[Math.round(Math.random() * words.value.length)]
                        } else {
                                res.value += ' ' + words.value[Math.round(Math.random() * words.value.length)]
                        }
                    }
                }
            }
        }
    }

    function customize () {
        res.value = useCustomizeFormat([config[3], config[4], config[5]], res.value).customizeFormatRes.value
    }

    // generate text with new config and customize
    if (config[0] !== 'auto') generateText(+config[0])
    else  generateText()
    customize()
    
    return { res }
};
