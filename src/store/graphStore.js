import { defineStore } from "pinia";
import {ref, computed} from 'vue'

export const authStore = defineStore('graphStore', () => {
    const wpmForEverySecond = ref([])
    const wpm = Math.round(((containerText.value.length / 5) - (wrongCount.value / 5)) / (totalTime.value/60))

    setInterval(() => {
        wpmForEverySecond.push(wpm)
    }, 1000);
})