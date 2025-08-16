<template>
    <div class="flex justify-center mx-auto cursor-pointer gap-3 w-fit max-[500px]:hidden">
        <div @click="textPosition = 'left'">
            <alignLeft :position="textPosition === 'left' && true" class="w-5" />
        </div>
        <div  @click="textPosition = 'center'">
            <alignJustify :position="textPosition === 'center' && true" class="w-5"/>
        </div>
    </div>
</template>

<script setup>
const customize = settingsStore()
const {textPosition} = storeToRefs(customize)
</script>