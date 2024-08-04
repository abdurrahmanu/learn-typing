<template>
    <div v-if="customTestModal && route.name === 'home'" class="max-w-[500px] w-[100%] fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-md py-5 max-h-[calc(100dvh_-_20px)] text-[13px]" :class="[theme === 'dark' ? 'bg-neutral-800' : 'bg-slate-300 shadow-sm shadow-slate-500']">
        <div @click="customTestModal = !customTestModal, pauseTyping = false" class="absolute top-0 font-mono text-xl font-bold w-fit right-2 hover:text-red-500">x</div>
        <div>            
            <div v-if="!saveCustomText" class="space-y-1 text-center">
                <p class="py-2 font-medium">Add your preferred test, quote or story.</p>
                <textarea v-model="textValue" :class="[appTheme]" class="w-[90%] h-40 outline-none border border-slate-500 rounded-md p-2" :placeholder="textAreaPlaceholder" name="custom-testarea" />
                <div @click="startSavingCustomText" class="py-[2px] m-auto text-center border rounded-full px-4 w-fit border-slate-600 hover:bg-green-800 hover:text-white font-medium">ADD TEST</div>
                <!-- <input type="file" name="" accept=".doc,.docx,.pdf,application/msword" id=""> -->
            </div>
            <div v-else class="pt-3 text-center">
                <p v-if="textSaved" class="py-3 text-center text-green-600 uppercase">Added Successfully</p>
                <div v-else class="space-y-4">                    
                    <input ref="inputTitleEl" name="custom-test-title" v-model="customTextTitle" type="text" :placeholder="titlePlaceholder" class="p-1 text-center bg-transparent border-b outline-none border-b-blue-500 placeholder:text-center">
                    <div class="flex justify-center gap-2 m-auto text-xs font-medium w-fit">
                        <div @click="cancel" class="py-[2px] m-auto text-center border rounded-l-full px-4 w-fit border-slate-600 hover:bg-red-500 hover:text-white">CANCEL</div>
                        <div @click="saveNewCustomText" class="py-[2px] m-auto text-center border rounded-r-full px-4 w-fit border-slate-600 hover:bg-green-800 hover:text-white">SAVE</div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="Object.keys(customTests).length" class="max-w-[90%] m-auto">
            <div class="font-medium">CUSTOM TESTS</div>
            <div class="max-h-[calc(100dvh_-_50dvh)] overflow-y-auto h-fit p-1">
                <div class="relative overflow-y-auto space-y-[5px]">                
                    <div v-for="(test, name, index) in customTests" :key="index" class="p-1 border hover:shadow-sm" :class="[theme === 'dark' ? 'border-neutral-700' : 'border-slate-400']">
                        <div class="space-x-1 text-xs font-medium uppercase"> 
                            <span>{{ name }}</span> 
                            <span @click="use(name)" class="px-3 bg-green-600 rounded-full py-[1px] hover:bg-green-700 ml-1">use</span> 
                            <span v-if="index !== 0" @click="del(name)" class="px-3 py-[1px] bg-red-400 rounded-full hover:bg-red-500">delete</span>
                            <span v-if="index !== 0" @click="edit(name)" class="px-3 py-[1px] bg-blue-500 rounded-full hover:bg-blue-700">edit</span>
                        </div>
                        <div class="test-[10px]">{{ test }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {onMounted, ref} from 'vue'
import {storeToRefs} from 'pinia';
import {mainStore} from '../store/mainStore';
import {themeStore}  from '../store/themeStore'
import { customizeStore } from '../store/customizeStore';
import { useRoute } from 'vue-router';

const route = useRoute()
const customize = customizeStore()
const {customTestModal, pauseTyping, customizers, selectedCustomTest, repeat} = storeToRefs(customize)

const theme_ = themeStore()
const {theme, appTheme } = storeToRefs(theme_)

const main = mainStore()
const { customTests } = storeToRefs(main)
const {switchNext} = main

const inputTitleEl = ref(null)
const textAreaPlaceholder = ref('Custom test')
const titlePlaceholder = ref('Title')
const textValue = ref('')
const saveCustomText = ref(false)
const textSaved = ref(false)
const customTextTitle = ref('')
const textAreaValueStore = ref('')

const startSavingCustomText = () => {
    if (!textValue.value.length) {
        textAreaPlaceholder.value = 'You cannot add an empty field'
        return
    }
    
    if (textValue.value.length < 10) {
        textValue.value = ''
        textAreaPlaceholder.value = 'Custom test should be at least 10 letters long'
        return
    }

    saveCustomText.value = true
    textAreaValueStore.value = textValue.value
    textValue.value = ''
}

const saveNewCustomText = () => {
    const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))
    if (!customTextTitle.value.length) {
        titlePlaceholder.value = 'Must add title'
        return
    }

    customTests.value[customTextTitle.value] = textAreaValueStore.value.trim()
    localStorageSettings.value.customTests[customTextTitle.value] = textAreaValueStore.value.trim()
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
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

const del= (name) => {
    const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))
    delete customTests.value[name]
    delete localStorageSettings.value.customTests[name]
    localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
    switchNext(customizers.value)
}

const use = (name) => {
    if (repeat.value) return
    const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))
    if (customizers.value['test-type'] !== 'custom-test') {
        customizers.value['test-type'] = 'custom-test'
        localStorageSettings.value.config[0]['test-type'] = 'custom-test'
        localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))
    }
    selectedCustomTest.value = name
    switchNext(customizers.value)
    customTestModal.value = false
    pauseTyping.value = false
}

const edit = (name) => {
    
}
</script>
