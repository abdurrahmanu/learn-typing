import {ref} from 'vue'
import { customizeStore } from '../store/customizeStore'
import { storeToRefs } from 'pinia'

export const kiboardObj = () => {
    const customize = customizeStore()
    const {customizers, disableOption} = storeToRefs(customize)

    const kiboardObject = ref({
        difficulty: 'beginner',
        customTests: {'demo': 'This is a custom test, you can add your own tests by pressing the plus icon. This demo test cannot be deleted'},
        config: [customizers.value, disableOption.value],
        cursor: 'cursor',
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches ?  'dark' : 'white',
        backspace: true,
        blind: false,
        fontsize: 32,
        textLines: 3,
    })

    return kiboardObject
}