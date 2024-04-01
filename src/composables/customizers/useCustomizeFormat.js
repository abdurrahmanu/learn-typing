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
    }

    if (!args.includes('punctuations')) {
        let newText = customizeFormatRes.value
        customizeFormatRes.value = ''

        for (let index = 0; index < newText.length; index++) {
            if (!punctuations.includes(customizeFormatRes.value[index])) customizeFormatRes.value += newText[index];
        }
    }

    return { customizeFormatRes }
}