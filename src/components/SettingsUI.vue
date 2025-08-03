<template>
    <div class="md:px-4 px-2 pb-20 text-base border-x-black max-w-[900px] mx-auto bg-inherit">
        <SearchBar />
        <div 
        :class="[theme === 'dark' ? 'hover:bg-[#282a2d]': 'hover:bg-gray-400']"
        class="space-y-4 p-4 transition-all duration-75" 
        v-for="(mode, index) in modes" 
        :key="index">
            <Mode 
            :name="mode.name" 
            :desc="mode.desc" />
            <Options 
            :name="mode.name"
            :options="mode.options" />
        </div>
    </div>
</template>

<script setup>
import Mode from './Settings/Mode.vue';
import Options from './Settings/Options.vue';
import SearchBar from './Settings/SearchBar.vue'
import { themeStore } from '../store/themeStore';
import { storeToRefs } from 'pinia';

const themestore = themeStore()
const {theme, appTheme} = storeToRefs(themestore)

const modes = [
    {
        name: 'Cursor',
        desc: 'Use your preferred cursor type',
        options: null,
        extra: []
    },
    {
        name: 'Difficulty',
        desc: 'Change difficulty',
        options: null,
        extra: []
    },
    {
        name: 'Test Width',
        desc: 'This sets the test width which is measured in number of characters. Minimum should be at least 20. When lower than 20 it is set to minimun, whem more than maximum container width, it is set to fit the container boundaries.',
        options: [],
        extra: []
    },
    {
        name: 'Font size',
        desc: 'Increase or reduce font size',
        options: null,
        extra: []
    },
    {
        name: 'Test Lines',
        desc: 'Select the number of lines for the test',
        options: [],
        extra: []
    },
    {
        name: 'Show Border',
        desc: 'This shows the test boundary style when enabled',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Backspace',
        desc: 'Toggle to enable Backspace or delete key.',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Blur',
        desc: 'Toggle to blur out all words excluding the current and next words. Only works with spaced test.',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Custom case',
        desc: 'Toggle to randomize positons of uppercase and lowercase alphabets. eg. tHiS is An EXaMplE',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Double words',
        desc: 'Toggle to repeat every word twice. Can only work with spaced test.',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'No space',
        desc: 'Toggle to remove all spaces in test. e.g. thisisanexample',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Stop on error',
        desc: 'With this toggled, you will not be able to go forward until you clear your error. Only works while backspace is enabled',
        options: ['on', 'off'],
        extra: []
    },
]

</script>