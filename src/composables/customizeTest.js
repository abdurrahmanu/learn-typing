import { ref } from 'vue'

export function customizeTest({
    numbers,
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

    if (camelCase) {
        res.value = ''
        for (let index = 0; index < test.length; index++) {
            let random = Math.round(Math.random() + 1)
            if (random % 2 === 0) res.value += test[index].toUpperCase()
            else res.value += test[index].toLowerCase()
        }
    }

    if (noSpace) {
        if (punctuation) {
            let newText = res.value
            res.value = ''
            for (let index = 0; index < test.length; index++) {
                if (newText[index] !== ' ') res.value += newText[index]
                else res.value += ''
            }
        }
    }

    if (allCaps) {
        res.value = res.value.toUpperCase()
    }

    if (!caps && !camelCase && !allCaps) {
        res.value = res.value.toLowerCase()
    } else {
        if (testType === 'words') {
            let newText = res.value
            res.value = ''
            for (let index = 0; index < newText.length; index++) {
                if (!newText[index - 1]) res.value += newText[index].toUpperCase()
                else if (newText[index - 1] === ' ' && index % 3 === 0) res.value += newText[index].toUpperCase()
                else res.value += newText[index]
            }
        }
    }

    // Punctuations
    if (punctuation) {
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
            let punctuations = [',', '.', ';', '.', '.', '.', ',', ',', '?', '!']
            let newText = res.value
            res.value = ''
            for (let index = 0; index < newText.length; index++) {
                if (newText[index] === ' ' && index % 5 === 0) {
                    res.value += punctuations[Math.ceil(Math.random() * 10) - 1] + ' '
                } else res.value += newText[index]
            }
        }
        
        if (noSpace) {
            let newText = res.value
            res.value = ''
            for (let index = 0; index < test.length; index++) {
                if (newText[index] !== ' ') res.value += newText[index]
                else res.value += ''
            }
        }
    }

    return {res}
}