import {defineStore, storeToRefs} from 'pinia'
import {ref, computed} from 'vue'
import { isMobile } from '../composables/isMobile'
import { mainStore } from './mainStore'
import { nextStore } from './nextStore'

export const settingsStore = defineStore('settingsStore', () => {
    const settingsToUpdate = ref([])
    const customChoice = ref('')
    const toggleCustomModal = ref(false)
    const pauseTyping = ref(true)
    const hideElements = ref(isMobile() ? true : false)
    const difficulty = ref('beginner')
    const textPosition = ref('left')
    const toggleCapsToast = ref(false)
    const useCharacters = ref(false)
    const charsArray = ref([])
    const showBorder = ref(false)
    
    const mainstore = mainStore()
    const {route} = storeToRefs(mainstore)

    const nextstore = nextStore()
    const {goNext} = storeToRefs(nextstore)

    const settings = ref({
        'cursor': 'border',
        'repeat': false,
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
        'countdown': false,
        'blind-mode': false,
    })

    const isBlindMode = computed(() => {
        return settings.value['blind-mode'] && route.value === 'home'
    })

    const disableOption = ref({
        'words-type': false, 
        'test-length': false,
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

    const toggleQuickSetting = (group, selection) => {
        if (settings.value[group] === selection) settings.value[group] = ''
        else settings.value[group] = selection

        if (settings.value['test-type'] !=='words') {
            disableOption.value['test-length'] = true
            disableOption.value['words-type'] = true
        } else {            
            disableOption.value['test-length'] = false
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
        let selection = isFinite(key) ? +key : key
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

        toggleQuickSetting(group, selection)   
    }

    const updateSingleSetting = (setting, newVal) => {
        setting = setting.toLowerCase()

        if (setting in settings.value) {
            settings.value[setting] = newVal
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
        showBorder,
        settings,
        quickSettingss,
        hideElements,
        checkQuickSettings, 
        updateSingleSetting,
        textPosition,
        pauseTyping,
        toggleCustomModal,
        customChoice,
        toggleCapsToast,
        charsArray,
        useCharacters,
        isBlindMode,
        settingsToUpdate,
    }
})