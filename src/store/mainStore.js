import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const mainStore = defineStore('mainStore', () => {
    const route = ref(null)
    const demo = ref(false)
    const fontSize = ref(55)
    const minFontSize = ref(25)
    const maxFontSize = ref(120)
    const testLInes = ref(10)
    const lineHeight = ref(1.5)
    const testWidth = ref(200)
    const charWidth = ref(0)
    const range = ref(fontSize.value)

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
        return (fontSize.value * lineHeight.value) * testLInes.value
    })

    const testStyle = computed(() => {
        return {
            'font-size': fontSize.value + 'px',
            'line-height': lineHeight.value,
            'height': `fit-content`,
            'max-height': containerHeight.value + 'px',
            'width': `${testWidth.value * charWidth.value}px`,
            'max-width': '90%'
        }
    })

    function validateTestLines() {
        if (!(testContainerEl.value instanceof HTMLElement)) return
        let overflowPixels;
        const testBottom = testContainerEl.value.getBoundingClientRect().bottom
        const TestIsOutofScreenView = testBottom > window.innerHeight

        if (TestIsOutofScreenView) {
            overflowPixels = testBottom - window.innerHeight  
            let newHeight = containerHeight.value - overflowPixels
            let numberOfLines = Math.floor(newHeight / (fontSize.value * lineHeight.value))
            testLInes.value = numberOfLines - 1
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
        testStyle,
        minFontSize,
        maxFontSize,
        fontSize,
        range,
        demo,
        testContainerEl,
        containerHeight,
        scrollDistance,
        lineHeight,
        testLInes,
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