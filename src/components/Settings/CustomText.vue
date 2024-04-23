<template>
        <div class="relative p-2 px-1 border-t border-neutral-900 hover:bg-neutral-900">
            <div class="flex justify-between w-full p-1 border border-transparent rounded-sm hover:border-neutral-300 text-zinc-300">
                <div class="flex gap-4">
                    <input :disabled="Object.keys(customTexts).length === 0" :checked="useCustomText" @click="useCustomText = !useCustomText" type="checkbox" name="" id="">
                    <p>Custom text</p>
                </div>
            </div>
            <div class="p-1 text-slate-400" v-if="useCustomText">
                <div><input type="radio" v-model="howToUseCustomText" value="use only custom"> use only your custom texts</div>
                <div><input type="radio" v-model="howToUseCustomText" value="use both system and custom"> use custom text together with system text</div>
                <div><input type="radio" v-model="howToUseCustomText" value="select text using options" > use options to select text</div>
            </div>
            <p class="pb-2 text-zinc-400">Would you like your fingers to perfect a particular test, quote or story! Use the text field to add and use your custom text.</p>

            <div class="relative py-1 text-center">
                <div v-if="saveCustomText" class="absolute top-0 bottom-0 left-0 right-0 w-full bg-black opacity-50 "></div>
                <p v-if="inputError && !saveCustomText" class="text-red-600 text-[11px] bg-white p-[1px]">your text is very short, make it at least 10 letters</p>
                <textarea 
                    v-model="textAreaValue"
                    :placeholder="textAreaPlaceholder" 
                    cols="30" rows="10" class="p-1 w-[90%] bg-zinc-700 text-slate-300 outline-none"></textarea>
                <button @click="startSavingCustomText" class="p-1 px-8 text-black bg-green-500 rounded-full hover:bg-green-800 hover:text-white">Continue</button>
                    <div v-if="saveCustomText" class="absolute w-full top-[50%] translate-y-[-50%]">
                        <div v-if="!textSaved" class="p-2 bg-neutral-500 absolute w-full top-[50%] translate-y-[-50%] z-[9999]">
                            <div>
                                <p v-if="inputError && saveCustomText" class="text-red-600 text-[11px] bg-white p-[1px]">Title should not be more than 15 letters long</p>
                                <div>Custom text Title:</div>
                                <input class="p-1 text-black rounded-md outline-none caret-black" :placeholder="titlePlaceholder" v-model="customTextTitle" type="text">
                                <div class="p-2 text-center scale-90">
                                    <button @click="saveNewCustomText" class="p-1 px-8 text-black bg-green-500 rounded-full hover:bg-green-800 hover:text-white">Save text</button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="px-4 py-1 font-mono text-lg text-green-400 bg-neutral-700">New custom text  added Successfully!</div>
                    </div>
            </div>
        </div>
</template>

<script setup>
import {ref, watch} from 'vue'
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';

const inputError = ref(false)
const textAreaPlaceholder = ref('Input custom text')
const titlePlaceholder = ref('Add title')
const textAreaValue = ref('')
const saveCustomText = ref(false)
const textSaved = ref(false)
const customTextTitle = ref('')
const main = mainStore()
const textAreaValueStore = ref('')
const { howToUseCustomText,  customTexts, useCustomText} = storeToRefs(main)

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