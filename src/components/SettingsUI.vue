<template>
    <div class="px-5 space-y-6 py-3 pb-20 border-x border-x-black max-w-[1000px] mx-auto">
        <SearchBar />
        <div class="space-y-4" v-for="(mode, index) in modes" :key="index">
            <Mode 
            :name="mode.name" 
            :desc="mode.desc" />
            <Options 
            :name="mode.name"
            :options="mode.options" />
        </div>
        <CharCombination />
    </div>
</template>

<script setup>
import Mode from './Settings/Mode.vue';
import Options from './Settings/Options.vue';
import SearchBar from './Settings/SearchBar.vue'
import CharCombination from './Settings/CharCombination.vue';

const modes = [
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
    {
        name: 'show typing container border',
        desc: '',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Test width',
        desc: 'Maximum width of the test, this is measured in characters. Lowest should be atleast 5 characters',
        options: ['on', 'off'],
        extra: []
    },
    {
        name: 'Font size',
        desc: '',
        options: null,
        extra: []
    },
    {
        name: 'Test Lines',
        desc: '',
        options: [],
        extra: []
    },
    {
        name: 'Cursor',
        desc: '',
        options: null,
        extra: []
    },
    {
        name: 'Difficulty',
        desc: '',
        options: null,
        extra: []
    },
    {
        name: 'Character Combination',
        desc: 'Toggle to randomly repeat and shuffles your selection. A minimum of two characters and maximum of ten.',
        options: null,
        extra: []
    }
]

</script>