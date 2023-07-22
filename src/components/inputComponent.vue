<template>
    <div class="m-auto py-4 w-[80%] max-w-[400px]">
        <input
        ref="inputElement"
        class="p-2 px-4 rounded-md w-full m-auto outline-none bg-slate-100 text-black"
        @input="emitInputValue($event)" 
        v-model="inputValue"
        type="text"
        spellcheck="false" 
        placeholder="Press any key to start typing">
    </div>
</template>

<script setup>
import { ref, defineEmits, defineProps, onMounted, watchEffect } from 'vue'

const inputValue = ref('')
const inputCount = ref(0)
const inputElement = ref(null)
const emit = defineEmits(['typingEvent', 'containerTextLength', 'complete', 'start'])

const props = defineProps({
    containerText: String,
    clearInput: Boolean,
    focusInput: Boolean,
})

const emitInputValue = (e) => {
    if (!props.containerText.length) {
        inputValue.value = ''
        inputCount.value = 0
        return
    }

    if (!(inputCount.value > props.containerText.length - 1)) {
        if (e.inputType !== 'deleteContentBackward') {
            if (!(inputCount.value > props.containerText.length - 1)) {
                    emit('typingEvent', e.data, inputCount.value)
                    inputCount.value++
                if (inputCount.value === 1) {
                        emit('start')
                    }
                if (inputCount.value === props.containerText.length) {
                    inputElement.value.setAttribute('maxLength', props.containerText.length)
                    setTimeout(() => {           
                        emit('complete')
                    }, 100);
                    }
                }
        }
    }
}

onMounted(() => {
    emit('containerTextLength', props.containerText.length - 1)
    watchEffect(() => {
        if (props.clearInput) {
            inputValue.value = ''
            inputCount.value = 0
            inputElement.value.removeAttribute('maxLength')
        }
        
        if (props.focusInput) {
            inputElement.value.focus()
        }
    })
})

</script>