import {ref} from 'vue'
import { storeToRefs } from 'pinia'
import {mainStore} from '../store/mainStore'
import { customizeStore } from '../store/customizeStore'

export const textBoxHeight = () => {
    const store = mainStore()
    const { containerHeight } = storeToRefs(store)

    const customize = customizeStore()
    const {font, textLines } = storeToRefs(customize)

    const div = document.createElement("div");
    const span = document.createElement('p')
    span.style.fontSize = font.value + 'px'
    span.innerText = 'A'
    span.style.lineHeight = '1.4'
    div.style.position = 'fixed'
    div.style.opacity = '0'
    div.appendChild(span)
    document.body.appendChild(div)
    const cssObject = getComputedStyle(div)
    const height = +cssObject.getPropertyValue('height').slice(0, -2)
    containerHeight.value = (height * textLines.value).toFixed(2)
    document.body.removeChild(div)
}