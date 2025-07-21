import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const mainStore = defineStore('mainStore', () => {
    const route = ref(null)
    const demo = ref(false)

    //Test container
    const testContainerEl = ref(null)
    const containerHeight = ref(0)
    const scrollDistance = ref(0)
    const scrollTextContainer = ref({}) // Scroll top distance {top: number}
    const currentTest = ref('') 

    const allSpacesIndex = ref([])
    const useCustomText = ref(false)
    const storedTest = ref('')

    const customTests = ref({
        'demo': 'This is a custom test, you can add your own test, use the plus icon. This particular demo cannot be deleted.'
    }) 

    const resetToDefault = () => {
        scrollDistance.value = 0
        scrollTextContainer.value = {}
        currentTest.value = ''
        allSpacesIndex.value = []
    }

    return {
        resetToDefault,
        route,
        demo,
        testContainerEl,
        containerHeight,
        scrollDistance,
        scrollTextContainer,
        currentTest,
        allSpacesIndex,
        useCustomText,
        storedTest,
        customTests,
    }
})