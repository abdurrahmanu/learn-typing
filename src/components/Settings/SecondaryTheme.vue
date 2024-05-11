<template>
    <div class="flex flex-wrap p-2 px-1 border-t border-neutral-900">
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="green" type="radio" name="" id="green">
            <label for="green">Green</label>
        </div>
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="blue" type="radio" name="" id="blue">
            <label for="blue">Blue</label>
        </div>
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="yellow" type="radio" name="" id="yellow">
            <label for="yellow">Yellow</label>
        </div>
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="teal" type="radio" name="" id="teal">
            <label for="teal">Teal</label>
        </div>
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="red" type="radio" name="" id="red">
            <label for="red">Red</label>
        </div>
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="pink" type="radio" name="" id="input">
            <label for="pink">Pink</label>
        </div>
    </div>
</template>

<script setup>
import {storeToRefs} from 'pinia';
import {mainStore} from '../../store/mainStore';

const main = mainStore()
const { secondaryTheme } = storeToRefs(main)
</script>