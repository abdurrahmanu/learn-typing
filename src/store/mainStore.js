import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const mainStore = defineStore('mainStore', () => {
    const route = ref(null)
    const demo = ref(false)
    const font = ref(30)
    const range = ref((font.value - 16) / 0.26)
    const textLines = ref(10)
    const lineHeight = ref(1.5)
    const testWidth = ref(20)
    const charWidth = ref(0)

    //Test container
    const testContainerEl = ref(null)
    const scrollDistance = ref(0)
    const scrollTextContainer = ref({}) // Scroll top distance {top: number}
    const currentTest = ref({
        author: '',
        name: '',
        test: '',
    }) 

    const allSpacesIndex = ref([])
    const useCustomText = ref(false)
    const storedTest = ref('')

    const customTests = ref({
        'demo': 'This is a custom test, you can add your own test, use the plus icon. This particular demo cannot be deleted.'
    }) 

    const containerHeight = computed(() => {
        return (font.value * lineHeight.value) * textLines.value
    })

    function validateTestLines() {
        let overflowPixels;
        const testBottom = testContainerEl.value.getBoundingClientRect().bottom
        const TestIsOutofScreenView = testBottom > window.innerHeight

        if (TestIsOutofScreenView) {
            overflowPixels = testBottom - window.innerHeight  
            let newHeight = containerHeight.value - overflowPixels
            let numberOfLines = Math.floor(newHeight / (font.value * lineHeight.value))
            textLines.value = numberOfLines  
        }   
        else {
            overflowPixels = 0
        }
    }

    const resetToDefault = () => {
        scrollDistance.value = 0
        scrollTextContainer.value = {}
        currentTest.value = {
            author: '',
            name: '',
            test: '',
        }
        allSpacesIndex.value = []
    }

    return {
        resetToDefault,
        validateTestLines,
        route,
        font,
        range,
        demo,
        testContainerEl,
        containerHeight,
        scrollDistance,
        lineHeight,
        textLines,
        scrollTextContainer,
        currentTest,
        allSpacesIndex,
        useCustomText,
        storedTest,
        customTests,
        testWidth,
        charWidth,
    }
})