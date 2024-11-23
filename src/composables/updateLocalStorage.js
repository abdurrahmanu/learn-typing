import { mainStore } from "../store/mainStore"
import {cookiesStore} from '../store/cookiesStore'
import { customizeStore } from "../store/customizeStore";
import { storeToRefs } from 'pinia';
import {ref} from 'vue'

export const updateLocalStorage = (variableName, updateVal, restart, next) => {
    const main = mainStore()
    const {switchNext} = main

    const cookies = cookiesStore()
    const {useCookies} = storeToRefs(cookies)

    const customize = customizeStore()
    const {customizers} = storeToRefs(customize)

    if (useCookies.value) {
        const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))
        localStorageSettings.value[variableName] = updateVal
        localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
    }

    if (next)  restart ? switchNext(customizers.value, 'restart') : switchNext(customizers.value)
}