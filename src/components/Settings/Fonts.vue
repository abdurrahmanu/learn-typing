<template>
    <div class="space-y-2 text-xl">
        <p :class="settings.font">The lazy brown fox got into the hole</p>
        <div class="flex gap-4 flex-wrap">
            <div v-for="font in fonts" @click="newFont = font" :key="font" class="space-y-3 ring-[1px]  w-fit rounded-md p-1 hover:bg-slate-700" :class="[font, font === settings.font ? 'ring-green-500' : 'ring-transparent']">
                <p class="px-2 w-[200px] rounded-md py-1 ring-[1px] text-center">{{ font }}</p>
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
