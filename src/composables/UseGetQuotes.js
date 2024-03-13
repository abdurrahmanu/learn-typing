import { ref } from 'vue'
import { quotes } from '../../data/quotes.js'
import { englishWords } from '../../data/englishWords.js';
import { useCustomizeWords } from './customizers/useCustomizeWords';
import { useCustomizeFormat } from './customizers/useCustomizeFormat';

export function  UseGetQuotes (config) {
    const res = ref('');
    const { data } = quotes()
    const {mostUsed, mediumUsed, rarelyUsed} = englishWords()

    function generateText(length) {
        if (config[2] === 'quotes') {
            let quote = ref(data[Math.floor(Math.random() * data.length)])
    
            while (quoteLength(quote.value) < length) {
                quote.value = quoteLength(data[Math.floor(Math.random() * data.length)])
            }

            res.value = quote.value
        }

        else {
            const words = ref('')
            if (config[1] === 'most-used') words.value = mostUsed
            if (config[1] === 'seldom-used') words.value = mediumUsed
            if (config[1] === 'rarely-used') words.value = rarelyUsed

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

    function quoteLength(quote) {
        let count = ref(0)

        for (let index = 0; index < quote.length; index++) {
            if (quote[index] === ' ') {
                count.value++
            }
        }

        return count.value - 1
    }


    function customize () {
        let text = res.value
        res.value = useCustomizeWords([config[1], config[4], config[5]]).res.value
        res.value = useCustomizeFormat([config[2], config[3]], text).res.value
    }

    // generate text with new config and customize
    if (config !== undefined) {
        if (config[0] !== 'auto') generateText(+config[0].slice(0, -1))
        else  generateText()
        customize()
    }

    return { res }
};
