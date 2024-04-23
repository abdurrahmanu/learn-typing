import { ref } from 'vue'
import { englishWords } from '../../data/englishWords.js';
import { useCustomizeFormat } from './customizers/useCustomizeFormat';

export function  UseGetQuotes (config, customText) {
    const res = ref('')
    const {mostUsed, mediumUsed, rarelyUsed, numbers, quotesWithoutAuthors} = englishWords()

    function generateText(length) {
        if (config['test-type'] === 'quotes') {
            if (customText) {
                let quotes = [...customText, ...quotesWithoutAuthors.value.ten, ...quotesWithoutAuthors.value.twenty, ...quotesWithoutAuthors.value.thirty, ...quotesWithoutAuthors.value.fourty]
                let quote = ref(quotes[Math.floor(Math.random() * quotes.length)])
                res.value = quote.value
                return
            }

            else {
                if (config['text-length'] === 10) {
                    let quotes = [...quotesWithoutAuthors.value.ten]
                    let quote = ref(quotes[Math.floor(Math.random() * quotes.length)])
                    res.value = quote.value
                    return
                } 
                
                else if (config['text-length'] === 20) {
                    let quotes = [...quotesWithoutAuthors.value.twenty]
                    let quote = ref(quotes[Math.floor(Math.random() * quotes.length)])
                    res.value = quote.value
                    return
                } 
                
                else if (config['text-length'] === 30) {
                    let quotes = [...quotesWithoutAuthors.value.thirty]
                    let quote = ref(quotes[Math.floor(Math.random() * quotes.length)])
                    res.value = quote.value
                    return
                } 
                
                else if  (config['text-length'] === 40) {
                    let quotes = [...quotesWithoutAuthors.value.fourty]
                    let quote = ref(quotes[Math.floor(Math.random() * quotes.length)])
                    res.value = quote.value
                    return
                }

                else {
                    let quotes = [...quotesWithoutAuthors.value.ten, ...quotesWithoutAuthors.value.twenty, ...quotesWithoutAuthors.value.thirty, ...quotesWithoutAuthors.value.fourty]
                    let quote = ref(quotes[Math.floor(Math.random() * quotes.length)])
                    res.value = quote.value
                }
            }
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
                if (config['include-numbers'] === 'numbers') {
                    if (config['words-type'] === 'most-used') words.value = [...mostUsed, ...numbers]
                    if (config['words-type'] === 'less-used') words.value = [...mediumUsed, ...numbers]
                    if (config['words-type'] === 'rarely-used') words.value =  [...rarelyUsed, ...numbers]
                }
                else {                
                    if (config['words-type'] === 'most-used') words.value = mostUsed
                    if (config['words-type'] === 'less-used') words.value = [...mediumUsed, ...mostUsed]
                    if (config['words-type'] === 'rarely-used') words.value = [...rarelyUsed, ...mostUsed, ...mediumUsed]
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
        res.value = useCustomizeFormat([config['include-numbers'], config['include-punctuations'], config['include-caps'], config['all-caps'], config['custom-camel-case'], config['no-space'], config['test-type']],  res.value).customizeFormatRes.value
    }

    // generate text with new config and customize
    if (config['text-length'] !== 'auto') generateText(+config['text-length'])
    else  generateText()
    customize()

    return { res }
};
