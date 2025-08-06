import { mainStore } from "../store/mainStore"
import {settingsStore} from "../store/settingsStore"
import { storeToRefs } from "pinia"
import { computed } from "vue"

export function validateTestLines(onMounted) {
    const settingstore = settingsStore()
    const {updateSingleSetting} = settingstore

    const {settings, testHeight, contentFitHeight, lineHeight, testLines} = storeToRefs(settingstore)

    const {testEl, testContainerEl} = storeToRefs(mainStore())

    const font = computed(() => settings.value.fontsize)

    if (!(testEl.value instanceof HTMLElement)) return

    const parentBottom = testContainerEl.value.getBoundingClientRect().bottom
    const testTop = testEl.value.getBoundingClientRect().top
    const testBottom = testEl.value.getBoundingClientRect().bottom
    const testOutOfview = testBottom > parentBottom
        
    if (testOutOfview || onMounted) {        
        let fontHeight = lineHeight.value * settings.value.fontsize
        let height = (parentBottom - testTop)
        let offsetHeight = height % (lineHeight.value * font.value)
        testHeight.value = height - offsetHeight
        contentFitHeight.value = Math.min(fontHeight * testLines.value, testHeight.value)  
        testLines.value = contentFitHeight.value / fontHeight
        updateSingleSetting('test-lines', testLines.value)
    }
}