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
    const textPosition = ref('justify')
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
        'modes': 'word-test',
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
        'case': customizers.value['modes'] === 'word-test' ? true : false,
        'arrangement': customizers.value['modes'] === 'word-test' ? true : false,
        'spaced': customizers.value['modes'] === 'word-test' ? true : false,
    })

    const quickSettingsGroups = computed(() => {
        return {
        // For word-test
        'test-length' : isMobile() || customizers.value['test-type'] === 'quotes' ? ['auto', 10, 20, 30 ] : customizers.value['test-type'] === 'custom' ? ['auto'] : ['auto', 10, 20, 30, 50, 100],
        'words-type' : ['frequent', 'common', 'rare'],
        'test-type' : ['quotes', 'words', 'custom'],
        'caps' : ['caps'],
        'punctuation' : ['punctuations'],
        'numbers' : ['numbers'],
        // 'all-caps' : ['all caps'],
        // 'no-space' : ['no space'],
        // 'camel-case' : ['custom case'],
        'modes': ['word-test', 'alphabet-test'],
        // For alphabet-test
        'case': ['randomcase', 'uppercase'],
        'arrangement': ['reverse', 'jumble'],
        'spaced': ['space'],
        }
    })

    const changeQuickSettings = (group, selection) => {
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

        if (customizers.value['test-type'] === 'quotes' || customizers.value['test-type'] === 'custom') {
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

    const settingsPage = () => {
        showSettings.value = !showSettings.value
        if (showSettings.value) pauseTyping.value = true
        else pauseTyping.value = false
    }

    const changeSettings = (mode, boolean) => {
        let booleanSwap = ['all-caps', 'camel-case', 'double-words', 'capslock', 'countdown', 'blur', 'stop-on-error', 'no-space']

        if (boolean && booleanSwap.includes(mode)) customizers.value[mode] = false
        if (!boolean && booleanSwap.includes(mode)) customizers.value[mode] = true

        let config = [customizers.value, disableOption.value]
        goNext.value = true

        settingsToUpdate.value.push({
            name: Object.keys({config})[0],
            value: config
        })
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
        changeSettings,
        settingsPage,
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