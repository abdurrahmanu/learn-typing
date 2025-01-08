import {ref} from 'vue'
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';

export function getAlphabets() {
    const res  =  ref('')

    const customize = customizeStore()
    const {customizers, useAlphabetCombination, alphabetsCombination} = storeToRefs(customize)

    const generateAlphabetsTest = () => {
        const englishAlphabets_ = ref('')
        const englishAlphabets = ref('abcdefghijklmnopqrstuvwxyz')
        englishAlphabets_.value = englishAlphabets.value

        if (useAlphabetCombination.value && alphabetsCombination.value) {
            englishAlphabets_.value = ''
            let length = alphabetsCombination.value.length > 8 ? 78 : alphabetsCombination.value.length > 6 ? 66 : 60
            for (let index = 1; index < length; index++) {
                let random = Math.ceil(Math.random()  * alphabetsCombination.value.length) - 1
                if (index % 6 === 0) englishAlphabets_.value += ' '
                else englishAlphabets_.value += alphabetsCombination.value[random]
            }
        }

        if (customizers.value['jumble']) {
            if (!(useAlphabetCombination.value && alphabetsCombination.value)) {
                const text = ref(englishAlphabets_.value.split(''))
                let length = text.value.length
                englishAlphabets_.value = ''

                for (let index = 0; index < length; index++) {
                    let random = Math.ceil(Math.random() * text.value.length) - 1
                    englishAlphabets_.value += text.value[random]
                    text.value.splice(random, 1)
                }
            }
        }

            if (customizers.value['spaced']) {
                let text = englishAlphabets_.value
                englishAlphabets_.value = ''

                for (let index = 0; index < (2 * text.length) -1; index++) {
                    if (index % 2 !== 0) {
                        englishAlphabets_.value += ' '
                    } else {
                        englishAlphabets_.value += text[index/2]
                    }
                }
            }

            if (customizers.value['randomcase']) {
                let text = englishAlphabets_.value
                englishAlphabets_.value = ''
                for (let index = 0; index < text.length; index++) {
                    let random = Math.round(Math.random() + 1)
                    if (random % 2 === 0) englishAlphabets_.value += text[index].toUpperCase()
                    else englishAlphabets_.value += text[index].toLowerCase()
                }
            }

            if (customizers.value['uppercase']) {
                englishAlphabets_.value = englishAlphabets_.value.split('').map(alpha => alpha.toUpperCase()).join('')
            }

            if (customizers.value['reverse']) {
                englishAlphabets_.value = englishAlphabets_.value.split('').reverse().join('')
            }
            return englishAlphabets_.value
    }

    if (customizers.value['modes'] === 'alphabet-test') res.value = generateAlphabetsTest()

    return  res.value
}