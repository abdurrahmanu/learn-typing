import {defineStore, storeToRefs} from 'pinia'
import {ref, computed} from 'vue'
import { isMobile } from '../composables/isMobile'
import { settingsStore } from './settingsStore'

export const mainStore = defineStore('mainStore', () => {
    const route = ref(null)
    const demo = ref(false)
    const minFontSize = ref(25)
    const maxFontSize = ref(isMobile() ? 50 : 120)
    const lineHeight = ref(1.5)
    const charWidth = ref(20)
    
    const settingstore = settingsStore()
    const {settings} = storeToRefs(settingstore)
    const {updateSingleSetting} = settingstore
    
    const fontSize = computed(() => settings.value.fontsize)
    const testLines = computed(() => settings.value['test-lines'])
    const testWidth = computed(() => settings.value['test-width'])
    
    const range = ref(fontSize.value)
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
        return (fontSize.value * lineHeight.value) * testLines.value
    })

    const testStyle = computed(() => {
        return {
            'font-size': fontSize.value + 'px',
            'line-height': lineHeight.value,
            'height': `fit-content`,
            'max-height': containerHeight.value + 'px',
            'width': `${(testWidth.value * charWidth.value).toFixed(0)}px`,
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
            updateSingleSetting('test-lines', numberOfLines - 1)
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
        scrollTextContainer,
        currentTest,
        allSpacesIndex,
        useCustomText,
        storedTest,
        customTests,
        charWidth,
    }
})