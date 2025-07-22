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
            let usedPunctuations = {}
            let totalPunctuations = 0

            res.value = wordsArr.map((word, index) => {
                const isLastWord = index === wordsArr.length - 1;
                const addPunctuation = (index + 1) % spacing === 0
                const punctuation = punctuations[Math.floor(Math.random() * punctuations.length)];

                if (addPunctuation) {
                    totalPunctuations++
                    if (totalPunctuations >= wordsArr.length / 2 && usedPunctuations[punctuation] >= totalPunctuations / 2) {
                        let index = punctuations.indexOf(punctuation)
                        punctuations.splice(index, 1)
                        punctuation = punctuations[Math.floor(Math.random() * punctuations.length)];
                    }
                    if (!usedPunctuations[punctuation]) usedPunctuations[punctuation] = 1
                    else usedPunctuations[punctuation]++
                }

                if (isLastWord) return word + '.'
                if (addPunctuation) return word + punctuation + ' '
                else return word + ' '
            }).join('').trimEnd()
        }
    }

    if (caps) {
        if (testType === 'words') {
            let newText = res.value
            res.value = newText.split(' ').map((word, index) => {
                let capitalized = word.charAt(0).toUpperCase() + word.slice(1)
                if (index === 0) return capitalized
                if (punctuation) {
                    if (newText[index - 2] && newText[index - 2] === '.') return capitalized
                     else return word
                } else {
                    let random = Math.floor(Math.random() * 6)
                    if (random < 1) return capitalized
                    else return word
                }
            }).join(' ')
        }
    }

    if (noSpace) {
        res.value = res.value.split(' ').map(word => word ).join('')
    }

    return {res}
}