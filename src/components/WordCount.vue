<template>
    <div v-if="allSpacesIndex.length > 1" class="w-fit text-[15pt] font-bold">
        <p>{{ totalNumberOfTypedWords }}/{{ totalNumberOfWords }}</p>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { mainStore } from '../store/mainStore';
import { storeToRefs } from 'pinia';

const main = mainStore()
const { spaces, allSpacesIndex } = storeToRefs(main)

const totalNumberOfTypedWords = computed(() => Object.keys(spaces.value).length )
const totalNumberOfWords = computed(() => allSpacesIndex.value.length + 1 )
</script>