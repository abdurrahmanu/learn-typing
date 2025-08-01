<template>
    <div  v-show="animation"  ref="boxesContainer" class="absolute w-full h-[100vdh] left-0 top-0 flex flex-wrap bg-transparent">
        <div v-for="(box, index) in numberOfBoxes" :key="index" class="w-fit h-fit z-[20] box-container">
        <div :style="{'width' : boxWidth, 'height': boxHeight}" :class="[theme === 'dark' ? 'bg-[#2c2e31]' : 'bg-zinc-300']" class=" box"></div>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {settingsStore} from '../store/settingsStore'
import { storeToRefs } from 'pinia';
import {themeStore}  from '../store/themeStore'


const theme_ = themeStore()
const {theme} = storeToRefs(theme_)

const customize = settingsStore()
const {pauseTyping} = storeToRefs(customize)

const animation = ref(true)
const boxesContainer = ref(null)
const numberOfBoxes = ref(0)
const boxWidth = ref(0)
const boxHeight = ref(0)
const width = ref(0)
const height = ref(0)

onMounted(() => {
    if (boxesContainer.value instanceof HTMLElement) {
        const cssObject = getComputedStyle(document.body)
        width.value = +cssObject.getPropertyValue('width').slice(0, -2)
        height.value = +cssObject.getPropertyValue('height').slice(0, -2)
        const squareLength = ref(40)      
        if (width.value > 500) {
        squareLength.value = 55
    } 
    if (width.value > 800) squareLength.value = 70
    
    const numberOfboxesV = height.value / squareLength.value
    const numberOfboxesH = width.value  / squareLength.value
    boxWidth.value = squareLength.value + ((width.value % squareLength.value) / numberOfboxesH) + 'px'
    boxHeight.value = squareLength.value + ((height.value % squareLength.value) / numberOfboxesV) + 'px'
    let decimalIndexH = numberOfboxesH.toString().indexOf('.') > 0 ? numberOfboxesH.toString().indexOf('.') : numberOfboxesH
    let decimalIndexV = numberOfboxesV.toString().indexOf('.') > 0 ? numberOfboxesV.toString().indexOf('.') : numberOfboxesV
    let realNumberOfBoxesV = numberOfboxesV.toString().slice(0, decimalIndexV)
    let realNumberOfBoxesH = numberOfboxesH.toString().slice(0, decimalIndexH)
    numberOfBoxes.value = realNumberOfBoxesH * realNumberOfBoxesV
    
    if (numberOfBoxes.value) {
        setTimeout(() => {
            const childrenArray = ref([...Array.from(boxesContainer.value.children)])
            const count = ref(0)
            const interval = ref(null)
            const length = childrenArray.value.length
            interval.value = setInterval(() => {
                let random = Math.round(Math.random() * (childrenArray.value.length - 1))
                let twoRandom = Math.round(Math.random() * 1)
                childrenArray.value[random].style.transform = twoRandom === 1 ? 'rotateX(180deg)' : 'rotateY(180deg)'
                childrenArray.value[random].style.backfaceVisibility = 'hidden'
                childrenArray.value[random].style.transformStyle = 'preserve-3d'
                childrenArray.value[random].style.transition = 'transform .6s'
                childrenArray.value[random].style.scale = 'scale(1)'
                childrenArray.value[random].style.postion = 'relative'
                childrenArray.value[random].style.opacity = '.8'
                childrenArray.value = childrenArray.value.filter((child, index) => index !== random)
                count.value++
            if (count.value === length) {
                pauseTyping.value = false
                clearInterval(interval.value)
                animation.value = !animation.value
                if (boxesContainer.value instanceof HTMLElement) {
                    document.querySelector('.main').removeChild(boxesContainer.value)
                }
            }
        }, 3)
    }, 0)
    }
}
})

</script>