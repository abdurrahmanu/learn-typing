import { ref } from 'vue'

export function useCustomizeFormat(args, text) {
    const customizeFormatRes = ref(text);
    let punctuations = [',', '.', ':', ';', '-', "'", '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', '|', "\\", '"', '<', '>', '/', '?']

    // Custom Random Camel Case
    if (args[4]) {
        customizeFormatRes.value = ''
        for (let index = 0; index < text.length; index++) {
            let random = Math.round(Math.random() + 1)
            if (random % 2 === 0) customizeFormatRes.value += text[index].toUpperCase()
            else customizeFormatRes.value += text[index].toLowerCase()
        }
    }

    // No space text
    if (args[5]) {
        let newText = customizeFormatRes.value
        customizeFormatRes.value = ''
        for (let index = 0; index < text.length; index++) {
            if (newText[index] !== ' ') customizeFormatRes.value += newText[index]
            else customizeFormatRes.value += ''
        }
    }

    // All Caps
    if (args[3]) {
        customizeFormatRes.value = customizeFormatRes.value.toUpperCase()
    }

    if (!args.includes('caps') && !args[4] && !args[3]) {
        customizeFormatRes.value = customizeFormatRes.value.toLowerCase()
    } else {
        let newText = customizeFormatRes.value
        customizeFormatRes.value = ''
        for (let index = 0; index < newText.length; index++) {
            if (!newText[index - 1]) customizeFormatRes.value += newText[index].toUpperCase()
            else if (newText[index - 1] === ' ' && index % 3 === 0) customizeFormatRes.value += newText[index].toUpperCase()
            else customizeFormatRes.value += newText[index]
        }
    }

    if (!args.includes('punctuations')) {
        let newText = customizeFormatRes.value
        customizeFormatRes.value = ''

        for (let index = 0; index < newText.length; index++) {
            if (!punctuations.includes(customizeFormatRes.value[index])) customizeFormatRes.value += newText[index];
        }
    } else {
        // let newText = customizeFormatRes.value
        // customizeFormatRes.value = ''
        // for (let index = 0; index < newText.length; index++) {
        //     if (newText[index + 1] === ' ' && index % 3 === 0) {
        //         customizeFormatRes.value += '.'
        //     } else customizeFormatRes.value += newText[index]
        // }
    }

    return { customizeFormatRes }
}