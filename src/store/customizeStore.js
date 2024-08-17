import {defineStore} from 'pinia'
import {ref} from 'vue'

export const customizeStore = defineStore('customizeStore', () => {
    const mode = ref('auto')
    const testType_ = ref('random-words')
    const selectedCustomTest = ref('')
    const customTestModal = ref(false)
    const pauseTyping = ref(true)
    const configs = ref([])
    const showMoreSettings = ref(false)
    const hideElements = ref(false)
    const onlyMovieQuotes = ref(false)
    const onlyAuthoredQuotes = ref(false)
    const caretType = ref('border')
    const difficulty = ref('beginner')
    const backspace = ref(false)
    const repeat = ref(false)
    const capslock = ref(true)
    const textPosition = ref('left')
    const blind = ref(false)
    const font = ref(32)
    const range = ref((font.value - 16) / 0.16)
    const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))
    const capsIsOn = ref(false)
    const customTestLength = ref(200)
    const useCustomLength = ref(false)

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
        'blur': false,
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
        'text-length' : ['auto', 10, 20, 30, 50, 100],
        'words-type' : ['most-used', 'less-used', 'rarely-used'],
        'test-type' : ['quotes', 'random-words', 'custom-test'],
        'include-caps' : ['caps'],
        'include-punctuations' : ['punctuations'],
        'include-numbers' : ['numbers'],
        'all-caps' : ['all caps'],
        'custom-camel-case' : ['custom camel case'],
        'no-space' : ['no space'],
    })

    const changeConfiguration = (group, selection) => {
        if (customizers.value[group] === selection) customizers.value[group] = ''
        else customizers.value[group] = selection

        if (customizers.value['test-type'] === 'quotes' || customizers.value['test-type'] === 'custom-test') {
            disableOption.value['words-type'] = true
            disableOption.value['include-numbers'] = true

            if (customizers.value['test-type'] === 'custom-test') {
                disableOption.value['text-length'] = true
            }
        }
        
        else if (customizers.value['test-type'] === 'random-words') {
            disableOption.value['words-type'] = false
            disableOption.value['include-numbers'] = false
            disableOption.value['text-length'] = false
        }
        

        const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))
        localStorageSettings.value.config = [customizers.value, disableOption.value]
        localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
    }

    const useConfig = () => {
        let currentWordType = customizers.value['words-type']
        let currentTestType = customizers.value['test-type']
        let currentTextLength = customizers.value['text-length']
        let selection = +configs.value[1] || configs.value[1]
        let group = configs.value[0]
        testType_.value = customizers.value['test-type']

        if ((typeof configs.value[1] === 'number' && configs.value[0] === 'text-length' ) || configs.value[1] === 'random-words') {
            customizers.value['movie-quotes'] = false
            customizers.value['author-quotes'] = false
        }

        if (selection === currentWordType || selection === currentTestType || selection === currentTextLength) return

        changeConfiguration(group, selection)    
    }

    const customize = (mode, boolean) => {
        if (boolean && mode === 'all-caps') customizers.value['custom-camel-case'] = false
        if (boolean && mode === 'custom-camel-case') customizers.value['all-caps'] = false

        if (mode === 'author-quotes' || mode === 'movie-quotes') {
            customizers.value['text-length'] = 'auto'
            customizers.value['test-type'] = 'quotes'
            if (mode === 'author-quotes' && onlyMovieQuotes.value) onlyMovieQuotes.value = false 
            if (mode === 'movie-quotes' && onlyAuthoredQuotes.value) onlyAuthoredQuotes.value = false 
        }

        localStorageSettings.value.config = [customizers.value, disableOption.value]
        localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))     
    }

    return {
        disableOption,
        difficulty,
        onlyMovieQuotes,
        configs,
        caretType,
        showMoreSettings,
        customizers,
        allOptions,
        hideElements,
        onlyAuthoredQuotes,
        backspace,
        blind,
        changeConfiguration,
        useConfig, 
        customize,
        font, 
        range,
        repeat,
        mode,
        textPosition,
        pauseTyping,
        customTestModal,
        selectedCustomTest,
        testType_,
        capslock,
        capsIsOn,
        customTestLength,
        useCustomLength,
    }
})