import {defineStore} from 'pinia'
import {ref} from 'vue'

export const customizeStore = defineStore('customizeStore', () => {
    const configs = ref([])
    const showMoreSettings = ref(false)
    const hideElements = ref(false)
    const next = ref(false)
    const onlyMovieQuotes = ref(false)
    const onlyAuthoredQuotes = ref(false)

    const customizers = ref({
        'text-length': 'auto',
        'words-type': 'most-used', 
        'test-type': 'random-text',
        'include-caps': '',
        'include-punctuation': '',
        'include-numbers': '',
        'all-caps': false,
        'backspace': true,
        'blind-mode': false,
        'custom-camel-case': false,
        'no-space': false,
        'movie-quotes': false,
        'author-quotes': false
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
        'text-length' : ['auto', 10, 20, 30],
        'words-type' : ['most-used', 'less-used', 'rarely-used'],
        'test-type' : ['quotes', 'random-text'],
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

        if (selection === currentWordType || selection === currentTestType || selection === currentTextLength) return
        changeConfiguration(group, selection)    

        if (customizers.value['test-type'] === 'quotes') {
            disableOption.value['words-type'] = true
            disableOption.value['include-numbers'] = true
        } else {
            disableOption.value['words-type'] = false
            disableOption.value['include-numbers'] = false
        }

        localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([customizers.value, disableOption.value]))
        next.value = true
    }

    const customize = (mode, boolean) => {
        if (boolean && mode === 'all-caps') {
            customizers.value['custom-camel-case'] = false
        }

        if (boolean && mode === 'movie-quotes') {
            customizers.value['text-length'] = 'auto'
            customizers.value['author-quotes'] = false
        }

        if (boolean && mode === 'author-quotes') {
            customizers.value['text-length'] = 'auto'
            customizers.value['movie-quotes'] = false
        }

        if (boolean && mode === 'custom-camel-case') {
            customizers.value['all-caps'] = false
        }

        customizers.value[mode] = boolean
        
        localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([customizers.value, disableOption.value]))
        next.value = true
    }

    return {
        disableOption,
        onlyMovieQuotes,
        configs,
        showMoreSettings,
        customizers,
        allOptions,
        hideElements,
        next,
        onlyAuthoredQuotes,
        changeConfiguration,
        useConfig, 
        customize,
    }
})




