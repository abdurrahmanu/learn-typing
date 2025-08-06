<template>
    <div class="text-base max-w-[800px] mx-auto bg-inherit flex-1 border border-neutral-900 overflow-scroll">
        <SearchBar />
        <div
        :class="[theme === 'dark' ? 'hover:bg-[#282a2d]': 'hover:bg-gray-400']"
        class="space-y-2 p-4 transition-all duration-75 relative" 
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
        desc: 'Use your preferred cursor',
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
        desc: 'This sets the test width measured in number of characters. Minimum is 20. Maximum width is set to fit the test container boundaries.',
        options: [],
        extra: []
    },
    {
        name: 'Font size',
        setting: 'fontsize',
        desc: 'Increase and reduce font size',
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
        desc: 'Allows or disallows user to delete errors. enabling correct, you must clear error before going forward',
        options: ['on', 'off', 'correct'],
        extra: []
    },
    {
        name: 'Blur',
        setting: 'blur',
        desc: 'Blur out all words excluding the current and next words. Only works with spaced test.',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Character case',
        setting: 'character-case',
        desc: 'Change test case to upper, lower or camel case',
        options: ['upper', 'lower', 'camel'],
        extra: []
    },
    {
        name: 'Double words',
        setting: 'double-words',
        desc: 'Enable to repeat every word twice. Can only work with spaced test.',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'No space',
        setting: 'no-space',
        desc: 'Enable to remove all spaces in test. e.g. thisisanexample',
        options: ['on', 'off'],
        extra: []
    }
]
</script>