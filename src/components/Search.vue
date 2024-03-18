<template>
    <div class="text-xs leading-5 md:text-sm h-fit rounded-[10px]">
        
        <div  class="font-mono text-right flex justify-between px-2 sticky z-[99999] top-[0] w-full bg-neutral-800 shadow-sm shadow-black">
            <div class="text-white text-lg font-mono">ALL SETTINGS</div>
            <div class="p-[2px] text-white font-bold font-mono hover:text-red-400 text-lg" @click="showMoreSettings = !showMoreSettings">X</div>
        </div>

        <div class="m-auto text-center p-2">
            <input type="search" class="px-3 w-full min-w-[100%] max-w-[300px] outline-none text-black p-1 rounded-full" name="" id="" placeholder="search settings">
        </div>

        <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <input :checked="enableBackSpace" @click="enableBackSpace = !enableBackSpace" type="checkbox" name="" id="">
                    <p>use backspace</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <p class="text-zinc-400">This enables or disables player ability to utilize the backspace key to clear errors while typing. Sometimes playing to test your typing ability while considering the number of errors and keys that most errors come from is handy.</p>
        </div>

        <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <input :checked="timedTyping" @click="timedTyping = !timedTyping" type="checkbox" name="" id="">
                    <p>use timer</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <p class="text-zinc-400">Type with timer countdown, test automatically ends after times reaches 0</p>
        </div>

        <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <input :checked="typeBlindly" @click="typeBlindly = !typeBlindly" type="checkbox" name="" id="">
                    <p>Type blindly</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <p class="text-zinc-400">How confident are you? Type without having to worry about your errors while fully trusting your muscle memory. This makes you type without showing your errors (red-color) or correct (green-color) inputs.</p>
        </div>

        <div class="px-1 border-t border-neutral-900 p-2 relative hover:bg-neutral-900">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <input :disabled="Object.keys(customTexts).length === 0" :checked="useCustomText" @click="useCustomText = !useCustomText" type="checkbox" name="" id="">
                    <p>Use your custom text</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <p class="text-zinc-400 pb-2">Adding Custom Text. Would you like your fingers to perfect a particular test, quote or story! press <span class="bg-zinc-700 text-white px-2" @click="addCustomText = true">+</span> to add and use your custom text</p>

            <div class="text-center relative py-1">
                <div v-if="saveCustomText" class="w-full  absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 "></div>
                <p v-if="inputError && !saveCustomText" class="text-red-600 text-[11px] bg-white p-[1px]">your text is very short, make it at least 10 letters</p>
                <textarea 
                    v-model="textAreaValue"
                    :placeholder="textAreaPlaceholder" 
                    cols="30" rows="10" class="p-1 w-[90%] bg-zinc-700 text-slate-300 outline-none"></textarea>
                <button @click="startSavingCustomText" class="bg-green-500 px-8 rounded-full p-1 text-black hover:bg-green-800 hover:text-white">Continue</button>
                    <div v-if="saveCustomText" class="absolute w-full top-[50%] translate-y-[-50%]">
                        <div v-if="!textSaved" class="p-2 bg-neutral-500 absolute w-full top-[50%] translate-y-[-50%] z-[9999]">
                            <div class="">
                                <p v-if="inputError && saveCustomText" class="text-red-600 text-[11px] bg-white p-[1px]">Title should not be more than 15 letters long</p>
                                <div>Custom text Title:</div>
                                <input class="outline-none rounded-md p-1  text-black caret-black" :placeholder="titlePlaceholder" v-model="customTextTitle" type="text">
                                <div class="text-center scale-90 p-2">
                                    <button @click="saveNewCustomText" class="bg-green-500 px-8 rounded-full p-1 text-black hover:bg-green-800 hover:text-white">Save text</button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="font-mono text-lg bg-neutral-700 px-4 py-1 text-green-400">New custom text  added Successfully!</div>
                    </div>
            </div>
        </div>
        
        <div class="px-1 border-t border-neutral-900 p-2 hover:bg-neutral-900">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <p>Difficulty Level</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <div class=" text-slate-400 p-1">Select the Level that suits you</div>
            <div class="flex gap-5 p-1 text-xs m-auto justify-evenly">
                <div class="p-1 px-3 rounded-md bg-zinc-700 text-white font-mono hover:bg-neutral-700">Easy</div>
                <div class="p-1 px-3 rounded-md bg-zinc-700 text-white font-mono hover:bg-neutral-700">Mid</div>
                <div class="p-1 px-3 rounded-md bg-zinc-700 text-white font-mono hover:bg-neutral-700">Expert</div>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {customizeStore} from '../store/customizeStore.js';
import {storeToRefs} from 'pinia';
import {mainStore} from '../store/mainStore';

const props = defineProps({
    class: String
})

const inputError = ref(false)
const textAreaPlaceholder = ref('Input custom text')
const titlePlaceholder = ref('Add title')
const textAreaValue = ref('')
const saveCustomText = ref(false)
const textSaved = ref(false)

const customTextTitle = ref('')
const main = mainStore()
const textAreaValueStore = ref('')
const { enableBackSpace, showMoreSettings, typeBlindly, timedTyping, customTexts, useCustomText} = storeToRefs(main)
const {getMobileOS} = main

const store = customizeStore()

const startSavingCustomText = () => {
    if (!textAreaValue.value.length) {
        textAreaPlaceholder.value = 'Your text field is empty'
        return
    }
    if (textAreaValue.value.length < 10) {
        inputError.value = true
        setTimeout(() => {
            inputError.value = false
        }, 4000);
        return
    }

    saveCustomText.value = true
    textAreaValueStore.value = textAreaValue.value
    textAreaValue.value = ''
}

const saveNewCustomText = () => {
    if (customTextTitle.value.length > 15) {
        inputError.value = true
        setTimeout(() => {
            inputError.value = false
        }, 4000);
        return
    }

    if (!customTextTitle.value.length) {
        titlePlaceholder.value = 'Must add title'
        return
    }

    customTexts.value[customTextTitle.value] =textAreaValueStore.value
    textSaved.value = true
    customTextTitle.value = ''
    textAreaValueStore.value = ''
    
    setTimeout(() => {
        saveCustomText.value = false
        textSaved.value = false
    }, 500);
}

</script>

<style scoped>
</style>