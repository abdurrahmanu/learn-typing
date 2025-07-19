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
    const {customizers, customChoice} = storeToRefs(customizestore)
    const mainstore = mainStore()
    const {customTests} = storeToRefs(mainstore)
    const {mostUsed, mediumUsed, rarelyUsed, quotesWithNumbers, numbers, quotesWithoutAuthors, movieQuotes} = englishWords()
    const includeNumbers = customizers.value['numbers']
    const testType = customizers.value['test-type']
    const wordType =  customizers.value['words-type']
    const testLength = customizers.value['test-length']
    const singleQoutes = Array.from(Object.values(quotesWithoutAuthors.value)).flat(2)
    const allMovies = Array.from(Object.values(movieQuotes)).map((movies, index) => {
        return movies.quotes.map(movie => {
            return {
                quote: movie.quote,
                author: movie.author,
                name: Array.from(Object.keys(movieQuotes))[index]
            }
        })
    }).flat()
        
    if (testType === 'quotes') {
        let allQuotes = [
            ...allMovies,
            ...authoredQuotes,
            ...singleQoutes,
            ...(includeNumbers ? quotesWithNumbers : [])
        ];

        let index = Math.floor(Math.random() * allQuotes.length)
        const author =  allQuotes[index]?.author
        const quote = allQuotes[index]?.quote || allQuotes[index]
        const name = allQuotes[index]?.name

        test.value = {
            author: author,
            test: quote,
            name: name
        }
    }

    else if (testType === 'custom')  {
        const quotes = [
            ...(customChoice.value ? customTests.value[customChoice.value] : []),
            ...(!customChoice.value ? [...Object.values(customTests.value), ...singleQoutes] : []),
        ]

        const index = Math.floor(Math.random() * quotes.length)
        test.value['test'] = quotes[index]
    }

    else if (testType === 'words') {
        const _ = ref('')

        const words = [
            ...mostUsed,
            ...(wordType === 'common' ? mediumUsed : []),
            ...(wordType === 'rare' ? rarelyUsed : []),
            ...(customizers.value['numbers'] ? numbers : [])
        ]

        const numberOfWords = ref(testLength)
        if (testLength === 'auto') numberOfWords.value = Math.round(Math.random() * 45) + 5

        for (let index = 0; index < numberOfWords.value; index++) {
            let random = Math.floor(Math.random() * words.length)
            let word = words[random]     
            index === 0 ? _.value += word : _.value += ' ' + word
        }

        test.value['test'] = _.value
    }

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

    test.value['test'] = test.value['test'].replace(/[\r\n]+/g, ' ').trim();
    test.value['test'] = customizeTest(params, test.value['test']).res.value

    return test.value
}
