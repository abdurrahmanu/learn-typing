import { ref } from 'vue'

export function customizeTest({
    punctuation,
    caps,
    allCaps,
    camelCase,
    noSpace ,
    testType,
    test
}) {

    const res = ref(test);
    let punctuations = [',', '.', ':', ';', '-', "'", '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', '|', "\\", '"', '<', '>', '/', '?']

    if (!caps && !camelCase && !allCaps) {
        res.value = res.value.toLowerCase()
    } 

    if (camelCase) {
        res.value = ''
        for (let index = 0; index < test.length; index++) {
            let random = Math.round(Math.random() + 1)
            if (random % 2 === 0) res.value += test[index].toUpperCase()
            else res.value += test[index].toLowerCase()
        }
    }

    if (allCaps) {
        res.value = res.value.toUpperCase()
    }

    if (!punctuation) {
        let newText = res.value
        res.value = ''
        for (let index = 0; index < newText.length; index++) {
            if (!punctuations.includes(newText[index])) {
                res.value += newText[index];
            }
        }
    }
    else {
        if (testType === 'words') {
            let punctuations = [',', '.', ';', '?', '!']
            let wordsArr = res.value.split(' ')
            let spacing = 5 // Punctuation mark after every 5 words

            res.value = wordsArr.map((word, index) => {
            const isLastWord = index === wordsArr.length - 1;
            const addPunctuation = (index + 1) % spacing === 0
            const punctuation = punctuations[Math.floor(Math.random() * punctuations.length)];

            if (isLastWord) return word + '.'
            if (addPunctuation) return word + punctuation + ' '
            else return word + ' '
        }).join('').trimEnd()
        }
    }

    if (caps) {
        if (testType === 'words') {
            let newText = res.value
            res.value = newText.split('').map((word, index) => {
               if (newText[index - 2] && newText[index - 2] === '.') return word.charAt(0).toUpperCase() + word.slice(1)
                else return word
            }).join('')
        }
    }

    if (noSpace) {
        let newText = res.value
        res.value = newText.split('').map(word => {
            if (word === ' ') return ''
            else return word
        }).join('')
    }

    return {res}
}