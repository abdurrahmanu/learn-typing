import {defineStore} from 'pinia'
import {ref} from 'vue'
import { updateDB } from '../composables/updateDB'
import { isMobile } from '../composables/isMobile'

export const customizeStore = defineStore('customizeStore', () => {
    const count = ref(false)
    const testType_ = ref('words')
    const userSelectedTest = ref('')
    const toggleCustomTestModal = ref(false)
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
    const doubleEachWord = ref(false)
    const textLines = ref(3)
    const shiftKey = ref(false)
    const mixCharacters = ref(false)
    const mixCharactersArray = ref([])

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
        'modes': 'word-test',
        'spaced': false,
        'case': '',
        'arrangement': ''
    })

    const disableOption = ref({
        'test-length' : false,
        'words-type': false, 
        'test-type': false,
        'caps': false, 
        'punctuation': false,
        'numbers': false,
        'case': customizers.value['modes'] === 'word-test' ? true : false,
        'arrangement': customizers.value['modes'] === 'word-test' ? true : false,
        'spaced': customizers.value['modes'] === 'word-test' ? true : false,
    })

    const allOptions = ref({
        // next time I will make allOptions responsive to changes....either computed or watched...
        'test-length' : isMobile() || customizers.value['test-type'] === 'quotes' ? ['auto', 10, 20, 30 ] : ['auto', 10, 20, 30, 50,  100],
        'words-type' : ['frequent', 'common', 'rare'],
        'test-type' : ['quotes', 'words', 'custom'],
        'caps' : ['caps'],
        'punctuation' : ['punctuations'],
        'numbers' : ['numbers'],
        'all-caps' : ['all caps'],
        'camel-case' : ['custom camel case'],
        'no-space' : ['no space'],
        'modes': ['word-test', 'alphabet-test'],
        'case': ['randomcase', 'uppercase'],
        'arrangement': ['reverse', 'jumble'],
        'spaced': ['space'],
    })

    const useCustomizers = (group, selection) => {
        if (customizers.value[group] === selection) customizers.value[group] = ''
        else customizers.value[group] = selection

        if (customizers.value['test-type'] === 'quotes' || customizers.value['test-type'] === 'custom') {
            disableOption.value['words-type'] = true
            disableOption.value['numbers'] = true

            if (customizers.value['test-type'] === 'custom') disableOption.value['test-length'] = true
            else disableOption.value['test-length'] = false 
        }
        
        else if (customizers.value['test-type'] === 'words') {
            disableOption.value['words-type'] = false
            disableOption.value['numbers'] = false
            disableOption.value['test-length'] = false
        }

        if (customizers.value['modes'] === 'word-test') {
            disableOption.value['spaced'] = true
            disableOption.value['case'] = true
            disableOption.value['arrangement'] = true
            disableOption.value['numbers'] = false
            disableOption.value['caps'] = false
            disableOption.value['punctuation'] = false
            disableOption.value['test-length'] = false
            disableOption.value['words-type'] = false
            disableOption.value['test-type'] = false
        }
        
        else if (customizers.value['modes'] === 'alphabet-test') {
            disableOption.value['spaced'] = false
            disableOption.value['case'] = false
            disableOption.value['arrangement'] = false
            disableOption.value['numbers'] = true
            disableOption.value['caps'] = true
            disableOption.value['punctuation'] = true
            disableOption.value['test-length'] = true
            disableOption.value['words-type'] = true
            disableOption.value['test-type'] = true
        }

        let config = [customizers.value, disableOption.value]
        updateDB(Object.keys({config})[0], config, null, true)
    }

    const changeConfig = () => {
        testType_.value = customizers.value['test-type']
        let selection = +configs.value[1] || configs.value[1]
        let group = configs.value[0]
        let arr = ['arrangement', 'case', 'spaced']

        if ((typeof configs.value[1] === 'number' && configs.value[0] === 'test-length' ) || configs.value[1] === 'words') {
            customizers.value['movie-quotes'] = false
            customizers.value['author-quotes'] = false
        }

        if (arr.includes(group)) {       
            if (selection === 'uppercase') {
                if (customizers.value['randomcase']) customizers.value['randomcase'] = false
            }
          
            if (selection === 'randomcase') {
                if (customizers.value['uppercase']) customizers.value['uppercase'] = false
            }
          
            if (selection === 'reverse') {
                if (customizers.value['jumble']) customizers.value['jumble'] = false
            }
            
            if (selection === 'jumble') {
                if (customizers.value['reverse']) customizers.value['reverse'] = false
            } 
        }

        useCustomizers(group, selection)   
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
        blind,
        changeConfig, 
        customize,
        font, 
        range,
        repeat,
        textPosition,
        pauseTyping,
        toggleCustomTestModal,
        userSelectedTest,
        testType_,
        capslock,
        toggleCapsToast,
        customTestLength,
        useCustomLength,
        shiftKey,
        mixCharactersArray,
        mixCharacters,
    }
})