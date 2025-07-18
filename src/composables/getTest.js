import { ref } from 'vue'
import { englishWords } from '../../data/englishWords.js';
import { customizeTest } from './customizeTest.js';
import { customizeStore } from '../store/customizeStore.js';
import { mainStore } from '../store/mainStore.js';
import authoredQuotes from '../../data/quotes.json'
import { storeToRefs } from 'pinia';

export async function getTest () {
    const test = ref({
        test: '',
        author: null,
        name: null
    })

    const customizestore = customizeStore()
    const {customizers, userSelectedTest} = storeToRefs(customizestore)

    const mainstore = mainStore()
    const {customTests} = storeToRefs(mainstore)

    const {mostUsed, mediumUsed, rarelyUsed, quotesWithNumbers, numbers, quotesWithoutAuthors, movieQuotes} = englishWords()

    const includeNumbers = customizers.value['numbers']
    const testType = customizers.value['test-type']
    const testLength = customizers.value['test-length']

    const allQuotes = Array.from(Object.values(quotesWithoutAuthors.value)).flat(2)
    const allMovies = Array.from(Object.values(movieQuotes)).map(movie => movie.quotes.flat()).flat(2)
        
    function generateQuoteTest() {
        if (testType === 'quotes') {
            let authored = customizers.value['author-quotes'] || customizers.value['movie-quotes']
            if (authored) {
                let movieIndex = Math.floor(Math.random() * allMovies.length)
                let quoteIndex = Math.floor(Math.random() * authoredQuotes.length) 
                let quote = authoredQuotes[quoteIndex]
                let movie = allMovies[movieIndex][Math.floor(Math.random() * allMovies.length)]
                let movieName = Object.keys(movieQuotes)[movieIndex]
                
                test.value = {
                    author: quote.author || movie.quote,
                    test: quote.quote || movie.author,
                    name: movieName || null
                }
            } 

            else {
                if (testLength === 'auto') {
                    const all = includeNumbers ? [...allQuotes, ...quotesWithNumbers] : [...allQuotes];
                    const index = Math.floor(Math.random() * all.length);
                    test.value['test'] = all[index];
                }
                else {
                    let len = quotesWithoutAuthors.value.length
                    test.value['test'] = quotesWithoutAuthors.value[`${testLength}`][Math.floor(Math.random() * len)]
                }
            }
        }

        else if (testType === 'custom')  {
            if (userSelectedTest.value) {
                test.value['test'] = customTests.value[userSelectedTest.value]
            } else {
                let quotes = Object.values(customTests.value)
                test.value['test'] = quotes[Math.floor(Math.random() * quotes.length)]
            }
        }

        else if (testType === 'words') {
            const words = ref([...mostUsed])
            const numberOfWords = ref(testLength)
            const wordType =  customizers.value['words-type']
            if (testLength === 'auto') numberOfWords.value = Math.round(Math.random() * 50) + 5
            if (customizers.value['numbers']) words.value.push(...numbers)

            if (wordType === 'common') words.value.push(...mediumUsed)
            if (wordType === 'rare') words.value.push(...rarelyUsed, ...mediumUsed)

            for (let index = 0; index < numberOfWords.value; index++) {
                let random = Math.floor(Math.random() * words.value.length)
                let word = words.value[random]     
                index == 0 ? test.value['test'] += word : test.value['test'] += ' ' + word
            }
        }

        // convert line break /\n/ to space character
        if (typeof test.value['test'] === 'string') {
            const temp = test.value['test']     
            test.value['test'] = ''

            for (let index = 0; index < temp.length; index++) {
                if (temp[index].match(/\n/)) test.value['test'] += ' '
                else test.value['test'] += temp[index]
            }
            test.value['test'].trimStart()
            test.value['test'].trimEnd()
        }
    }

    generateQuoteTest()

    const params = {
        numbers : customizers.value['numbers'],
        punctuation : customizers.value['punctuation'],
        caps : customizers.value['caps'],
        allCaps : customizers.value['all-caps'],
        camelCase : customizers.value['camel-case'],
        noSpace : customizers.value['no-space'],
        testType : customizers.value['test-type'],
        test: test.value['test']
    }

    test.value['test'] = customizeTest(params, test.value['test']).res.value

    return test.value
}
