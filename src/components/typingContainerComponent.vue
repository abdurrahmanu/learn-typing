<template>
    <div 
    :class="[!containerText.length ? 'pt-[100px]' : 'pt-12']" 
    class="typing-container">

        <div
        class="text-style"
        v-if="containerText.length" 
        :class="[textAlign ? 'text-center' : '']" >

        <div ref="textContainer">
            <alphabetSpan
            v-for="(alphabet, index) in containerText"
            :key="index"
            @equal="correctCount++"
            @unequal="wrongCount++"
            :clearAlphabet="restartTyping"
            :alphabet="alphabet"
            :index="index"
            :currentIndex="playerInputLength === index"
            :unequal="playerLastInput !== alphabet && playerInputLength - 1 === index && playerLastInput.length > 0"
            :equal="playerLastInput === alphabet && playerInputLength - 1 === index && playerLastInput.length > 0" />
        </div>

            <RangeInput 
            :range="completionLevel" />

        </div>

        <div class="w-fit h-fit m-auto">
            <div class="text-center font-serif text-slate-400 text-2xl active:text-white relative" @click="generateText" v-if="!focusInput && !playerLastInput.length && !next && !sessionCompleted">
                <span class="text-white active:text-slate-400 font-mono">start</span>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, defineProps, watchEffect, defineEmits, onMounted } from 'vue';
import alphabetSpan from './alphabetSpan.vue'
import RangeInput from '@/components/RangeInput.vue'
import { UseGetQuotes } from '../composables/UseGetQuotes'

const props = defineProps({
    next: Boolean,
    customizeSettingsProp: Array,
    textAlign: Boolean,
    restart: Boolean
})

const emit = defineEmits(['generate', 'sessionCompleted', 'resultData', 'startedTyping'])
const textContainer = ref(null)
const completionLevel = ref(0)
const correctCount = ref(0)
const wrongCount = ref(0)
const containerText = ref('')
const playerLastInput = ref('')
const playerInputLength = ref(0)
const sessionCompleted = ref(false)
const restartTyping = ref(false)
const focusInput = ref(false)
const startTime = ref(null)
const resultData = ref({})
const totalTime = ref(null)
const lines = ref('')

watchEffect(() => {
    if (textContainer.value) {
        lines.value = textContainer.value.textContent.split('\n')
    }

    console.log(containerText.value[playerInputLength.value]);
})


window.addEventListener('keypress', e => {
    if (focusInput.value && containerText.value.length && !sessionCompleted.value) {
        if (playerInputLength.value === 0) startTime.value = performance.now();
        completionLevel.value = ((playerInputLength.value + 1) / containerText.value.length) * 100
        playerLastInput.value = e.key
        playerInputLength.value++

        if (playerInputLength.value === containerText.value.length) {
            sessionCompleted.value = true
            emit('sessionCompleted')
            totalTime.value = performance.now() - startTime.value
            resultData.value = {
                correctCount: correctCount.value,
                wrongCount: wrongCount.value,
                containerText: containerText.value,
                characters: containerText.value.length,
                totalTime: Math.round(totalTime.value),
                testType: 'English-10-words'
            }
            emit('resultData', resultData.value)
            setTimeout(() => {                
                resultData.value
            }, 10);
        }

    }
})

const generateText = () => {
    completionLevel.value = 0
    focusInput.value = true
    if (props.customizeSettingsProp.length) {
        containerText.value = UseGetQuotes(props.customizeSettingsProp).res.value
    }
    else {
        containerText.value = UseGetQuotes().res.value
    }
    emit('startedTyping')
}

const BeginNextSession = () => {
    resultData.value = {}
    totalTime.value = null
    completionLevel.value = 0
    startTime.value = null
    correctCount.value = 0
    wrongCount.value = 0
    focusInput.value = false
    containerText.value = ''
    playerLastInput.value = ''
    playerInputLength.value = 0
    sessionCompleted.value = false
    restartTyping.value = true
    setTimeout(() => {
    restartTyping.value = false
    }, 0);
}

watchEffect(() => {
    if (props.next) {
        BeginNextSession()
        generateText()
    }

    if (props.restart) {
        completionLevel.value = 0
        BeginNextSession()
        generateText()
    }
})
</script>

<style scoped>
.text-style {
    @apply leading-9 md:leading-[40px] transition-all duration-500 relative md:text-xl border-l-4 border-l-zinc-800 pl-4 
}


.typing-container {
    @apply text-slate-100 h-full w-[90%] min-h-[200px] px-5 relative transition-all duration-200 max-w-[800px] m-auto
}

</style>













