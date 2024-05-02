<template>
            <div class="relative">
                <div class="peer">
                    <playTimer v-if="!timedTyping" @click="timedTyping = !timedTyping" class="h-7" />
                    <div v-if="timedTyping && !beginCountdown" class="flex items-center font-mono w-fit">  
                            <playTimer @click="timedTyping = !timedTyping" class="h-7" />
                            <div class="flex text-xs border border-black h-fit">
                                <div class="px-2 border-r border-r-black w-fit" :class="[typingCountdown === 10 ? 'text-green-500' : '']" @click="typingCountdown = 10">10s</div>
                                <div v-if="!alphabets" class="px-2 border-r border-r-black w-fit" :class="[typingCountdown === 20 ? 'text-green-500' : '']" @click="typingCountdown = 20">20s</div>
                                <div v-if="!alphabets" class="px-2 border-l border-l-black w-fit" :class="[typingCountdown === 30 ? 'text-green-500' : '']" @click="typingCountdown = 30">30s</div>
                            </div>
                    </div>
                    <div class="flex items-center gap-2" v-if="beginCountdown">
                        <pauseTimer @click="timedTyping = !timedTyping" class="h-7" />
                        <div v-if="timedTyping && beginCountdown" class="font-mono text-lg">{{  countdown  }}</div>
                    </div>
                </div>
            </div>
</template>

<script setup>
import pauseTimer from '../components/svg/pauseTimer.vue'
import playTimer from '../components/svg/playTimer.vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const store = mainStore()
const { typingCountdown,  timedTyping, countdown, beginCountdown, alphabets} = storeToRefs(store)
</script>
