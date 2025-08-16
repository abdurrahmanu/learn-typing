<template>
    <div :class="[theme === 'dark' ? 'ring-white' : 'ring-black']" class='container'>
        <div 
        v-for="(color, index) in colors" 
        :key="index" 
        @click="toggleTheme(color)" 
        :class="[bg[index]]"
        class="color">
        </div>
    </div>
</template>

<script setup>
const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const settingstore = settingsStore()
const {settingsToUpdate} = storeToRefs(settingstore)

const colors = ref([
    'dark',
    'white',
])
const bg = ref([
    'bg-[#2c2e31]',
    'bg-white',
])

const toggleTheme = (color) => {
    theme.value = color
    settingsToUpdate.value.push({
        name: Object.keys({theme})[0],
        value: theme.value
    })
}
</script>

<style scoped>
.container {
    @apply flex gap-1 rounded-full p-[3px] w-fit ring-[2px] h-fit bg-neutral-400
}

.color {
    @apply block w-5 cursor-pointer ring-[1px] ring-black h-4 rounded-full
}
</style>
