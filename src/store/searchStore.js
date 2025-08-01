import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const searchStore = defineStore('searchStore', () => {
    const useValue = ref('')

    const optionsObjects = {
        'backspace': 'Cannot be disabled on mobile. Toggle to enable Backspace or delete key.',
        'blur': 'Toggle to blur out all words excluding the current and next words. Only works with spaced test.',
        'cursor': ' ',
        'custom-case': 'Toggle to randomize positons of uppercase and lowercase alphabets. eg. tHiS is An EXaMplE',
        'difficulty': 'beginner amateur expert accuracy wpm error percentage',
        'double-words': 'Toggle to repeat every word twice. Can only work with spaced test.',
        'letter-combination': 'Toggle to randomly repeat and shuffles your selection. A minimum of two characters and maximum of ten.',
        'no-space': 'Toggle to remove all spaces in test. e.g. thisisanexample',
        'stop-on-error': 'With this toggled, you will not be able to go forward until you clear your error.',
        'font-size': 'test fontsize',
        'test-lines': 'test lines'
    }

    const searchResult = computed(() => {
        if (!useValue.value || !useValue.value.replaceAll(' ', '').length) {
            useValue.value = ''
            return []       
        }

        let result = Object.entries(optionsObjects).filter((settings) => {
            return settings[0].toLowerCase().includes(useValue.value) || settings[1].toLowerCase().includes(useValue.value)
        }).map(res => res[0])

        return result
    })

    return {
        searchResult,
        useValue
    }
})