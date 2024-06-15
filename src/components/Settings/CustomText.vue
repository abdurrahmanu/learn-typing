<template>
        <div :class="[theme === 'neutral' ? 'hover:bg-neutral-700' : 'hover:bg-slate-100']" class="py-2 pl-5">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm  ">
                <div @click="Object.keys(customTexts).length === 0 ? '' : useCustomText = !useCustomText"  class="flex gap-4">
                    <!-- <input :disabled="Object.keys(customTexts).length === 0" :checked="useCustomText"  type="checkbox" name="" id=""> -->
                    <input name="custom-text" type="checkbox" disabled id="">
                    <p>Custom text</p><span class="text-sm text-red-400">incomplete</span>
                </div>
            </div>
            <div class="p-1" v-if="useCustomText">
                <div class="space-x-3">
                    <input name="only-system" type="radio" v-model="howToUseCustomText" value="use only custom">
                    Use only your custom texts
                </div>
                <div class="space-x-3">
                    <input name="use-system-and-custom" type="radio" v-model="howToUseCustomText" value="use both system and custom">
                    Add custom text into system text
                </div>
                <div class="space-x-3">
                    <input name="select-text" type="radio" v-model="howToUseCustomText" value="select text using options" >
                    Manually select text by name
                </div>
            </div>
            <p class="pb-2">Would you like your fingers to perfect a particular test, quote or story! Use the text field to add and use your custom text.</p>

            <div v-if="!saveCustomText" class="space-y-1 text-center">
                <textarea v-model="textValue" :class="[appTheme]" class="w-[90%] max-w-[300px] h-32 outline-none border border-slate-500 rounded-md p-2" :placeholder="textAreaPlaceholder" name="custom-textarea" />
                <div @click="startSavingCustomText" class="py-1 m-auto text-center border rounded-full px-7 w-fit border-slate-600 hover:bg-green-500 hover:text-white">ADD TEXT</div>
            </div>
            <div v-else class="pt-3 space-y-4 text-center">
                <p v-if="textSaved" class="text-xs text-center text-green-400">Added Successfully</p>
                <input name="custom-text-title" v-model="customTextTitle" type="text" :placeholder="titlePlaceholder" class="p-1 px-2 text-center bg-transparent border-b outline-none border-b-blue-500 placeholder:text-center">
                <div class="flex justify-center gap-2 m-auto w-fit">                    
                    <div @click="cancel" class="py-1 m-auto text-center border rounded-l-full px-7 w-fit border-slate-600 hover:bg-red-500 hover:text-white">CANCEL</div>
                    <div @click="saveNewCustomText" class="py-1 m-auto text-center border rounded-r-full px-7 w-fit border-slate-600 hover:bg-green-500 hover:text-white">SAVE</div>
                </div>
            </div>
        </div>
</template>

<script setup>
import {ref, watchEffect} from 'vue'
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';
import {themeStore}  from '../../store/themeStore'


const theme_ = themeStore()
const {theme, appTheme } = storeToRefs(theme_)


const inputError = ref(false)
const textAreaPlaceholder = ref('Input custom text')
const titlePlaceholder = ref('Add title')
const textValue = ref('')
const saveCustomText = ref(false)
const textSaved = ref(false)
const customTextTitle = ref('')
const main = mainStore()
const textAreaValueStore = ref('')
const { howToUseCustomText,  customTexts, useCustomText} = storeToRefs(main)

const startSavingCustomText = () => {
    if (!textValue.value.length) {
        textAreaPlaceholder.value = 'Your text field is empty'
        return
    }
    if (textValue.value.length < 10) {
        textValue.value = ''
        textAreaPlaceholder.value = 'Your input is too short'
        return
    }

    saveCustomText.value = true
    textAreaValueStore.value = textValue.value
    textValue.value = ''
}

const saveNewCustomText = () => {
    if (!customTextTitle.value.length) {
        titlePlaceholder.value = 'Must add title'
        return
    }

    customTexts.value[customTextTitle.value] = textAreaValueStore.value
    textSaved.value = true
    customTextTitle.value = ''
    textAreaValueStore.value = ''

    setTimeout(() => {
        saveCustomText.value = false
        textSaved.value = false
    }, 500);
}

const cancel = () => {
    saveCustomText.value = false
    textSaved.value = false
    customTextTitle.value = ''
}
</script>