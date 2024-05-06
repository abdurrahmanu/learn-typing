import {defineStore} from 'pinia'
import {ref} from 'vue'

export const customizeStore = defineStore('customizeStore', () => {
    const configs = ref([])
    const typeBlindly = ref(false)
    const noSpace = ref(false)
    const customCamelCase = ref(false)
    const allCaps = ref(false)
    const typingCountdown = ref(false)
    const beginCountdown = ref(false)
    const enableBackSpace = ref(true)
    const showMoreSettings = ref(false)
    const hideElements = ref(false)

    const customizers = ref({
        'text-length': 'auto',
        'words-type': 'most-used', 
        'test-type': 'random-text',
        'include-caps': '',
        'include-punctuation': '',
        'include-numbers': '',
        'all-caps': allCaps.value,
        'backspace': enableBackSpace.value,
        'blind-mode': typeBlindly.value,
        'custom-camel-case': customCamelCase.value,
        'no-space': noSpace.value
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

    const allSettings = ref({
        
    })

    const changeConfiguration = (opt, key) => {
        if (customizers.value[key] === opt) customizers.value[key] = ''
        else customizers.value[key] = opt
    }

    const useConfig = () => {
        let currentWordType = customizers.value['words-type']
        let currentTestType = customizers.value['test-type']
        let currentTextLength = customizers.value['text-length']
        let clicked = configs.value[0]
        if (clicked === currentWordType || clicked === currentTestType || clicked === currentTextLength) return

        changeConfiguration(configs.value[0], configs.value[1])

        if (customizers.value['test-type'] === 'quotes') {
            disableOption.value['words-type'] = true
            disableOption.value['include-numbers'] = true
        } else {
            disableOption.value['words-type'] = false
            disableOption.value['include-numbers'] = false
        }

        localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([customizers.value, disableOption.value]))
    }

    return {
        typeBlindly,
        noSpace,
        disableOption,
        customCamelCase,
        allCaps,
        typingCountdown,
        beginCountdown,
        enableBackSpace,
        configs,
        showMoreSettings,
        customizers,
        allOptions,
        hideElements,
        changeConfiguration,
        useConfig, 
    }
})




