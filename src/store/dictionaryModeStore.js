import {defineStore} from 'pinia'
import {ref} from 'vue'

export const dictionaryStore = defineStore('dictionaryStore', () => {
    //Dictionary mode states
    const containerText = ref('')
    const dictionaryMode_ = ref(false)
    const searchWord = ref('')
    const searchInputEl = ref(null) // Search Element
    const searchFieldIsFocused = ref(false)
    const allDictionaryDefinitons = ref({}) // Fetched definitions
    const dictionaryData = ref({ // Fetched data
        wordData: '',
        message: '',
        error: ''
    })
    const resetAlphabetModeToDefault = () => {
        dictionaryData.value = {
            wordData: '',
            message: '',
            error: ''
        }
    }

    const generateDictionaryTest = () => {
        console.log(dictionaryData.value);
        if (dictionaryData.value.wordData.length) {
            for (let index = 0; index < dictionaryData.value.wordData.length; index++) {
                const {definitions} = dictionaryData.value.wordData[index]
                allDictionaryDefinitons.value[dictionaryData.value.wordData[index].partOfSpeech] = definitions.map((data) => data.definition )
            }
            let randomPartOfSpeech = Math.ceil(Math.random() * dictionaryData.value.wordData.length) - 1
            let randomDefiniton = Math.ceil(Math.random() * Object.values(allDictionaryDefinitons.value)[randomPartOfSpeech].length) - 1
            containerText.value = Object.values(allDictionaryDefinitons.value)[randomPartOfSpeech][randomDefiniton] || 'Nothing to show'
        } else {
            containerText.value = dictionaryData.value.error || dictionaryData.value.message
        }

        return containerText.value
    }

    return {
        generateDictionaryTest,
        resetAlphabetModeToDefault,
        dictionaryMode_,
        searchWord,
        searchInputEl,
        searchFieldIsFocused,
        allDictionaryDefinitons,
        dictionaryData,
        containerText,
    }
})