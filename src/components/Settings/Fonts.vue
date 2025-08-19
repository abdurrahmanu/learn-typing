<template>
    <div class="space-y-2 text-xl">
        <p :class="settings.font" class="h-[50px]">The lazy brown fox got into the hole</p>
        <div class="flex gap-4 flex-wrap justify-center">
            <div v-for="font in fonts" @click="newFont = font" :key="font" class="space-y-3 ring-[1px]  w-fit rounded-md p-1 px-2 whitespace-nowrap hover:ring-neutral-300" :class="[font, font === settings.font ? 'ring-green-500' : 'ring-neutral-500']">
                <p class="px-2 min-w-[130px] rounded-md py-1 text-center">{{ font }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['emitUpdate'])
const newFont = ref('')

const settingstore = settingsStore()
const { settings } = storeToRefs(settingstore)
const {fonts} = settingstore

watch(newFont, newVal => {    
     emit('emitUpdate', newVal)
})
</script>
