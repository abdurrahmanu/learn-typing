<template>
    <div class="cursor-default bg-inherit py-10 px-4 text-lg space-y-4 flex-1">
        <p class="header">STATISTICS</p>
        <div class="difficulty-badge" :class="[difficultyStyle]">{{ settings.difficulty }}</div>
        <div
            class="stats-grid">
            <div :key="index" v-for="(sectionValue, sectionKey, index) in resultSections" class="stat">
            <div class="stat-key">{{ sectionKey }}</div>
            <p class="stat-value">{{ Array.isArray(sectionValue) ? sectionValue[0] : sectionValue }}</p>

            <div v-if="Array.isArray(sectionValue)" class="mt-3 flex justify-center">
                <pass v-if="sectionValue[1]" class="w-6 text-emerald-500" />
                <fail v-else />
            </div>
            </div>
        </div>
    <!-- <LineChart :wpm="wpmPerSecond" /> -->
    </div>
</template>

<script setup>
const resultstore = resultStore()
const {resultSections, difficultyStyle} = storeToRefs(resultstore)

const settingstore = settingsStore()
const { settings} = storeToRefs(settingstore)
</script>

<style scoped>
.header {
    @apply text-3xl text-center font-mono font-bold text-slate-500 tracking-wide
}

.difficulty-badge {
    @apply px-5 py-1.5 uppercase rounded-full cursor-pointer w-fit mx-auto text-sm font-medium shadow-sm transition-all duration-200 bg-gradient-to-r from-indigo-500 to-purple-500 text-white
}

.stats-grid {
    @apply max-w-[1000px] flex flex-wrap w-[90%] gap-5 mx-auto justify-center
}

.stat {
    @apply space-y-2 p-4 text-center rounded-2xl shadow-md bg-slate-200 dark:bg-zinc-800 transition-all duration-200 min-w-[200px] gap-3
}

.stat-key {
    @apply uppercase font-medium text-neutral-900
}

.stat-value {
    @apply text-2xl font-bold text-slate-800 dark:text-slate-100
}
</style>




















