import { ref } from 'vue'
import { englishWords } from '../../data/englishWords.js';
import { useCustomizeFormat } from './useCustomizeFormat.js';
import { customizeStore } from '../store/customizeStore.js';
import { mainStore } from '../store/mainStore.js';
import authoredQuotes from '../../data/quotes.json'

export async function getQuotes (config, customText) {
    const res = ref('')
    const {mostUsed, mediumUsed, rarelyUsed, quotesWithNumbers, numbers, quotesWithoutAuthors, movieQuotes} = englishWords()
    const includeNumbers = customizeStore().customizers['numbers']
    const testType = config['test-type']
    const testLength = config['test-length']
    const allQuotes = [
        ...quotesWithoutAuthors.value.ten,
         ...quotesWithoutAuthors.value.twenty, 
         ...quotesWithoutAuthors.value.thirty, 
         ...quotesWithoutAuthors.value.long,
        ]
    let allMovies = [ movieQuotes['The Hobbit'].quotes, movieQuotes['Pirates of the Caribbean'].quotes, movieQuotes['Harry Potter'].quotes, movieQuotes['The Lord of the Rings'].quotes, movieQuotes['Legend of the Seeker'].quotes, movieQuotes['Star Wars'].quotes, movieQuotes['Indiana Jones and the Raiders of the Lost Ark'].quotes, movieQuotes['Jurassic Park'].quotes,]
    
    function generateTest() {
        if (testType === 'quotes') {
            const lengths = {
                10: [...quotesWithoutAuthors.value.ten],
                20:  [...quotesWithoutAuthors.value.twenty],
                30: [...quotesWithoutAuthors.value.thirty],
                40: [],
                50: [],
                100: [],
                'auto': includeNumbers ? [...quotesWithNumbers, ...allQuotes, ...quotesWithNumbers] : allQuotes
            }

            if (Object.keys(lengths).includes(`${testLength}`)) res.value = lengths[testLength][Math.ceil(Math.random() * lengths[testLength].length) - 1]
            if (testLength === 50 || testLength === 100) res.value = lengths['auto'][Math.ceil(Math.random() * lengths['auto'].length) - 1]
            
            else if (config['author-quotes'] || config['movie-quotes']) {
                let both = config['author-quotes'] && config['movie-quotes']
                let authored = config['author-quotes']
                let movieIndex = Math.ceil(Math.random() * allMovies.length) - 1
                let quoteIndex = Math.ceil(Math.random() * authoredQuotes.length)  - 1
                let quote = authoredQuotes[quoteIndex]
                let movies = allMovies[movieIndex]
                let movieName = Object.keys(movieQuotes)[movieIndex]
                let movie = movies[Math.ceil(Math.random() * movies.length) - 1]
                
                if (both) {
                    let choice = Math.ceil(Math.random() * 2) - 1
                    if (choice) res.value = [quote.author, quote.quote]
                    else  res.value = [movieName, movie.author, movie.quote]
                } else {                    
                    if (authored) res.value = [quote.author, quote.quote]
                    else res.value = [movieName, movie.author, movie.quote]
                }
            }
        }

        else if (testType === 'custom')  {
            if (customizeStore().userSelectedTest) {
                res.value = mainStore().customTests[customizeStore().userSelectedTest]
                customizeStore().userSelectedTest = ''
            } else {
                let customTests = mainStore().customTests
                let quotes = Object.values(customTests)
                res.value = quotes[Math.ceil(Math.random() * quotes.length) - 1]
            }
        }

        else if (testType === 'words') {
            const words = ref([...mostUsed])
            const numberOfWords = ref(testLength)
            const wordType =  config['words-type']
            if (testLength === 'auto') numberOfWords.value = Math.round(Math.random() * 50) + 5
            if (config['numbers']) words.value.push(...numbers)

            if (wordType === 'common') words.value.push(...mediumUsed)
            if (wordType === 'rare') words.value.push(...rarelyUsed, ...mediumUsed)

            for (let index = 0; index < numberOfWords.value; index++) {
                let random = Math.ceil(Math.random() * words.value.length) - 1
                let word = words.value[random]          
                index == 0 ? res.value += word : res.value += ' ' + word
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
            let both = config['author-quotes'] && config['movie-quotes']
            
            if ((config['author-quotes'] && !both) || (both && res.value.length === 2)) {
                mainStore().quoteType = 'author'
                let test = useCustomizeFormat([config['numbers'], config['punctuation'], config['caps'], config['all-caps'], config['camel-case'], config['no-space'], config['test-type']],  res.value[1]).res.value
                res.value = [res.value[0], test]
            }
            else if (config['movie-quotes']) {
                mainStore().quoteType = 'movie'
                let test = useCustomizeFormat([config['numbers'], config['punctuation'], config['caps'], config['all-caps'], config['camel-case'], config['no-space'], config['test-type']],  res.value[2]).res.value
                res.value = [res.value[0], res.value[1], test]
            }
        }
        else {
            mainStore().quoteType = ''
            res.value = useCustomizeFormat([config['numbers'], config['punctuation'], config['caps'], config['all-caps'], config['camel-case'], config['no-space'], config['test-type']],  res.value).res.value
        }
    }

    generateTest()
    customizers()

    return res.value
};
