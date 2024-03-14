import { ref } from 'vue'

export function useCustomizeFormat(args, text) {
    const customizeFormatRes = ref(text);
    const defaultcustomizeFormatRes = ref('')
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let punctuations = [',', '.', ':', ';', '-', "'", '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', '|', "\\", '"', '<', '>', '/', '?']

    if (!args.includes('caps')) {
        customizeFormatRes.value = customizeFormatRes.value.toLowerCase()
    }

    if (!args.includes('punctuations')) {
        defaultcustomizeFormatRes.value = ''

        for (let index = 0; index < customizeFormatRes.value.length; index++) {
            if (punctuations.includes(customizeFormatRes.value[index])) {
                defaultcustomizeFormatRes.value += '';
            } else {
                defaultcustomizeFormatRes.value += customizeFormatRes.value[index];
            }
        }

        customizeFormatRes.value = defaultcustomizeFormatRes.value
    }
    
    if (!args.includes('numbers')) {
        defaultcustomizeFormatRes.value = ''

        for (let index = 0; index < customizeFormatRes.value.length; index++) {
            if (customizeFormatRes.value[index] == ' ') {
                defaultcustomizeFormatRes.value += ' '
            } else {
                if (isNaN(customizeFormatRes.value[index])) {
                    defaultcustomizeFormatRes.value += customizeFormatRes.value[index]
                }
            }
        }

        customizeFormatRes.value = defaultcustomizeFormatRes.value
    }

    return { customizeFormatRes }
}