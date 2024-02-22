import {defineStore} from 'pinia'
import {ref} from 'vue'

export const customizeStore = defineStore('customizeStore', () => {
    const selectedCustomizers = ref({
        0: 'auto',
        1: 'most-used', 
        2: 'quotes',
        3: 'caps',
        4: 'punctuations',
        5: 'numbers'
    })

    const changeConfiguration = (opt, listIndex) => {
        if (selectedCustomizers.value[listIndex] === opt) selectedCustomizers.value[listIndex] = ''
        else selectedCustomizers.value[listIndex] = opt
    }

    return {
        selectedCustomizers,
        changeConfiguration,
    }
})