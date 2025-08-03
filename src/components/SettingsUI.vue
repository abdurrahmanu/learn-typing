<template>
    <div class="pb-20 text-base border-x-black max-w-[1000px] mx-auto bg-inherit">
        <SearchBar />
        <div 
        :class="[theme === 'dark' ? 'hover:bg-[#282a2d]': 'hover:bg-gray-400']"
        class="space-y-4 p-4 transition-all duration-75 relative" 
        v-for="(mode, index) in modes" 
        :key="index">
            <Mode 
            :name="mode.name" 
            :desc="mode.desc" />
            <Options 
            :name="mode.name"
            :setting="mode.setting"
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
const {theme} = storeToRefs(themestore)

const modes = [
    {
        name: 'Cursor',
        setting: 'cursor',
        desc: 'Use your preferred cursor type',
        options: null,
        extra: []
    },
    // {
    //     name: 'Difficulty',
    //     setting: '',
    //     desc: 'Change difficulty',
    //     options: null,
    //     extra: []
    // },
    {
        name: 'Test Width',
        setting: 'test-width',
        desc: 'This sets the test width which is measured in number of characters. Minimum should be 20. Maximum width is set to fit the test container boundaries.',
        options: [],
        extra: []
    },
    {
        name: 'Font size',
        setting: 'fontsize',
        desc: 'Increase or reduce font size',
        options: null,
        extra: []
    },
    {
        name: 'Test Lines',
        setting: 'test-lines',
        desc: 'Select the number of lines for the test',
        options: [],
        extra: []
    },
    {
        name: 'Show Border',
        setting: 'show-border',
        desc: 'This shows the test boundary style when enabled',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Backspace',
        setting: 'backspace',
        desc: 'Toggle to enable Backspace or delete key.',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Blur',
        setting: 'blur',
        desc: 'Toggle to blur out all words excluding the current and next words. Only works with spaced test.',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Custom case',
        setting: 'camel-case',
        desc: 'Toggle to randomize positons of uppercase and lowercase alphabets. eg. tHiS is An EXaMplE',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Double words',
        setting: 'double-words',
        desc: 'Toggle to repeat every word twice. Can only work with spaced test.',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'No space',
        setting: 'no-space',
        desc: 'Toggle to remove all spaces in test. e.g. thisisanexample',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Stop on error',
        setting: 'stop-on-error',
        desc: 'With this toggled, you will not be able to go forward until you clear your error. Only works while backspace is enabled',
        options: ['on', 'off'],
        extra: []
    },
]

</script>