import { ref } from 'vue'
import { englishWords } from '../../data/englishWords.js';
import { useCustomizeFormat } from './customizers/useCustomizeFormat';
import { customizeStore } from '../store/customizeStore.js';
import authoredQuotes from '../../data/quotes.json'

export function  UseGetQuotes (config, customText) {
    const res = ref('')
    const {mostUsed, mediumUsed, rarelyUsed, numbers, quotesWithoutAuthors, movieQuotes} = englishWords()
    
    function generateText(length) {
        if (config['test-type'] === 'quotes') {
            if (customText) {
                let quotes = [...customText, ...quotesWithoutAuthors.value.ten, ...quotesWithoutAuthors.value.twenty, ...quotesWithoutAuthors.value.thirty, ...quotesWithoutAuthors.value.fourty]
                let quote = ref(quotes[Math.ceil(Math.random() * quotes.length) - 1])
                res.value = quote.value
                return
            }
            else {
                if (config['text-length'] === 10) {
                    let quotes = [...quotesWithoutAuthors.value.ten]
                    let quote = ref(quotes[Math.ceil(Math.random() * quotes.length) - 1])
                    res.value = quote.value
                    return
                } 
                
                else if (config['text-length'] === 20) {
                    let quotes = [...quotesWithoutAuthors.value.twenty]
                    let quote = ref(quotes[Math.ceil(Math.random() * quotes.length) - 1])
                    res.value = quote.value
                    return
                } 
                
                else if (config['text-length'] === 30) {
                    let quotes = [...quotesWithoutAuthors.value.thirty]
                    let quote = ref(quotes[Math.ceil(Math.random() * quotes.length) - 1])
                    res.value = quote.value
                    return
                } 
                
                else if  (config['text-length'] === 40) {
                    let quotes = [...quotesWithoutAuthors.value.fourty]
                    let quote = ref(quotes[Math.ceil(Math.random() * quotes.length) - 1])
                    res.value = quote.value
                    return
                }
                else {
                    let choice = Math.round(Math.random() * 1)
                    let quotes = [...quotesWithoutAuthors.value.ten, ...quotesWithoutAuthors.value.twenty, ...quotesWithoutAuthors.value.thirty, ...quotesWithoutAuthors.value.fourty]
                    let quote = ref(quotes[Math.ceil(Math.random() * quotes.length) - 1])
                    res.value = quote.value

                    if (config['author-quotes']) {
                        let quoteIndex = Math.ceil(Math.random() * authoredQuotes.length)  - 1
                        let quote = authoredQuotes[quoteIndex]

                        if (customizeStore().onlyAuthoredQuotes) {
                            res.value = [quote.author, quote.quote]
                        } else {
                            if (choice) res.value = [quote.author, quote.quote]
                        }
                    }

                    if (config['movie-quotes']) {
                        let movies = [
                            movieQuotes['The Hobbit'].quotes,
                            movieQuotes['Pirates of the Caribbean'].quotes,
                            movieQuotes['Harry Potter'].quotes,
                            movieQuotes['The Lord of the Rings'].quotes,
                            movieQuotes['Legend of the Seeker'].quotes,
                            movieQuotes['Star Wars'].quotes,
                            movieQuotes['Indiana Jones and the Raiders of the Lost Ark'].quotes,
                            movieQuotes['Jurassic Park'].quotes,
                        ]
                        let movieIndex = Math.ceil(Math.random() * movies.length) - 1
                        let movieName = Object.keys(movieQuotes)[movieIndex]
                        let quotes = movies[movieIndex]
                        let quoteIndex = Math.ceil(Math.random() * quotes.length)  - 1
                        let quote = quotes[quoteIndex]

                        if (customizeStore().onlyMovieQuotes) {
                            res.value = [movieName, quote.author, quote.quote]
                        } else {
                            if (choice) res.value = [movieName, quote.author, quote.quote]
                        }
                    }
                }
            }
        }
        else {
            const words = ref([])
            let ChooseBetweenCustomAndSystemText = Math.round(Math.random() * 1000)
            if ( customText && (ChooseBetweenCustomAndSystemText % 2 === 0 && ChooseBetweenCustomAndSystemText < 320)) {
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
                    if (config['words-type'] === 'most-used') words.value = [...mostUsed]
                    if (config['words-type'] === 'less-used') words.value = [...mediumUsed, ...mostUsed]
                    if (config['words-type'] === 'rarely-used') words.value = [...rarelyUsed, ...mostUsed, ...mediumUsed]
                }
    
                if (length) {
                    for (let index = 0; index < length; index++) {
                        if (index == 0) {
                            let random = Math.ceil(Math.random() * words.value.length) - 1
                            let word = words.value[random]               
                            res.value += word
                        } else {
                            let random = Math.ceil(Math.random() * words.value.length) - 1
                            let word = words.value[random]
                            res.value += ' ' + word
                        }
                    }
                }
                else {
                    for (let index = 0; index < Math.round(Math.random() * 40) + 10; index++) {
                        if (index == 0) {
                            res.value += words.value[Math.ceil(Math.random() * words.value.length) - 1]
                        } else {
                                res.value += ' ' + words.value[Math.ceil(Math.random() * words.value.length) - 1]
                        }
                    }
                }
            }
        }
    }

    function customizers () {
        if (typeof res.value === 'object') {
            if (customizeStore().customizers['author-quotes']) {
                res.value = [res.value[0], useCustomizeFormat([config['include-numbers'], config['include-punctuations'], config['include-caps'], config['all-caps'], config['custom-camel-case'], config['no-space'], config['test-type']],  res.value[1]).customizeFormatRes.value]
            } 
            else if (customizeStore().customizers['movie-quotes']) {
                res.value = [res.value[0], res.value[1], useCustomizeFormat([config['include-numbers'], config['include-punctuations'], config['include-caps'], config['all-caps'], config['custom-camel-case'], config['no-space'], config['test-type']],  res.value[2]).customizeFormatRes.value]
            }
        } else {
            res.value = useCustomizeFormat([config['include-numbers'], config['include-punctuations'], config['include-caps'], config['all-caps'], config['custom-camel-case'], config['no-space'], config['test-type']],  res.value).customizeFormatRes.value
        }
    }

    // generate text with new config and customize
    if (config['text-length'] !== 'auto') generateText(+config['text-length'])
    else  generateText()
    customizers()

    return { res }
};
