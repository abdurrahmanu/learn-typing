import {defineStore} from 'pinia'
import {ref} from 'vue'

export const gameStore = defineStore('gameStore', () => {
    const gameMode = ref(false)

    return {
        gameMode,
    }
})