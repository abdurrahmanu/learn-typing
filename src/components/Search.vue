<template>
    <div class="pt-1 text-xs leading-5 md:text-sm h-fit max-h-[calc(100vh_-_100px)]">
        <div class="m-auto text-center p-2">
            <input type="search" class="px-3 py-1 rounded-full min-w-[100%] max-w-[300px] outline-none text-black " name="" id="" placeholder="search settings">
        </div>

        <div class="px-1 border-t border-neutral-900 p-2">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <input :checked="enableBackSpace" @click="enableBackSpace = !enableBackSpace" type="checkbox" name="" id="">
                    <p>use backspace</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <p class="text-zinc-400">This enables or disables player ability to utilize the backspace key to clear errors while typing. Sometimes playing to test your typing ability while considering the number of errors and keys that most errors come from is handy.</p>
        </div>

        <div class="px-1 border-t border-neutral-900 p-2">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <input :checked="typeBlindly" @click="typeBlindly = !typeBlindly" type="checkbox" name="" id="">
                    <p>Type blindly</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <p class="text-zinc-400">How confident are you? Type without having to worry about your errors while fully trusting your muscle memory. This makes you type without showing your errors (red-color) or correct (green-color) inputs.</p>
        </div>

        <div class="px-1 border-t border-neutral-900 p-2">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <p>Add Custom text</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <p class="text-zinc-400 pb-2">Would you like your fingers to perfect a particular test, quote or story! press <span class="bg-zinc-700 text-white px-2" @click="addCustomText = true">+</span> to add and use your custom text</p>
            <div class="text-center">
                <textarea 
                    v-model="textAreaValue"
                    :placeholder="textAreaPlaceholder" 
                     cols="30" rows="10" class="p-1 w-[90%] bg-zinc-800 text-slate-300 outline-none"></textarea>

                <button @click="startSavingCustomText" class="bg-green-500 px-8 rounded-full p-1 text-black hover:bg-green-800 hover:text-white">Continue</button>

                <Modal class="w-fit m-auto" @close="saveCustomText = false" :toggle="saveCustomText">
                    <div v-if="!textSaved" class="p-2 bg-neutral-500">
                        <div>Custom text Title:</div>
                        <input class="outline-none rounded-md p-1  text-black caret-black" :placeholder="titlePlaceholder" v-model="customTextTitle" type="text">
                        <div class="text-center scale-90 p-2">
                            <button @click="saveNewCustomText" class="bg-green-500 px-8 rounded-full p-1 text-black hover:bg-green-800 hover:text-white">Save text</button>
                        </div>
                    </div>
                    <div v-else class="font-mono text-lg bg-neutral-700 px-4 py-1 text-green-400">New custom text  added Successfully!</div>
                </Modal>
            </div>
        </div>

        <div class="px-1 border-t border-neutral-900 p-2">
            <div class="flex justify-between p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300 w-full">
                <div class="flex gap-4">
                    <p>Difficulty Level</p>
                </div>
                <div class="font-mono">></div>
            </div>
            <div class=" text-slate-400 p-1">Select the Level that suits you</div>
            <div class="flex gap-5 p-1 text-xs m-auto">
                <div class="p-1 px-3 rounded-md bg-zinc-700 text-white font-mono hover:bg-neutral-700">Easy Level</div>
                <div class="p-1 px-3 rounded-md bg-zinc-700 text-white font-mono hover:bg-neutral-700">Mid Level</div>
                <div class="p-1 px-3 rounded-md bg-zinc-700 text-white font-mono hover:bg-neutral-700">Expert Level</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref , watch, watchEffect} from 'vue';
import Modal from './Modal.vue';
import {customizeStore} from '../store/customizeStore.js'
import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'

const textAreaPlaceholder = ref('Input custom text')
const titlePlaceholder = ref('Add title')
const textAreaValue = ref('')
const saveCustomText = ref(false)
const textSaved = ref(false)

const customTextTitle = ref('')
const main = mainStore()
const { enableBackSpace, showMoreSettings, typeBlindly, customTexts} = storeToRefs(main)
const {getMobileOS} = main

const store = customizeStore()

const startSavingCustomText = () => {
    if (!textAreaValue.value.length) {
        textAreaPlaceholder.value = 'Your text field is empty'
        return
    }
    if (textAreaValue.value.length < 15) {
        textAreaPlaceholder.value = 'Your text is very short, make it longer'
        return
    }

    saveCustomText.value = true
    textAreaValue.value = ''
}

const saveNewCustomText = () => {
    if (!customTextTitle.value.length) {
        titlePlaceholder.value = 'Must add title'
        return
    }

    customTexts.value[customTextTitle.value] =textAreaValue.value
    textSaved.value = true
    customTextTitle.value = ''
}

</script>

<style scoped>
</style>