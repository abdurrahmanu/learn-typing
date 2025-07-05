import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const searchStore = defineStore('searchStore', () => {
    const useValue = ref('')

    const optionsObjects = {
        'quotes': 'When toggled, it enables quotes mode and auto length.',
        'backspace': 'Cannot be disabled on mobile. Toggle to enable Backspace or delete key.',
        'blind mode': 'Toggle to type while fully trusting your muscle memory.',
        'blur': 'Toggle to blur out all words excluding the current and next words. Only works with spaced test.',
        'caps lock': 'Toggle to enable Caps lock. Untoggle to use ',
        'cookies': 'This site saves your preferred settings to enhance your user experience.',
        'countdown': 'If toggled, countdown tests automatically end of the count, untyped characters are considered errors.',
        'cursor': ' ',
        'custom case': 'Toggle to randomize positons of uppercase and lowercase alphabets. eg. tHiS is An EXaMplE',
        'difficulty': 'beginner amateur expert accuracy wpm error percentage',
        'double words': 'Toggle to repeat every word twice. Can only work with spaced test.',
        'letter combination': 'Toggle to randomly repeat and shuffles your selection. A minimum of two characters and maximum of ten.',
        'movie quotes': 'When toggled, it enables quotes mode and auto length.',
        'no space': 'Toggle to remove all spaces in test. e.g. thisisanexample',
        'stop on error': 'With this toggled, you will not be able to go forward until you clear your error.',
        'uppercase': 'Toggle to capitalize test.',
        'font': 'test fontsize',
        'test lines': 'test lines'
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