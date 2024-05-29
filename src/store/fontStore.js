import {defineStore} from 'pinia'
import {ref} from 'vue'

export const fontStore = defineStore('fontStore', () => {
    const font = ref(20)
    const range = ref((font.value - 16) / 0.16)

    return {
        font, 
        range,
    }
})




