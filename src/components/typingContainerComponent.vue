<template>
    <div class="text-slate-100 p-5 rounded-md  transition-all duration-75 relative max-w-[700px] w-[85%] m-auto">
        <lightEffect />

        <Transition appear>
            <timerComponent 
            v-if="completedTyping"
            :startTime="startTime"
            :endTime="endTime"
            />
        </Transition>

        <div @click="focusInput = true" v-if="containerText.length" :class="[completedTyping ? 'pt-5' : 'pt-32']" class="text-center leading-9 md:leading-[40px] text-lg md:text-xl pb-10">
            <alphabetSpan 
            :clearAlphabet="restartTyping"
            @equal="correctCount++"
            @unequal="wrongCount++"
            @containerTextLength="textLength = $event"
            v-for="(alphabet, index) in containerText"
            :key="index"
            :alphabet="alphabet"
            :index="index"
            :unequal="typedAlphabet !== alphabet && typedAlphabetIndex === index && typedAlphabet.length > 0"
            :equal="typedAlphabet === alphabet && typedAlphabetIndex === index && typedAlphabet.length > 0" />
        </div>

        <div class="text-center pt-32 pb-5 font-serif text-slate-400 text-2xl active:text-white" @click="generate()" v-else>
            CLICK TO GENERATE TEXT
        </div>

        <restartButtonComponent
        @restart="restart($event)"
        />
        
        <inputComponent
        @start="start"
        :clearInput="restartTyping"
        :focusInput="focusInput"
        @complete="complete"
        @typingEvent="typingEvent"
        :containerText="containerText" />
        
        <showResultComponent
        v-if="completedTyping"
        :clearResult="restartTyping"
        :correctCount="correctCount"
        :wrongCount="wrongCount"
        :startTime="startTime"
        :endTime="endTime"
        />

    </div>
</template>

<script setup>
import { ref, defineProps, watchEffect, defineEmits } from 'vue';
import alphabetSpan from './alphabetSpan.vue'
import inputComponent from './inputComponent.vue';
import showResultComponent from './showResultComponent.vue';
import timerComponent from './timerComponent.vue'
import lightEffect from './lightEffect.vue'
import restartButtonComponent from './restartButtonComponent.vue'

const emit = defineEmits(['generate'])
const correctCount = ref(0)
const wrongCount = ref(0)
const typedAlphabet = ref('')
const typedAlphabetIndex = ref(0)
const textLength = ref(0)
const completedTyping = ref(false)
const startTiming = ref(false)
const restartTyping = ref(false)
const focusInput = ref(false)
const startTime = ref(0)
const endTime = ref(0)

const props = defineProps({
    containerText: String,
})

const generate = () => {
    focusInput.value = true
    emit('generate')
}

const start = () => {
    startTime.value = new Date().getTime()
}

const complete = () => {
    endTime.value = new Date().getTime()
    completedTyping.value = true
}

const restart = (event) => {
    if (!props.containerText.length) return
    focusInput.value = true
    restartTyping.value = true
    correctCount.value = 0
    wrongCount.value = 0
    typedAlphabet.value = ''
    typedAlphabetIndex.value = ''
    textLength.value = ''
    completedTyping.value = ''
    startTiming.value = false
    setTimeout(() => {
        restartTyping.value = false
    }, 0);
    if (event === 'skip') {
        emit('generate');
    }
}

window.addEventListener('click', e => {
    focusInput.value = false
})

const typingEvent = (alphabet, alphabetIndex) => {
    typedAlphabet.value = alphabet
    typedAlphabetIndex.value = alphabetIndex
}


watchEffect(() => {
    //TYPING TIMER
})

//npm update-browserslist-db@latest
</script>

<style scoped>
.v-enter-from {
    transform: translateY(-40px);
    opacity: 0;
}

.v-enter-active {
    transition: all 1s ease;
}

.v-leave-to {
    opacity: 0;
}

.v-leave-active {
    transition: all 1s ease;
}
</style>


