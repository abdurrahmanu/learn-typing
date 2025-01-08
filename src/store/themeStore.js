import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const themeStore = defineStore('themeStore', () => {
    const theme = ref(window.matchMedia("(prefers-color-scheme: dark)").matches ?  'dark' : 'white')
    const appTheme = computed(() => {
        if (theme.value === 'dark') return 'bg-[#2c2e31] text-slate-400'
        if (theme.value === 'white') return 'bg-gray-300 text-neutral-700'
    })

    const svgFill = computed(() => {
        if (theme.value === 'dark') return '#d4d4d4'
        if (theme.value === 'white') return 'black '
    })

    // 2c2e31;
    // 323437
    // #4d4d4
    // 8d8d8d
    // #101010

    return {
        theme,
        appTheme,
        svgFill,
    }
})




