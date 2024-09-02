import { ref } from 'vue'
import { englishWords } from '../../data/englishWords.js';
import { useCustomizeFormat } from './useCustomizeFormat.js';
import { customizeStore } from '../store/customizeStore.js';
import { mainStore } from '../store/mainStore.js';
import authoredQuotes from '../../data/quotes.json'

export async function UseGetQuotes (config, customText) {
    const res = ref('')
    const isMovieQuote = ref(false)
    const isAuthoredQuote = ref(false)
    const {mostUsed, mediumUsed, rarelyUsed, numbers, quotesWithoutAuthors, movieQuotes} = englishWords()
    const movieQuotesAndAuthoredQuotes = config['movie-quotes'] && config['author-quotes']

    function generateTest(length) {
        if (config['test-type'] === 'quotes') {
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

            else if  (config['text-length'] > 30) {
                let quotes = [...quotesWithoutAuthors.value.fourty]
                let quote = ref(quotes[Math.ceil(Math.random() * quotes.length) - 1])
                res.value = quote.value
                return
            }

            else {
                let choice = movieQuotesAndAuthoredQuotes ? true : Math.round(Math.random() * 1)
                let quotes = [...quotesWithoutAuthors.value.ten, ...quotesWithoutAuthors.value.twenty, ...quotesWithoutAuthors.value.thirty, ...quotesWithoutAuthors.value.fourty]
                let quote = ref(quotes[Math.ceil(Math.random() * quotes.length) - 1])
                res.value = quote.value
                const authoredTest = ref()
                const movieTest = ref()
                const normalTest = ref(res.value)

                if (config['author-quotes']) {
                    let quoteIndex = Math.ceil(Math.random() * authoredQuotes.length)  - 1
                    let quote = authoredQuotes[quoteIndex]

                    if (customizeStore().onlyAuthoredQuotes) {
                        authoredTest.value = [quote.author, quote.quote]
                    } else {
                        if (choice) authoredTest.value = [quote.author, quote.quote]
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
                        movieTest.value = [movieName, quote.author, quote.quote]
                    } else {
                        if (choice) movieTest.value = [movieName, quote.author, quote.quote]
                    }
                }

                if (movieQuotesAndAuthoredQuotes) {
                    let choice = Math.ceil(Math.random() * 3) - 1
                    let tests = [movieTest.value, authoredTest.value, normalTest.value]
                    res.value = tests[choice]
                    choice === 0 ? isMovieQuote.value = true : choice === 1 ? isAuthoredQuote.value = true : ''

                } else {
                    res.value = authoredTest.value || movieTest.value || normalTest.value
                }
            }
        }

        else if (config['test-type'] === 'custom')  {
            // if (config['text-length'] === 10) {

            // }
            // if (config['text-length'] === 20) {

            // }
            // if (config['text-length'] === 30) {

            // }
            // if (config['text-length'] > 30) {

            // }

            if (customizeStore().selectedCustomTest) {
                res.value = mainStore().customTests[customizeStore().selectedCustomTest]
                customizeStore().selectedCustomTest = ''
            } else {
                let customTests = mainStore().customTests
                let quotes = Object.values(customTests)
                let quote = ref(quotes[Math.ceil(Math.random() * quotes.length) - 1])
                res.value = quote.value
            }
        }

        else {
            const words = ref([])
            let ChooseBetweenCustomAndSystemText = Math.round(Math.random() * 1000)
            if ( customText && (ChooseBetweenCustomAndSystemText % 2 === 0 && ChooseBetweenCustomAndSystemText < 320)) {
                words.value = [...customText]
                let length = words.value.length
                let index = Math.ceil(Math.random() * length) - 1
                res.value = words.value[index]
            }
            else {
                if (config['include-numbers'] === 'numbers') {
                    if (config['words-type'] === 'frequent') words.value = [...mostUsed, ...numbers]
                    if (config['words-type'] === 'common') words.value = [...mediumUsed, ...numbers]
                    if (config['words-type'] === 'rare') words.value =  [...rarelyUsed, ...numbers]
                }
                else {                
                    if (config['words-type'] === 'frequent') words.value = [...mostUsed]
                    if (config['words-type'] === 'common') words.value = [...mediumUsed, ...mostUsed]
                    if (config['words-type'] === 'rare') words.value = [...rarelyUsed, ...mostUsed, ...mediumUsed]
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
                    for (let index = 0; index < Math.round(Math.random() * 50) + 10; index++) {
                        if (index == 0) {
                            res.value += words.value[Math.ceil(Math.random() * words.value.length) - 1]
                        } else {
                                res.value += ' ' + words.value[Math.ceil(Math.random() * words.value.length) - 1]
                        }
                    }
                }
            }
        }

        // convert line break /\n/ to space character
        if (typeof res.value === 'string') {
            const temp = res.value
            res.value = ''
            for (let index = 0; index < temp.length; index++) {
                if (temp[index].match(/\n/)) res.value += ' '
                else res.value += temp[index]
            }
            res.value.trimStart()
            res.value.trimEnd()
        }
    }

    function customizers () {
        if (typeof res.value === 'object') {
            if (movieQuotesAndAuthoredQuotes) {
                isMovieQuote.value ? mainStore().authoredQuote = {} : isAuthoredQuote.value ? mainStore().movie = {} : ''
                if (res.value[2]) {
                    res.value = [res.value[0], res.value[1], useCustomizeFormat([config['include-numbers'], config['include-punctuations'], config['include-caps'], config['all-caps'], config['custom-camel-case'], config['no-space'], config['test-type']],  res.value[2]).res.value]
                } else {
                    res.value = [res.value[0], useCustomizeFormat([config['include-numbers'], config['include-punctuations'], config['include-caps'], config['all-caps'], config['custom-camel-case'], config['no-space'], config['test-type']],  res.value[1]).res.value]
                }
            } else {
                if (customizeStore().customizers['author-quotes']) {
                    mainStore().movie = {}
                    res.value = [res.value[0], useCustomizeFormat([config['include-numbers'], config['include-punctuations'], config['include-caps'], config['all-caps'], config['custom-camel-case'], config['no-space'], config['test-type']],  res.value[1]).res.value]
                } 
                else if (customizeStore().customizers['movie-quotes']) {
                    mainStore().authoredQuote.value = {}
                    res.value = [res.value[0], res.value[1], useCustomizeFormat([config['include-numbers'], config['include-punctuations'], config['include-caps'], config['all-caps'], config['custom-camel-case'], config['no-space'], config['test-type']],  res.value[2]).res.value]
                }
            }
        } else {
            res.value = useCustomizeFormat([config['include-numbers'], config['include-punctuations'], config['include-caps'], config['all-caps'], config['custom-camel-case'], config['no-space'], config['test-type']],  res.value).res.value
        }
    }

    // generate test with new config and customize
    if (config['text-length'] !== 'auto') generateTest(+config['text-length'])
    else  generateTest()
    customizers()

    return res.value
};
