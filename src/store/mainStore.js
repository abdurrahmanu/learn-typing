import {defineStore, storeToRefs} from 'pinia'
import {ref, computed} from 'vue'

export const mainStore = defineStore('mainStore', () => {
    const route = ref(null)
    const demo = ref(false)

    const testContainerEl = ref(null)
    const testEl = ref(null)
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
        route,
        demo,
        testEl,
        scrollDistance,
        scrollTextContainer,
        currentTest,
        allSpacesIndex,
        useCustomText,
        storedTest,
        customTests,
        testContainerEl,
    }
})