export const themeStore = defineStore('themeStore', () => {
    const openBackgrounds = ref(false)

    const theme = ref(window.matchMedia("(prefers-color-scheme: dark)").matches ?  'dark' : 'white')

    const appTheme = computed(() => {
        if (theme.value === 'dark') return "bg-[#121212] text-[#b9b8b8]";
        if (theme.value === 'white') return 'bg-gray-300 text-neutral-700'
    })

    const svgFill = computed(() => {
        if (theme.value === 'dark') return '#d4d4d4'
        if (theme.value === 'white') return 'black '
    })

    return {
        theme,
        appTheme,
        svgFill,
        openBackgrounds,
    }
})
