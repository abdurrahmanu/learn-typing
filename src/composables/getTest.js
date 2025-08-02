import { englishWords } from '../../data/englishWords.js';
import { customizeTest } from './customizeTest.js';
import { settingsStore } from '../store/settingsStore.js';
import { mainStore } from '../store/mainStore.js';
import authoredQuotes from '../../data/quotes.json'
import { storeToRefs } from 'pinia';

export async function getTest () {
    let test = {
        test: '',
        author: null,
        name: null
    }

    const settingstore = settingsStore()
    const {settings, customChoice, mixCharacters, charsArray} = storeToRefs(settingstore)

    const mainstore = mainStore()
    const {customTests, storedTest} = storeToRefs(mainstore)
    const {mostUsed, mediumUsed, rarelyUsed, quotesWithNumbers, numbers, quotesWithoutAuthors, movieQuotes} = englishWords()
    const includeNumbers = settings.value['numbers']
    const testType = settings.value['test-type']
    const wordType =  settings.value['words-type']
    const testLength = settings.value['test-length']
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

    if (settings.value['repeat']) {
        test = {
            author: storedTest.value.author,
            test: storedTest.value.test,
            name: storedTest.value.name
        }
    }

    else if (testType === 'characters') {
        const alphabets = 'abcdefghijklmnopqrstuvwxyz'
        let mixedChars = ''

        if (mixCharacters.value && charsArray.value) {
            let length = charsArray.value.length > 8 ? 78 : charsArray.value.length > 6 ? 66 : 60

            for (let index = 1; index < length; index++) {
                let random = Math.floor(Math.random()  * charsArray.value.length)
                if (index % 6 === 0) mixedChars += ' '
                else mixedChars += charsArray.value[random]
            }
        } 

        test = {
            author: storedTest.value.author,
            test: mixedChars || alphabets,
            name: storedTest.value.name
        }
    }
        
    else if (testType === 'quotes') {
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

        test = {
            author: author,
            test: quote,
            name: name
        }
    }

    else if (testType === 'custom')  {
        const quotes = [
            ...(customChoice.value ? [customTests.value[customChoice.value]] : Object.values(customTests.value)),
            // ...(!customChoice.value ? [...Object.values(customTests.value), ...singleQoutes] : []),
        ]
        
        const index = Math.floor(Math.random() * quotes.length)
        test['test'] = quotes[index]
    }

    else if (testType === 'words') {
        const words = [
            ...mostUsed,
            ...(wordType === 'common' ? mediumUsed : []),
            ...(wordType === 'rare' ? rarelyUsed : []),
            ...(settings.value['numbers'] ? numbers : [])
        ]

        let numberOfWords = testLength
        if (testLength === 'auto') numberOfWords = Math.round(Math.random() * 45) + 5

        for (let index = 0; index < numberOfWords; index++) {
            let random = Math.floor(Math.random() * words.length)
            let word = words[random]     
            index === 0 ? test['test'] += word : test['test'] += ' ' + word
        }
    }

    const params = {
        numbers : settings.value['numbers'],
        punctuation : settings.value['punctuation'],
        caps : settings.value['caps'],
        allCaps : settings.value['all-caps'],
        camelCase : settings.value['camel-case'],
        noSpace : settings.value['no-space'],
        testType : settings.value['test-type'],
        test: test['test'],
        jumble: settings.value['arrangement'] === 'jumble',
        reverse: settings.value['arrangement'] === 'reverse',
        space: settings.value['spaced']
    }

    test['test'] = test['test'].replace(/[\r\n]+/g, ' ').trim();
    test['test'] = customizeTest(params, test['test'])

    return test
}
