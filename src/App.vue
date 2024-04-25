<template>
  <div ref="loader" v-show="animateLoader" class="bg-neutral-700 h-[100dvh] relative">
    <div ref="laptop" class="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[195px] m-auto transition-opacity duration-1000">
      <div class="glow w-full relative top-[100px] z-[-3] animate-pulse"></div>
      <div class="screen-container m-auto rounded-t-md w-[188px] h-[90px] bg-neutral-700 pt-2 pb-1 z-[2] border border-black">
        <div class="h-[3px] w-[3px] rounded-full bg-slate-400 absolute top-[4px] left-[50%] translate-x-[-50%]"></div>
        <div class=" bg-neutral-900 screen rounded-sm w-[90%] m-auto py-6 text-white font-mono text-center uppercase"><span :class="[!complete ? 'animate-pulse' : 'text-green-400']">{{complete || 'DORAYI TYPING' }}</span></div>
      </div>
      <Keyboard :animationToggle="animateLoader" class="top-[-20px] relative" />
    </div>
  </div>

    <div v-show="!animateLoader" class="relative min-h-[100vh] mx-auto  bg-neutral-900 selection:bg-transparent text-white">
      <div  v-show="secondAnimation"  ref="boxesContainer" class="absolute w-full h-[100vdh] left-0 top-0 flex flex-wrap bg-transparent">
        <div v-for="(box, index) in numberOfBoxes" :key="index" class="w-fit h-fit z-[20] box-container">
          <div :style="{'width' : boxWidth, 'height': boxHeight}" class=" bg-neutral-600 box"></div>
        </div>
      </div>
      <div>
        <RouterView />
      </div>
  </div>

  <div id="boxesContainer"></div>

<!-- if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) -->
</template>

<script setup>

import Keyboard from './components/Keyboard.vue'
import {ref, watch, onMounted} from 'vue'

const animateLoader  = ref(true)
const animationCounter = ref(0)
const laptop = ref(null)
const loader = ref(null)
const intervalID = ref(null)
const complete = ref('')
const secondAnimation = ref(false)
const boxesContainer = ref(null)
const numberOfBoxes = ref(0)
const boxWidth = ref(0)
const boxHeight = ref(0)

onMounted(() => {
  intervalID.value = setInterval(() => {
    animationCounter.value++
    }, 1000);
})
  
watch(animationCounter, (newVal) => {
    if (newVal === 3) {
      clearInterval(intervalID.value)
      complete.value = 'completed'
      laptop.value.style.opacity = 0
      const timer = ref(null)
      timer.value = setTimeout(() => {
        animateLoader.value = false
        secondAnimation.value = true
        clearTimeout(timer.value)
      }, 1000)
    }
})

watch(secondAnimation, (newVal) => {
  if (newVal) {
    if (boxesContainer.value instanceof HTMLElement) {
      const cssObject = getComputedStyle(document.body)
      const width = ref(+cssObject.getPropertyValue('width').slice(0, -2))
      const height = ref(+cssObject.getPropertyValue('height').slice(0, -2))
      const squareLength = ref(50)      
      const numberOfboxesV = height.value / squareLength.value
      const numberOfboxesH = width.value  / squareLength.value
      boxWidth.value = squareLength.value + ((width.value % squareLength.value) / numberOfboxesH) + 'px'
      boxHeight.value = squareLength.value + ((height.value % squareLength.value) / numberOfboxesV) + 'px'
      let decimalIndexH = numberOfboxesH.toString().split('').indexOf('.')
      let decimalIndexV = numberOfboxesV.toString().split('').indexOf('.')
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
              clearInterval(interval.value)
              secondAnimation.value = !secondAnimation.value
            }
          }, 5)
        }, 0)
      }
    }
  }
})


// const {quotesWithoutAuthors} = englishWords()
// for (let index = 0; index < quotesWithoutAuthors.length; index++) {
//   if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length <= 9 ) {
//     newQuotes.value['ten'].push(quotesWithoutAuthors[index])
//   }   else if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length  <= 19) {
//     newQuotes.value['twenty'].push(quotesWithoutAuthors[index])
//   } else  if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length  <= 29) {
//     newQuotes.value['thirty'].push(quotesWithoutAuthors[index])
//   } else if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length  <= 39) {
//     newQuotes.value['fourty'].push(quotesWithoutAuthors[index])
//   }
// }
</script>

<style scoped>
.screen-container {
  perspective: 660px;
}

.screen > div {
  transform: rotateX(-80deg) rotateY(0deg);
  transform-style: preserve-3d;
} 

.glow {
  -webkit-box-shadow:0px 0px 112px 50px #ffffff;
  -moz-box-shadow: 0px 0px 112px 50px #ffffff;
  box-shadow: 0px 0px 112px 50px #ffffff;
}

.box-container {
 perspective: 1000px
}
</style>