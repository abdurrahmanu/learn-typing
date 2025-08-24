<template>
    <div class="py-1 space-y-2">
        <select
        v-model="newFont"
        :class="[settings.font]"
        class="px-4 py-2 outline-none rounded-md text-black min-w-[300px]"
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

const settingstore = settingsStore()
const { settings } = storeToRefs(settingstore)
const {fonts} = settingstore

const newFont = ref(settings.value.font)

watch(newFont, newVal => emit('emitUpdate', newVal))
</script>
