<template>
    <div class="relative text-xs leading-5 md:text-sm">
        <Header />
        <BlindMode />
        <BackSpace />
        <CustomText />
        <Countdown />
        <AllCaps />
        <CustomCamelCase />
        <NoSpaceText />
    </div>
</template>

<script setup>
import Header from './Header.vue'
import AllCaps from './AllCaps.vue'
import CustomCamelCase from './CustomCamelCase.vue'
import NoSpaceText from './NoSpaceText.vue'
import BlindMode from './BlindMode.vue'
import BackSpace from './BackSpace.vue';
import CustomText from './CustomText.vue';
import Countdown from './CountDown.vue'

const settings = [
    'Blind mode',
    'Backspace',
    'Custom Text',
    'Difficulty Level',
    'Countdown Typing',
    'All Caps',
    'Custom camel case',
    'NoSpace'
]
</script>