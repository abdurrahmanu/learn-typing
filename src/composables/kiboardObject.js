import {ref} from 'vue'
import { customizeStore } from '../store/customizeStore'
import { storeToRefs } from 'pinia'

export const kiboardObj = () => {
    const customize = customizeStore()
    const {customizers, disableOption} = storeToRefs(customize)

    const kiboardObject = ref({
        difficulty: 'beginner',
        doubleEachWord: false,
        capslock: true,
        customTests: {'demo': 'This is a custom test, you can add your own tests by pressing the plus icon. This demo test cannot be deleted'},
        config: [customizers.value, disableOption.value],
        cursor: 'border',
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches ?  'dark' : 'white',
        backspace: true,
        blind: false,
        mode: 'auto',
        hide: true,
        fontsize: 32,
        alphabetsCombo: false,
        alphabetsCombination: [],
    })

    return kiboardObject
}



