import {defineStore} from 'pinia'
import {ref} from 'vue'

export const customizeStore = defineStore('customizeStore', () => {
    const configurationArgs = ref([])
    const config = ref({})
    const configChange = ref(false)
    const selectedCustomizers = ref({
        0: 'auto',
        1: 'most-used', 
        2: 'quotes',
        3: 'caps',
        4: 'punctuations',
        5: 'numbers'
    })
    const temporaryCustomizers = ref({
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

    const useConfig = (boolean) => {
        if (boolean) {
            changeConfiguration(configurationArgs.value[0], configurationArgs.value[1])
            config.value = selectedCustomizers.value
        }

        configChange.value  = false
    }

    return {
        temporaryCustomizers,
        selectedCustomizers,
        configurationArgs,
        config,
        configChange,
        changeConfiguration,
        useConfig, 
    }
})