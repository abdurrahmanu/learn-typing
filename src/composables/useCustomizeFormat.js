import { ref } from 'vue'

export function useCustomizeFormat(args, text) {
    const res = ref(text);
    let punctuations = [',', '.', ':', ';', '-', "'", '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', '|', "\\", '"', '<', '>', '/', '?']

    // Custom Random Camel Case
    if (args[4]) {
        res.value = ''
        for (let index = 0; index < text.length; index++) {
            let random = Math.round(Math.random() + 1)
            if (random % 2 === 0) res.value += text[index].toUpperCase()
            else res.value += text[index].toLowerCase()
        }
    }

    // No space text
    if (args[5]) {
        if (!args[1]) {
            let newText = res.value
            res.value = ''
            for (let index = 0; index < text.length; index++) {
                if (newText[index] !== ' ') res.value += newText[index]
                else res.value += ''
            }
        }
    }

    // All Caps
    if (args[3]) {
        res.value = res.value.toUpperCase()
    }

    if (!args.includes('caps') && !args[4] && !args[3]) {
        res.value = res.value.toLowerCase()
    } else {
        if (args[6] === 'random-words') {
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
    if (!args[1]) {
        let newText = res.value
        res.value = ''
        for (let index = 0; index < newText.length; index++) {
            if (!punctuations.includes(newText[index])) {
                res.value += newText[index];
            }
        }
    }
    else {
        if (args[6] === 'random-words') {
            let punctuations = [',', '.', '.', '.', '.', ',', ',', '?', '!']
            let newText = res.value
            res.value = ''
            for (let index = 0; index < newText.length; index++) {
                if (newText[index] === ' ' && index % 5 === 0) {
                    res.value += punctuations[Math.ceil(Math.random() * 10) - 1] + ' '
                } else res.value += newText[index]
            }
        }
        if (args[5]) {
            let newText = res.value
            res.value = ''
            for (let index = 0; index < text.length; index++) {
                if (newText[index] !== ' ') res.value += newText[index]
                else res.value += ''
            }
        }
    }

    return {res}
}