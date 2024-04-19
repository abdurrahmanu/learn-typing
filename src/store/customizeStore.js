import {defineStore} from 'pinia'
import {ref} from 'vue'

export const customizeStore = defineStore('customizeStore', () => {
    const configurationArgs = ref([])
    const configChange = ref(false)
    const typeBlindly = ref(false)
    const noSpace = ref(false)
    const customCamelCase = ref(false)
    const allCaps = ref(false)
    const typingCountdown = ref(false)
    const beginCountdown = ref(false)
    const enableBackSpace = ref(true)
    const showMoreSettings = ref(false)

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

    const changeConfiguration = (opt, key) => {
        if (customizers.value[key] === opt) customizers.value[key] = ''
        else customizers.value[key] = opt
    }

    const useConfig = () => {
        let wordType = customizers.value['words-type']
        let testType = customizers.value['test-type']
        let textLength = customizers.value['text-length']
        if (!customizers.value['words-type']) customizers.value['words-type'] = wordType
        if (!customizers.value['test-type']) customizers.value['test-type'] = testType
        if (!customizers.value['text-length']) customizers.value['text-length'] = textLength
        changeConfiguration(configurationArgs.value[0], configurationArgs.value[1])

        if (customizers.value['test-type'] === 'quotes') {
            disableOption.value['words-type'] = true
            disableOption.value['include-numbers'] = true
        } else {
            disableOption.value['words-type'] = false
            disableOption.value['include-numbers'] = false
        }
        configChange.value  = false
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
        configurationArgs,
        showMoreSettings,
        configChange,
        customizers,
        allOptions,
        changeConfiguration,
        useConfig, 
    }
})




