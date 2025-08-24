<template>
    <div class="py-1 space-y-2">
        <select
        v-model="newFont"
        :class="[settings.font]"
        class="px-4 py-2 appearance-none outline-none rounded-md text-black min-w-[300px]"
        name=""
        id="">
            <option disabled value="Select font">Select font</option>
            <option
            class="px-3 bg-slate-200 appearance-none checked:bg-green-300"
            :class="[font]"
            v-for="(font, index) in fonts"
            :key="index"
            :value="font">{{ font }}</option>
        </select>
        <p :class="settings.font">The lazy brown fox got into the hole</p>
    </div>
</template>

<script setup>
const emit = defineEmits(['emitUpdate'])
const newFont = ref('')

const settingstore = settingsStore()
const { settings } = storeToRefs(settingstore)
const {fonts} = settingstore


const font = computed(() => {
    return settings.value.font
})

watch(newFont, newVal => {
     emit('emitUpdate', newVal)
})

watch(font, newVal => {
    newFont.value = settings.value.font
})

onMounted(() => newFont.value = settings.value.font)
</script>
