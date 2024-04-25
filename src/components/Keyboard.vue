<template>
    <div class="container m-auto w-fit">
        <div class="board space-y-[10px] w-fit text-white">
            <div ref="first" class="flex gap-[7px] first-row">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div ref="second" class="flex gap-[7px] row justify-center">
                <p class="w-[14px] bg-slate-500"></p>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div ref="third" class="flex gap-2 row justify-center">
                <p class="w-[16px] bg-slate-500"></p>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <p class="w-[16px] bg-slate-500"></p>
                <div></div>
            </div>
            <div ref="fourth" class="flex gap-2 row justify-center">
                <p class="w-4 bg-slate-500"></p>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <p class="w-4 bg-slate-500"></p>
                <div></div>
            </div>
            <div ref="fifth" class="flex gap-2 row justify-center">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <p class="w-10 bg-slate-500"></p>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted, watchEffect} from 'vue'
const first = ref([])
const second = ref([])
const third = ref([])
const fourth = ref([])
const fifth = ref([])
const intervalID = ref(null)
const timerID = ref(null)

const props = defineProps({
    animationToggle : Boolean
})

onMounted(() => {
    const rowsArray = [...Array.from(first.value.children), ...Array.from(second.value.children), ...Array.from(third.value.children), ...Array.from(fourth.value.children), ...Array.from(fifth.value.children)]
    intervalID.value = setInterval(() => {
        let random = Math.round(Math.random() * rowsArray.length - 1)
        try {
            let style = rowsArray[random].style.background
            rowsArray[random].style.background = 'red'
            timerID.value = setTimeout(() => {
                rowsArray[random].style.background = style
            }, 500);
        } catch (err) {
            return
        }
    }, 900);
})

watchEffect(() => {
    if (!props.animationToggle) {
        clearTimeout(timerID.value)
        clearInterval(intervalID.value)
    }
})
</script>

<style scoped>
.container {
    perspective: 680px;
}

.board {
    background: rgb(18, 18, 18);
    padding: 4px;
    border-radius:0 0 5px 5px;
    border: 1px solid black;
    transform: rotateX(60deg) rotateY(0deg);
    transform-style: preserve-3d;
    border-bottom: 6px solid rgb(82, 83, 82);
}

.first-row > div {
    background: rgb(179, 186, 193);
    width: 9px;
    height: 3px;
}

.row {
    height: fit-content
}

.row > div {
    background: rgb(179, 186, 193);
    width: 10px;
    height: 5px;
}
</style>