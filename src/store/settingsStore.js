import {defineStore, storeToRefs} from 'pinia'
import {ref, computed} from 'vue'
import { isMobile } from '../composables/isMobile'
import { mainStore } from './mainStore'
import { nextStore } from './nextStore'

export const settingsStore = defineStore('settingsStore', () => {
    const settingsToUpdate = ref([])
    const customChoice = ref('')
    const toggleCustomTestModal = ref(false)
    const pauseTyping = ref(true)
    const hideElements = ref(isMobile() ? true : false)
    const cursorType = ref('border')
    const difficulty = ref('beginner')
    const backspace = ref(true)
    const repeat = ref(false)
    const textPosition = ref('left')
    const blind = ref(false)
    const toggleCapsToast = ref(false)
    const mixCharacters = ref(false)
    const charsArray = ref([])
    const showBorder = ref(false)
    
    const mainstore = mainStore()
    const {route} = storeToRefs(mainstore)

    const nextstore = nextStore()
    const {goNext} = storeToRefs(nextstore)

    const isBlindMode = computed(() => {
        return blind.value && route.value === 'home'
    })

    const settings = ref({
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
        'words-type': false, 
    })

    const quickSettingss = computed(() => {
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
        if (settings.value[group] === selection) settings.value[group] = ''
        else settings.value[group] = selection

        if (settings.value['test-type'] !=='words') {
            disableOption.value['words-type'] = true
        } else {
            disableOption.value['words-type'] = false
        }

        let config = settings.value
        goNext.value = true

        settingsToUpdate.value.push({
            name: Object.keys({config})[0],
            value: config
        })
    }

    const checkQuickSettings = (option, key) => {
        let selection = +key || key
        let group = option
        let arr = ['arrangement', 'case', 'spaced']

        if (arr.includes(group)) {       
            if (selection === 'uppercase') {
                if (settings.value['randomcase']) settings.value['randomcase'] = false
            }
          
            if (selection === 'randomcase') {
                if (settings.value['uppercase']) settings.value['uppercase'] = false
            }
          
            if (selection === 'reverse') {
                if (settings.value['jumble']) settings.value['jumble'] = false
            }
            
            if (selection === 'jumble') {
                if (settings.value['reverse']) settings.value['reverse'] = false
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
            settings.value['blur'] = newVal
        }
        else if (setting === 'caps lock') {
            settings.value['capslock'] = newVal
        }
        else if (setting === 'countdown') {
            settings.value['timer'] = newVal
        }
        else if (setting === 'custom case') {
            settings.value['camel-case'] = newVal
        }
        else if (setting === 'double words') {
            settings.value['double-words'] = newVal
        }
        else if (setting === 'no space') {
            settings.value['no-space'] = newVal
        }
        else if (setting === 'stop on error') {
            if (!backspace.value) settings.value['stop-on-error'] = false
            settings.value['stop-on-error'] = newVal
        }
        else if (setting === 'uppercase') {
            settings.value['all-caps'] = newVal
        }
        else if (setting === 'show border') {
            showBorder.value = newVal
        }

        settingsToUpdate.value.push({
            name: setting,
            value: newVal
        })
    }

    return {
        disableOption,
        difficulty,
        cursorType,
        showBorder,
        settings,
        quickSettingss,
        hideElements,
        backspace,
        blind,
        checkQuickSettings, 
        updateSingleSetting,
        repeat,
        textPosition,
        pauseTyping,
        toggleCustomTestModal,
        customChoice,
        toggleCapsToast,
        charsArray,
        mixCharacters,
        isBlindMode,
        settingsToUpdate,
    }
})