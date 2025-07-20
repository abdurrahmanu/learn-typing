import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const mainStore = defineStore('mainStore', () => {
    const route = ref(null)
    const quoteType = ref('')
    const demo = ref(false)
    const keyboardMode = ref(false)

    //Test container
    const testContainerEl = ref(null)
    const containerHeight = ref(0)
    const scrollDistance = ref(0) // Container scroll Y axis
    const scrollTextContainer = ref({}) // Scroll top distance {top: number}
    const currentTest = ref('') // Test
    const customLengthInput = ref(null)

    //keys states
    const allSpacesIndex = ref([])
    const pulseAnimate = ref(false)

    const hasCompletedSession = ref(false)
    const useCustomText = ref(false) // user custom text
    const storedTest = ref('') // test to repeat
    const howToUseCustomText = ref('select text using options')

    // data for quotes 
    const movie = ref({})
    const customTests = ref({'demo': 'This is a custom test, you can add your own test, use the plus icon. This particular demo cannot be deleted.'}) 
    const authoredQuote = ref({})

    const resetToDefault = () => {
        scrollDistance.value = 0
        scrollTextContainer.value = {}
        hasCompletedSession.value = false
        currentTest.value = ''
        allSpacesIndex.value = []
    }

    return {
        resetToDefault,
        quoteType,
        route,
        customLengthInput,
        focus,
        demo,
        keyboardMode,

        testContainerEl,
        containerHeight,
        scrollDistance,
        scrollTextContainer,
        currentTest ,

        hasCompletedSession,
        allSpacesIndex,
        pulseAnimate,

        useCustomText,
        storedTest,
        howToUseCustomText,

        movie,
        customTests,
        authoredQuote,
    }
})