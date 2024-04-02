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

    const tempCustomizers = ref({
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

    const useConfig = (boolean) => {
        if (boolean) changeConfiguration(configurationArgs.value[0], configurationArgs.value[1])
        configChange.value  = false
    }

    return {
        typeBlindly,
        noSpace,
        customCamelCase,
        allCaps,
        typingCountdown,
        beginCountdown,
        enableBackSpace,
        configurationArgs,
        showMoreSettings,
        configChange,
        tempCustomizers,
        customizers,
        allOptions,
        changeConfiguration,
        useConfig, 
    }
})




