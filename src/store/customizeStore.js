import {defineStore} from 'pinia'
import {ref} from 'vue'

export const customizeStore = defineStore('customizeStore', () => {
    const configs = ref([])
    const showMoreSettings = ref(false)
    const hideElements = ref(false)
    const next = ref(false)
    const onlyMovieQuotes = ref(false)
    const onlyAuthoredQuotes = ref(false)
    const caretType = ref('border')
    const isBlindMode = ref(false)
    const font = ref(20)
    const range = ref((font.value - 16) / 0.16)
    const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

    const customizers = ref({
        'text-length': 'auto',
        'words-type': 'most-used', 
        'caret': 'border',
        'test-type': 'random-words',
        'include-caps': '',
        'include-punctuation': '',
        'include-numbers': '',
        'all-caps': false,
        'backspace': true,
        'blind-mode': false,
        'custom-camel-case': false,
        'no-space': false,
        'movie-quotes': false,
        'author-quotes': false,
    })

    const disableOption = ref({
        'text-length' : false,
        'words-type': false, 
        'test-type': false,
        'include-caps': false, 
        'include-punctuations': false,
        'include-numbers': false
    })

    const allOptions = ref({
        'text-length' : ['auto', 10, 20, 30, 50],
        'words-type' : ['most-used', 'less-used', 'rarely-used'],
        'test-type' : ['quotes', 'random-words'],
        'include-caps' : ['caps'],
        'include-punctuations' : ['punctuations'],
        'include-numbers' : ['numbers'],
        'all-caps' : ['all caps'],
        'backspace' : ['backspace'],
        'blind-mode' : ['blind mode'],
        'custom-camel-case' : ['custom camel case'],
        'no-space' : ['no space']
    })

    const changeConfiguration = (group, selection) => {
        if (customizers.value[group] === selection) customizers.value[group] = ''
        else customizers.value[group] = selection
    }

    const useConfig = () => {
        let currentWordType = customizers.value['words-type']
        let currentTestType = customizers.value['test-type']
        let currentTextLength = customizers.value['text-length']
        let selection = configs.value[1]
        let group = configs.value[0]

        if ((typeof configs.value[1] === 'number' && configs.value[0] === 'text-length' ) || configs.value[1] === 'random-words') {
            customizers.value['movie-quotes'] = false
            customizers.value['author-quotes'] = false
        }

        if (selection === currentWordType || selection === currentTestType || selection === currentTextLength) return
        changeConfiguration(group, selection)    

        if (customizers.value['test-type'] === 'quotes') {
            disableOption.value['words-type'] = true
            disableOption.value['include-numbers'] = true
        } else {
            disableOption.value['words-type'] = false
            disableOption.value['include-numbers'] = false
        }

        localStorageSettings.value.config = [customizers.value, disableOption.value]
        localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
        next.value = true
    }

    const customize = (mode, boolean, option) => {
        if (boolean && mode === 'all-caps') {
            customizers.value['custom-camel-case'] = false
        }

        if (mode === 'movie-quotes') {
            if (onlyAuthoredQuotes.value) onlyAuthoredQuotes.value = false
            if (option) {
                customizers.value['author-quotes'] = false
            }
            customizers.value['text-length'] = 'auto'
            customizers.value['test-type'] = 'quotes'
        }

        if (mode === 'author-quotes') {
            if (onlyMovieQuotes.value) onlyMovieQuotes.value = false
            if (option) {
                customizers.value['movie-quotes'] = false
            }
            customizers.value['text-length'] = 'auto'
            customizers.value['test-type'] = 'quotes'
        }

        if (boolean && mode === 'custom-camel-case') {
            customizers.value['all-caps'] = false
        }

        if (!option && option !== false) customizers.value[mode] = boolean
        
        localStorageSettings.value.config = [customizers.value, disableOption.value]
        localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))     
        next.value = true
    }

    return {
        disableOption,
        onlyMovieQuotes,
        configs,
        caretType,
        showMoreSettings,
        customizers,
        allOptions,
        hideElements,
        next,
        onlyAuthoredQuotes,
        isBlindMode,
        changeConfiguration,
        useConfig, 
        customize,
        font, 
        range,
    }
})