import {ref} from 'vue'
import {alphabetsStore}  from '../store/alphabetsModeStore';
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';

export function alphabetsMode() {
    const res  =  ref('')
    const alphabets_ = alphabetsStore()
    const { alphabetsMode_ , useAlphabetCombination, alphabetsCombination, containerText, alphabetsConfig, shiftKey } = storeToRefs(alphabets_)

    const generateAlphabetsTest = () => {
        const englishAlphabets = ref('abcdefghijklmnopqrstuvwxyz')
        containerText.value = englishAlphabets.value

        if (useAlphabetCombination.value && alphabetsCombination.value) {
            containerText.value = ''
            let length = alphabetsCombination.value.length > 8 ? 78 : alphabetsCombination.value.length > 6 ? 66 : 60
            for (let index = 1; index < length; index++) {
                let random = Math.ceil(Math.random()  * alphabetsCombination.value.length) - 1
                if (index % 6 === 0) containerText.value += ' '
                else containerText.value += alphabetsCombination.value[random]
            }
        }

        if (alphabetsConfig.value.random) {
            if (!(useAlphabetCombination.value && alphabetsCombination.value)) {
                const text = ref(containerText.value.split(''))
                let length = text.value.length
                containerText.value = ''

                for (let index = 0; index < length; index++) {
                    let random = Math.ceil(Math.random() * text.value.length) - 1
                    containerText.value += text.value[random]
                    text.value.splice(random, 1)
                }
            }
        }

            if (alphabetsConfig.value.spaced) {
                let text = containerText.value
                containerText.value = ''

                for (let index = 0; index < (2 * text.length) -1; index++) {
                    if (index % 2 !== 0) {
                        containerText.value += ' '
                    } else {
                        containerText.value += text[index/2]
                    }
                }
            }

            if (alphabetsConfig.value.customCase) {
                let text = containerText.value
                containerText.value = ''
                for (let index = 0; index < text.length; index++) {
                    let random = Math.round(Math.random() + 1)
                    if (random % 2 === 0) containerText.value += text[index].toUpperCase()
                    else containerText.value += text[index].toLowerCase()
                }
            }

            if (alphabetsConfig.value.uppercase) {
                containerText.value = containerText.value.split('').map(alpha => alpha.toUpperCase()).join('')
            }

            if (alphabetsConfig.value.backwards) {
                containerText.value = containerText.value.split('').reverse().join('')
            }

            return containerText.value
    }

    if (alphabetsMode_.value) res.value = generateAlphabetsTest()

    return  res.value
}