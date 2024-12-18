<template>
    <div :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-zinc-200']" class="py-2 pl-5">
        <div  class="flex justify-between w-full p-1 border border-transparent rounded-sm ">
            <div @click="customizeFunc" class="flex gap-4 w-fit">
                <input name="caps" :checked="customizers[settings]" type="checkbox" class="checked:accent-green-500 hover:accent-green-700">
                <label class="text-sm font-medium w-fit">
                    <span>{{name}}</span>
                    <span v-if="customizers[settings] && bool" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-teal-800 ml-1">hard</span>
                    <span v-else-if="customizers[settings] && !bool" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-yellow-800 ml-1">medium</span>
                    <span v-else-if="!customizers[settings]" class="px-3 text-white uppercase rounded-full py-[1px] text-[10px] bg-lime-800 ml-1">easy</span>
                </label>
            </div>
        </div>
        <p class="px-3 font-[400]">{{ about }}</p>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia'
import {customizeStore} from '../../store/customizeStore'
import { themeStore } from '../../store/themeStore';

const theme_ = themeStore()
const {theme} = theme_

const props = defineProps({
    settings: String,
    name: String,
    about: String,
    bool: Boolean,
})

{/* <SettingsUI
                    settings="all-caps"
                    name="Uppercase"
                    about="Toggle to capitalize test."
                    :bool="capslock"/>
 */}

const store = customizeStore()
const {customizers } = storeToRefs(store)
const {customize} = store

const customizeFunc = () => {
    customizers.value[props.settings] = !customizers.value[props.settings]
    customize(props.settings, customizers.value[props.settings])
}

const set = {
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: capslock.value
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
    capslock: {        
        settings: "all-caps",
        name: "Uppercase",
        about: "Toggle to capitalize test.",
        bool: "capslock"
    },
}
</script>