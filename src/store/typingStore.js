import {defineStore} from 'pinia'
import {ref} from 'vue'

export const typingStore = defineStore('typingStore', () => {
    const customizeSettingsProp = ref([])
    const goToProgressPage = ref(false)
    const startedTyping = ref(false)
    const completionLevel = ref(0)
    const customizeProp = ref([])
    const focusInput = ref(false)
    const containerText = ref('')
    const restart = ref(false)
    const textAlign = ref('')
    const next = ref(false)
    const result = ref(null)

    const switchNext = () => {
        next.value = true
        setTimeout(() => {    
            next.value = false
        }, 0);
    }

    return {
        next,
        customizeProp,
        containerText,
        completionLevel,
        focusInput,
        customizeSettingsProp,
        textAlign,
        result,
        restart,
        startedTyping,
        goToProgressPage,
        switchNext,
    }
})