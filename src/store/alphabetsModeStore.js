import {defineStore} from 'pinia'
import {ref} from 'vue'

export const alphabetsStore = defineStore('alphabetsStore', () => {
    const containerText = ref('')
    const alphabetsMode_ = ref(false)
    const shiftKey = ref(false)
    const useAlphabetCombination = ref(false)
    const alphabetsCombination = ref([]) // Alphabets combination for typing
    const alphabetsConfig = ref({ // Alphabets mode config
        uppercase: false,
        customCase: false,
        random: false,
        backwards: false,
        spaced: false,
        styled: false,
        demo: false,
    })

    return {
        useAlphabetCombination,
        alphabetsCombination,
        containerText,
        alphabetsConfig,
        alphabetsMode_,
        shiftKey,
    }
})