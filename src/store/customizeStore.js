import {defineStore, storeToRefs} from 'pinia'
import {ref, computed} from 'vue'
import { isMobile } from '../composables/isMobile'
import { mainStore } from './mainStore'
import { nextStore } from './nextStore'

export const customizeStore = defineStore('customizeStore', () => {
    const settingsToUpdate = ref([])
    const count = ref(false)
    const testType_ = ref('words')
    const customChoice = ref('')
    const toggleCustomTestModal = ref(false)
    const pauseTyping = ref(true)
    const configs = ref([])
    const showSettings = ref(false)
    const hideElements = ref(isMobile() ? true : false)
    const cursorType = ref('border')
    const difficulty = ref('beginner')
    const backspace = ref(true)
    const repeat = ref(false)
    const textPosition = ref('left')
    const blind = ref(false)
    const font = ref(32)
    const range = ref((font.value - 16) / 0.26)
    const toggleCapsToast = ref(false)
    const customTestLength = ref(200)
    const useCustomLength = ref(false)
    const textLines = ref(3)
    const shiftKey = ref(false)
    const mixCharacters = ref(false)
    const charsArray = ref([])

    const mainstore = mainStore()
    const {route} = storeToRefs(mainstore)

    const nextstore = nextStore()
    const {goNext} = storeToRefs(nextstore)

    const isBlindMode = computed(() => {
        return blind.value && route.value === 'home'
    })

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
        'camel-case': false,
        'no-space': false,
        'blur': false,
        'spaced': false,
        'case': '',
        'arrangement': '',
        'double-words': false,
        'capslock': true,
        'timer': false,
    })

    const disableOption = ref({
        'test-length' : false,
        'words-type': false, 
        'test-type': false,
        'caps': false, 
        'punctuation': false,
        'numbers': false,
        'case': customizers.value['test-type'] === 'characters' ? true : false,
        'arrangement': customizers.value['test-type'] === 'characters' ? true : false,
        'spaced': customizers.value['test-type'] === 'characters' ? true : false,
    })

    const quickSettingsGroups = computed(() => {
        return {
        'test-length' : isMobile() ? ['auto', 10, 20, 30 ] : ['auto', 10, 20, 30, 50, 100],
        'test-type' : ['quotes', 'words', 'custom', 'characters'],
        'words-type' : ['frequent', 'common', 'rare'],
        'caps' : ['caps'],
        'punctuation' : ['punctuations'],
        'numbers' : ['numbers'],
        'arrangement': ['reverse', 'jumble'],
        'spaced': ['space'],
        }
    })

    const changeQuickSettings = (group, selection) => {
        if (customizers.value[group] === selection) customizers.value[group] = ''
        else customizers.value[group] = selection

        if (customizers.value['test-type'] !=='words') {
            disableOption.value['words-type'] = true
        } else {
            disableOption.value['words-type'] = false
        }

        let config = [customizers.value, disableOption.value]
        goNext.value = true

        settingsToUpdate.value.push({
            name: Object.keys({config})[0],
            value: config
        })
    }

    const checkQuickSettings = () => {
        testType_.value = customizers.value['test-type']
        let selection = +configs.value[1] || configs.value[1]
        let group = configs.value[0]
        let arr = ['arrangement', 'case', 'spaced']

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

        changeQuickSettings(group, selection)   
    }

    const updateSingleSetting = (setting, newVal) => {
        setting = setting.toLowerCase()

        if (setting === 'backspace') {
            backspace.value = newVal
        }
        else if (setting === 'blind mode') {
            blind.value = newVal
        }
        else if (setting === 'blur') {
            customizers.value['blur'] = newVal
        }
        else if (setting === 'caps lock') {
            customizers.value['capslock'] = newVal
        }
        else if (setting === 'countdown') {
            customizers.value['timer'] = newVal
        }
        else if (setting === 'custom case') {
            customizers.value['camel-case'] = newVal
        }
        else if (setting === 'double words') {
            customizers.value['double-words'] = newVal
        }
        else if (setting === 'no space') {
            customizers.value['no-space'] = newVal
        }
        else if (setting === 'stop on error') {
            if (!backspace.value) customizers.value['stop-on-error'] = false
            customizers.value['stop-on-error'] = newVal
        }
        else if (setting === 'uppercase') {
            customizers.value['all-caps'] = newVal
        }
        // if (setting === 'font size') {
            
        // }
        // if (setting === 'text lines') {
            
        // }
        // if (setting === 'cursor') {
            
        // }
        // if (setting === 'difficulty') {
            
        // }

        settingsToUpdate.value.push({
            name: setting,
            value: newVal
        })
    }

    return {
        count,
        disableOption,
        difficulty,
        textLines,
        configs,
        cursorType,
        showSettings,
        customizers,
        quickSettingsGroups,
        hideElements,
        backspace,
        blind,
        checkQuickSettings, 
        updateSingleSetting,
        font, 
        range,
        repeat,
        textPosition,
        pauseTyping,
        toggleCustomTestModal,
        customChoice,
        testType_,
        toggleCapsToast,
        customTestLength,
        useCustomLength,
        shiftKey,
        charsArray,
        mixCharacters,
        isBlindMode,
        settingsToUpdate,
    }
})