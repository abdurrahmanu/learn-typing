import { ref } from 'vue'

export function useCustomizeFormat(args, text) {
    const res = ref(text);
    const defaultRes = ref('')
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    let punctuations = [',', '.', ':', ';', '-', "'", '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', '|', "\\", '"', '<', '>', '/', '?']


    if (!args.includes('caps')) {
        res.value = res.value.toLowerCase()
    }

    if (!args.includes('punctuations')) {
        defaultRes.value = ''

        for (let index = 0; index < res.value.length; index++) {
            if (punctuations.includes(res.value[index])) {
                defaultRes.value += '';
            } else {
                defaultRes.value += res.value[index];
            }
        }

        res.value = defaultRes.value
    }
    
    if (!args.includes('numbers')) {
        defaultRes.value = ''

        for (let index = 0; index < res.value.length; index++) {
            if (res.value[index] == ' ') {
                defaultRes.value += ' '
            } else {
                if (isNaN(res.value[index])) {
                    defaultRes.value += res.value[index]
                }
            }
        }

        res.value = defaultRes.value
    }

    return { res }
}