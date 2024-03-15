<template>
    <div class="pt-1 text-sm md:text-base">
        <div class="m-auto text-center p-2">
            <input type="search" class="px-3 py-1 rounded-full min-w-[100%] max-w-[300px] outline-none " :value="value" name="" id="" placeholder="search settings">
        </div>
        <div class="pt-1 text-slate-500" v-for="(settingArr, key, index) in settings">
            <div class="font-mono text-lg p-1">{{ key }}</div>
            <div class="py-1 px-3 hover:text-slate-400 hover:bg-zinc-600" v-for="(setting, index) in settingArr" :key="index">{{  setting }}</div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const value = ref('')
const settings = ref({
    'Words': [
        'asdfasdf',
        'asdfasasd',
        'asdfaf',
        'asdfasf',
        'asdfasf'
    ],
    'Words': [
        'asdfasdf',
        'asdfasasd',
        'asdfaf',
        'asdfasf',
        'asdfasf,'
    ],
    'Words': [
        'asdfasdf',
        'asdfasasd',
        'asdfaf',
        'asdfasf',
        'asdfasf,'
    ],
    'Words': [
        'asdfasdf',
        'asdfasasd',
        'asdfaf',
        'asdfasf',
        'asdfasf,'
    ]
})
</script>

<style scoped>

</style>