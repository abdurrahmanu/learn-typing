export function customizeTest({
    punctuation,
    caps,
    characterCase,
    noSpace ,
    testType,
    test,
    jumble,
    reverse,
    space,
}) {

    if (characterCase === 'lower') {
        test = test.toLowerCase()
    } 

    else if (characterCase === 'camel') {
        test = test.split('').map(char => {
            let random = Math.floor(Math.random() * 6)
            if (random < 2) return char.toUpperCase()
            else return char.toLowerCase()
        }).join('')
    }

    else if (characterCase === 'upper') {
        test = test.toUpperCase()
    }

    if (!punctuation) {
        let EnglishAlphaNumbericChar = (char) => {
            let code = char.charCodeAt(0)
            return (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 5122)  || code === 32
        }

        test = test.split('').map(char => EnglishAlphaNumbericChar(char) ? char : '').join('')
    }

    else {
        if (testType === 'words') {
            let punctuations = [',', '.', ';', '?', '!']
            let wordsArr = test.split(' ')
            let spacing = 5 // Punctuation mark after every 5 words
            let usedPunctuations = {}
            let totalPunctuations = 0

            test = wordsArr.map((word, index) => {
                const isLastWord = index === wordsArr.length - 1;
                const addPunctuation = (index + 1) % spacing === 0
                let punctuation = punctuations[Math.floor(Math.random() * punctuations.length)];

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
        test = test.toLowerCase()        
        let newText = test
        test = newText.split(' ').map((word, index) => {
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

    if (noSpace) {
        test = test.replace(/ /g, '')
    }

    if (jumble) {
        function jumbleEachWord(str) {
            return str
                .split(' ')
                .map(word => {
                let arr = word.split('');
                for (let i = arr.length - 1; i > 0; i--) {
                    let j = Math.floor(Math.random() * (i + 1));
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
                return arr.join('');
                })
                .join(' '); 
        }

        test = jumbleEachWord(test);
    }

    if (space) {
        test = test.split('').map((char, index) => {
            if (index === test.length - 1 || test[index + 1] === ' ' || char === ' ') return char
            else return char + ' '
        }).join('').trim()
    }

    if (reverse) {
        test = test.split(' ').map((word, index) => {
            return word.split('').reverse().join('')
        }).join(' ')
    }

    return test
}