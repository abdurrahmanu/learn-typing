import { ref } from 'vue'
import data from '../../../data/quotes.json'

export function useCustomizeLength(arg) {
    const res = ref('')
    const isNumber = ref(false)

    try {
        arg = eval(arg)
        eval(arg) ? isNumber.value = true : false
    } catch (error) {
        isNumber.value = false
    }

    if (isNumber.value) {
        let numberOfQuotes = 4
        const spaceLength = ref(0)
        const resArr = ref([])
        const singleWord = ref('')

        for (let index = 0; index < numberOfQuotes; index++) {
            let random = Math.floor(Math.random() * data.length);
            index < 1 ? res.value = data[random].quote : res.value += ' ' + data[random].quote;
        }

        for (let i = 0; i < res.value.length; i++) {
            if (spaceLength.value === arg) {
                break
            } else {
                if (res.value[i] === ' ') {
                    spaceLength.value++
                    resArr.value.push(singleWord.value)
                    singleWord.value = ''
                } else {
                    singleWord.value += res.value[i]
                }
            }
        }

        res.value = resArr.value.join(' ')
    } else {
        const numberOfQuotes = ref(0)

        if (arg === 'short') {
            numberOfQuotes.value = 2;
        } else {
            numberOfQuotes.value = 4;
        }
        for (let index = 0; index < numberOfQuotes.value; index++) {
            let random = Math.floor(Math.random() * data.length);
            index < 1 ? res.value = data[random].quote : res.value += ' ' + data[random].quote;
        }

    }

    return { res }
}