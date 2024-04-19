<template>
            <div class="relative">
                <div class="peer">
                    <img v-if="!timedTyping" @click="timedTyping = !timedTyping" class="h-7" src="/playTimer.svg" alt="">
                    <div v-if="timedTyping && !beginCountdown" class="flex items-center font-mono w-fit">  
                            <img @click="timedTyping = !timedTyping" class="h-7" src="/playTimer.svg" alt="">
                            <div class="flex text-xs border h-fit">
                                <div class="px-2 border-r w-fit" :class="[typingCountdown === 10 ? 'text-green-500' : 'text-slate-300']" @click="typingCountdown = 10">10s</div>
                                <div class="px-2 border-r w-fit" :class="[typingCountdown === 20 ? 'text-green-500' : 'text-slate-300']" @click="typingCountdown = 20">20s</div>
                                <div class="px-2 border-l w-fit" :class="[typingCountdown === 30 ? 'text-green-500' : 'text-slate-300']" @click="typingCountdown = 30">30s</div>
                            </div>
                    </div>
                    <div class="flex items-center gap-2" v-if="beginCountdown">
                        <img @click="timedTyping = !timedTyping" class="h-7" src="/playTimer.svg" alt="">
                        <div v-if="timedTyping && beginCountdown" class="font-mono text-lg">{{  countdown  }}</div>
                    </div>
                </div>
                <div v-if="!getMobileOS()" class="absolute bottom-[-20px] left-[50%] translate-x-[-50%] text-[9px] bg-black p-[3px] whitespace-nowrap z-[9] uppercase invisible peer-hover:visible">timer mode</div>
            </div>
</template>

<script setup>
import {ref} from 'vue'
import {storeToRefs} from 'pinia'
import { customizeStore } from '../store/customizeStore';
import {mainStore} from '../store/mainStore'

const store = mainStore()
const { typingCountdown,  timedTyping, countdown, beginCountdown} = storeToRefs(store)
const {getMobileOS} = store

</script>

<style scoped>

</style>