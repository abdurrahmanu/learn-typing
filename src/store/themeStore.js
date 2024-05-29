import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const themeStore = defineStore('themeStore', () => {
    const theme = ref('neutral')
    const appTheme = computed(() => {
        if (theme.value === 'stone') return 'bg-stone-600 text-black'
        if (theme.value === 'blue') return 'bg-blue-400 text-neutral-600'
        if (theme.value === 'lime') return 'bg-lime-300 text-black'
        if (theme.value === 'teal') return 'bg-teal-700 text-slate-900'
        if (theme.value === 'sky') return 'bg-sky-400 text-zinc-900'
        if (theme.value === 'fuschia') return 'bg-fuschia-600 text-black'
        if (theme.value === 'emerald') return 'bg-emerald-400 text-black'
        if (theme.value === 'neutral') return 'bg-neutral-900 text-slate-200'
        if (theme.value === 'white') return 'bg-slate-200 text-neutral-700'
    })

    const svgFill = computed(() => {
        if (theme.value === 'stone') return 'white'
        if (theme.value === 'blue') return 'black'
        if (theme.value === 'lime') return 'black'
        if (theme.value === 'teal') return 'white '
        if (theme.value === 'sky') return 'black'
        if (theme.value === 'fuschia') return 'black'
        if (theme.value === 'emerald') return 'black'
        if (theme.value === 'neutral') return 'white'
        if (theme.value === 'white') return 'black '
    })


    return {
        theme,
        appTheme,
        svgFill,
    }
})




