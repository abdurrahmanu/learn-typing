<template>
    <div class="p-5 space-y-10 text-sm text-slate-500">
        <div class="w-[500px] overflow-auto max-w-[90%] h-[250px] border border-neutral-700 m-auto relative bg-slate-200">
            <!-- <div  class="absolute bottom-0 w-[2px]" v-for="(sessionWpm, index) in wpm" :key="index" :style="{height: sessionWpm + 3 + 'px', 'margin-left' : 20 * index + 'px'}">
                <span v-if="hovered === index" class="absolute top-[-15px] text-black text-xs whitespace-nowrap z-[9]">{{ sessionWpm }} wpm</span>
                <span hover(index)" @mouseleave="blur(index)" :class="[sessionWpm < 50 ? 'bg-red-500' : 'bg-green-500']" class="p-[3px] absolute top-0 rounded-full left-[50%] translate-x-[-50%]"></span>
            </div> -->
        </div>
        <div class="max-h-[300px] m-auto w-fit">
            <div class="flex max-w-full py-1 m-auto mx-auto space-x-1 overflow-auto h-fit scrollbar">
                <div v-if="tooltip != null" class="space-y-1 min-w-[270px] w-fit border rounded-md border-black h-fit p-2">
                    <div>TOTAL TIME- {{selected.totalTime }}s</div>
                    <div class="whitespace-nowrap">NUMBER OF CHARACTERS- {{selected.characters}}</div>
                    <div>CORRECT INPUTS- {{selected.correctCharCount}}</div>
                    <div>WRONG INPUTS- {{selected.incorrectCharCount}}</div>
                    <div>WPM- {{ selected.WPM }}</div>
                    <div class="space-y-2">
                        <div class=" rounded-md w-fit whitespace-nowrap">{{selected.currentTest.slice(0, 30)}}...<span class="text-xs border border-black rounded-full px-5 py-[2px] text-black">more</span></div>
                        <div class="text-xs bg-blue-500 rounded-full px-5 py-[2px] w-fit text-white m-auto">REPLAY</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p class="text-xl text-center">HISTORY</p>
</template>

<script setup>
import {ref} from 'vue'
const selected = ref({})
const wpm = allResults.map(result => {
    return result.WPM
})

const hovered = ref(null)
const tooltip = ref(null)

const hover = (index) => {
    tooltip.value = index
    hovered.value = index
    selected.value = allResults[index]
}

const blur = () => {
    hovered.value = null
}
</script>

<style scoped>
::-webkit-scrollbar {
    height: 5px;
}

::-webkit-scrollbar-track {
    background: black;
}

::-webkit-scrollbar-thumb {
    background: rgb(22, 160, 12);
    border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
    background:  rgb(20, 146, 62);
}
</style>