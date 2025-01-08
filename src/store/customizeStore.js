import {defineStore} from 'pinia'
import {isTouchScreenDevice} from '../composables/isTouchScreenDevice'
import {ref} from 'vue'
import { updateDB } from '../composables/updateDB'
import { isMobile } from '../composables/isMobile'

export const customizeStore = defineStore('customizeStore', () => {
    const mode = ref('auto')
    const count = ref(false)
    const testType_ = ref('words')
    const userSelectedTest = ref('')
    const customTestModal = ref(false)
    const pauseTyping = ref(true)
    const configs = ref([])
    const allSettings = ref(false)
    const hideElements = ref(isMobile() ? true : false)
    const cursorType = ref('border')
    const difficulty = ref('beginner')
    const backspace = ref(true)
    const repeat = ref(false)
    const capslock = ref(true)
    const textPosition = ref('left')
    const blind = ref(false)
    const font = ref(32)
    const range = ref((font.value - 16) / 0.26)
    const toggleCapsToast = ref(false)
    const customTestLength = ref(200)
    const useCustomLength = ref(false)
    const switchMode = ref(false)
    const doubleEachWord = ref(false)
    const textLines = ref(3)
    
    const customizers = ref({
        'stop-on-error': false,
        'test-length': 'auto',
        'words-type': 'frequent', 
        'cursor': 'border',
        'test-type': 'words',
        'caps': false,
        'punctuation': false,
        'numbers': false,
        'all-caps': false,
        'backspace': true,
        'blind-mode': false,
        'camel-case': false,
        'no-space': false,
        'movie-quotes': false,
        'author-quotes': false,
        'blur': false,
    })

    const disableOption = ref({
        'test-length' : false,
        'words-type': false, 
        'test-type': false,
        'caps': false, 
        'punctuation': false,
        'numbers': false
    })

    const allOptions = ref({
        'test-length' : isTouchScreenDevice() ? ['auto', 10, 20, 30 ] : ['auto', 10, 20, 30, 50,  100],
        'words-type' : ['frequent', 'common', 'rare'],
        'test-type' : ['quotes', 'words', 'custom'],
        'caps' : ['caps'],
        'punctuation' : ['punctuations'],
        'numbers' : ['numbers'],
        'all-caps' : ['all caps'],
        'camel-case' : ['custom camel case'],
        'no-space' : ['no space'],
    })

    const changeConfiguration = (group, selection) => {
        if (customizers.value[group] === selection) customizers.value[group] = ''
        else customizers.value[group] = selection

        if (customizers.value['test-type'] === 'quotes' || customizers.value['test-type'] === 'custom') {
            disableOption.value['words-type'] = true
            disableOption.value['numbers'] = true

            if (customizers.value['test-type'] === 'custom') {
                disableOption.value['test-length'] = true
            } else {
                disableOption.value['test-length'] = false
            }
        }
        
        else if (customizers.value['test-type'] === 'words') {
            disableOption.value['words-type'] = false
            disableOption.value['numbers'] = false
            disableOption.value['test-length'] = false
        }

        let config = [customizers.value, disableOption.value]
        updateDB(Object.keys({config})[0], config)
    }

    const useConfig = () => {
        let currentWordType = customizers.value['words-type']
        let currentTestType = customizers.value['test-type']
        let currentTextLength = customizers.value['test-length']
        let selection = +configs.value[1] || configs.value[1]
        let group = configs.value[0]
        testType_.value = customizers.value['test-type']

        if ((typeof configs.value[1] === 'number' && configs.value[0] === 'test-length' ) || configs.value[1] === 'words') {
            customizers.value['movie-quotes'] = false
            customizers.value['author-quotes'] = false
        }

        if (selection === currentWordType || selection === currentTestType || selection === currentTextLength) return

        changeConfiguration(group, selection)    
    }

    const customize = (mode, boolean) => {
        if (boolean && mode === 'all-caps') customizers.value['camel-case'] = false
        if (boolean && mode === 'camel-case') customizers.value['all-caps'] = false

        if (mode === 'author-quotes' || mode === 'movie-quotes') {
            customizers.value['test-length'] = 'auto'
            customizers.value['test-type'] = 'quotes'
        }

        let config = [customizers.value, disableOption.value]
        updateDB(Object.keys({config})[0], config)
    }

    return {
        count,
        disableOption,
        doubleEachWord,
        difficulty,
        textLines,
        configs,
        cursorType,
        allSettings,
        customizers,
        allOptions,
        hideElements,
        backspace,
        switchMode,
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
        userSelectedTest,
        testType_,
        capslock,
        toggleCapsToast,
        customTestLength,
        useCustomLength,
    }
})