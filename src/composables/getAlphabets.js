import {ref} from 'vue'
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';

export function getAlphabets() {
    const customize = customizeStore()
    const {customizers, mixCharacters, mixCharactersArray} = storeToRefs(customize)
    
    const jumble = customizers.value['arrangement'] === 'jumble'
    const reverse = customizers.value['arrangement'] === 'reverse'
    const space = customizers.value['spaced'] === 'space'
    const uppercase = customizers.value['case'] === 'uppercase'
    const randomcase = customizers.value['case'] === 'randomcase'

    const generateTest = () => {
        const alphabets_ = ref('')
        const alphabets = ref('abcdefghijklmnopqrstuvwxyz')
        alphabets_.value = alphabets.value

        if (mixCharacters.value && mixCharactersArray.value) {
            alphabets_.value = ''
            let length = mixCharactersArray.value.length > 8 ? 78 : mixCharactersArray.value.length > 6 ? 66 : 60
            for (let index = 1; index < length; index++) {
                let random = Math.ceil(Math.random()  * mixCharactersArray.value.length) - 1
                if (index % 6 === 0) alphabets_.value += ' '
                else alphabets_.value += mixCharactersArray.value[random]
            }
        }

        if (!mixCharacters.value) {
            if (jumble) {
                const text = ref(alphabets_.value.split(''))
                let length = text.value.length
                alphabets_.value = ''

                for (let index = 0; index < length; index++) {
                    let random = Math.ceil(Math.random() * text.value.length) - 1
                    alphabets_.value += text.value[random]
                    text.value.splice(random, 1)
                }
            }

            if (space) {
                let text = alphabets_.value
                alphabets_.value = ''
    
                for (let index = 0; index < (2 * text.length) -1; index++) {
                    if (index % 2 !== 0) {
                        alphabets_.value += ' '
                    } else {
                        alphabets_.value += text[index/2]
                    }
                }
            }

            if (reverse) {
                alphabets_.value = alphabets_.value.split('').reverse().join('')
            }
        }

        if (randomcase) {
            let text = alphabets_.value
            alphabets_.value = ''
            for (let index = 0; index < text.length; index++) {
                let random = Math.round(Math.random() + 1)
                if (random % 2 === 0) alphabets_.value += text[index].toUpperCase()
                else alphabets_.value += text[index].toLowerCase()
            }
        }

        if (uppercase) {
            alphabets_.value = alphabets_.value.split('').map(alpha => alpha.toUpperCase()).join('')
        }

        return alphabets_.value
    }

    return generateTest()
}