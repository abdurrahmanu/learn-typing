<template>
    <div>
        <div v-if="allSpacesIndex.length > 1" class="w-fit">
            <p>{{ totalNumberOfTypedWords }}/{{ totalNumberOfWords }}</p>
        </div>
    </div>
</template>

<script setup>
const typingstatestore = typingStore()
const { spaces } = storeToRefs(typingstatestore)

const store = mainStore()
const { allSpacesIndex } = storeToRefs(store)

const totalNumberOfTypedWords = computed(() => Object.keys(spaces.value).length )
const totalNumberOfWords = computed(() => allSpacesIndex.value.length + 1 )
</script>