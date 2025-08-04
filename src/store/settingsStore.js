import {defineStore, storeToRefs} from 'pinia'
import {ref, computed} from 'vue'
import { isMobile } from '../composables/isMobile'
import { nextStore } from './nextStore'

export const settingsStore = defineStore('settingsStore', () => {
    const settingsToUpdate = ref([])
    const customChoice = ref('')
    const toggleCustomModal = ref(false)
    const pauseTyping = ref(true)
    const hideElements = ref(isMobile() ? true : false)
    const textPosition = ref('left')
    const toggleCapsToast = ref(false)
    const useCharacters = ref(false)
    const charsArray = ref([])

    const nextstore = nextStore()
    const {goNext} = storeToRefs(nextstore)

    const settings = ref({
        'difficulty': 'beginner',
        'cursor': 'border',
        'repeat': false,
        'test-length': 'auto',
        'words-type': 'frequent', 
        'character-case': '',
        'cursor': 'border',
        'test-type': 'words',
        'caps': false,
        'punctuation': false,
        'numbers': false,
        'backspace': true,
        'no-space': false,
        'blur': false,
        'spaced': false,
        'case': '',
        'arrangement': '',
        'double-words': false,
        'capslock': true,
        'countdown': false,
        'blind-mode': false,
        'show-border': false,
        'test-lines': 4,
        'test-width': 50,
        'fontsize': 45,
    })


    const isBlindMode = computed(() => {
        return settings.value['blind-mode']
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

    const toggleQuickSetting = (selection, group) => {
        updateSingleSetting(group, selection)

        if (settings.value['test-type'] !=='words') {
            disableOption.value['test-length'] = true
            disableOption.value['words-type'] = true
        } else {            
            disableOption.value['test-length'] = false
            disableOption.value['words-type'] = false
        }
    }

    const checkQuickSettings = (option, key) => {
        let selection = isFinite(key) ? +key : key
        const currentUserPrefrences = [settings.value['words-type'], settings.value['test-type'], settings.value['test-length'], settings.value['test-type'] ]

        if (currentUserPrefrences.includes(selection)) return

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

        let updateSettings = ['arrangement', 'character-case', 'words-type', 'caps', 'punctuation', 'test-type', 'caps',
        'numbers', 'backspace', 'no-space','spaced', 'double-words', 'blind-mode', 'countdown', 'capslock', 'test-length']

        if (settings.value[setting] === newVal) settings.value[setting] = ''        

        else if (setting in settings.value) {
            settings.value[setting] = newVal
        }
        
        settingsToUpdate.value.push({
            name: setting,
            value: newVal
        })

        if (updateSettings.includes(setting)) goNext.value = true
    }

    return {
        disableOption,
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