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
    const selectedCustomizers = ref({
        0: 'auto',
        1: 'most-used', 
        2: 'random-text',
        3: '',
        4: '',
        5: '',
        6: false,
        7: false,
        8: false,
        9: false,
        10: false
    })
    
    const temporaryCustomizers = ref({
        0: 'auto',
        1: 'most-used', 
        2: 'random-text',
        3: '',
        4: '',
        5: '',
        6: false,
        7: false,
        8: false,
        9: false,
        10: false
    })

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

    const changeConfiguration = (opt, listIndex) => {
        if (selectedCustomizers.value[listIndex] === opt) selectedCustomizers.value[listIndex] = ''
        else selectedCustomizers.value[listIndex] = opt
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
        temporaryCustomizers,
        selectedCustomizers,
        configurationArgs,
        showMoreSettings,
        configChange,
        tempCustomizers,
        customizers,
        changeConfiguration,
        useConfig, 
    }
})




