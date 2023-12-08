import { ref } from 'vue';

export function useDefaultFormat(text) {
    const res = ref('');
    const defaultRes = ref('');
    let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    let punctuations = [',', '.', ':', ';', '-', "'", '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '[', ']', '{', '}', '|', "\\", '"', '<', '>', '/', '?'];
    res.value = text

    //Don't include caps
    res.value = res.value.toLowerCase();

    //Don't include numbers    
    for (let index = 0; index < res.value.length; index++) {
        if (res.value[index] == ' ') {
            defaultRes.value += ' ';
        } else {
            if (isNaN(res.value[index])) {
                defaultRes.value += res.value[index];
            }
        }
    }

    defaultRes.value = ''

    //Don't include punctuations
    for (let index = 0; index < res.value.length; index++) {
        if (punctuations.includes(res.value[index])) {
            defaultRes.value += '';
        } else {
            defaultRes.value += res.value[index];
        }
    }

    res.value = defaultRes.value

    return res.value
}