import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const themeStore = defineStore('themeStore', () => {
    const testBackgroundColor = ref('transparent')
    const testBackground = ref('transparent')
    const theme = ref(window.matchMedia("(prefers-color-scheme: dark)").matches ?  'dark' : 'white')
    const appTheme = computed(() => {
        if (theme.value === 'dark') return 'bg-neutral-900 text-slate-300'
        if (theme.value === 'white') return 'bg-slate-200 text-neutral-700'
    })

    const svgFill = computed(() => {
        if (theme.value === 'dark') return 'white'
        if (theme.value === 'white') return 'black '
    })

    const backgrounds = ref({
        green: theme.value === 'white' ?  'bg-green-200' : 'bg-green-900',
        gray: theme.value === 'white' ?  'bg-slate-300' : 'bg-neutral-800',
        blue: theme.value === 'white' ?  'bg-blue-200' : 'bg-blue-900',
        gold: theme.value === 'white' ?  'bg-amber-200' : 'bg-amber-700',
        transparent: ''
    })

    const testBackgroundComputed = computed(() => {
        return backgrounds.value[testBackgroundColor.value]
    })

    return {
        theme,
        appTheme,
        svgFill,
        backgrounds,
        testBackground,
        testBackgroundColor,
        testBackgroundComputed,
    }
})




