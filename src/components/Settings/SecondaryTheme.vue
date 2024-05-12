<template>
    <p class="py-2 text-center ">SECONDARY COLOR</p>
    <div class="flex flex-wrap p-2 px-1 pt-0">
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="green" type="radio" name="" class="" id="green">
            <label for="green">Green</label>
        </div>
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="blue" type="radio" name="" class="" id="blue">
            <label for="blue">Blue</label>
        </div>
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="yellow" type="radio" name="" class="" id="yellow">
            <label for="yellow">Yellow</label>
        </div>
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="teal" type="radio" name="" class="" id="teal">
            <label for="teal">Teal</label>
        </div>
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="red" type="radio" name="" class="" id="red">
            <label for="red">Red</label>
        </div>
        <div class="px-3 py-2 space-x-4">
            <input v-model="secondaryTheme" value="pink" type="radio" name="" class="" id="input">
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