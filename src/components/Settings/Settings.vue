<template>
    <div class="text-xs leading-5 md:text-sm h-fit rounded-[10px]">
        <Header />
        <div class="m-auto text-center p-2">
            <input type="search" class="px-3 w-full min-w-[100%] max-w-[300px] outline-none text-black p-1 rounded-full" name="" id="" placeholder="search settings">
        </div>
        <BlindMode />
        <BackSpace />
        <CustomText />
        <DifficultyLevel />
        <Countdown />
    </div>
</template>

<script setup>
import Header from './Header.vue'
import BlindMode from './BlindMode.vue'
import BackSpace from './BackSpace.vue';
import CustomText from './CustomText.vue';
import DifficultyLevel from './DifficultyLevel.vue'
import Countdown from './CountDown.vue'
import {mainStore} from '../../store/mainStore';
</script>