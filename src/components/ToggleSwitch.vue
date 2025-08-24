<template>
    <div class="rounded-full font-bold flex items-center text-xs ring-[2px] ring-neutral-700">
        <button
        v-for="(option, index) in options" :key="index"
        :class="[selectedOption(option)]"
        class="flex-1 text-center uppercase px-6 rounded-full py-2"
        @click="update(option, index)">
        {{ option }}
        </button>
    </div>
</template>

<script setup>
const emit = defineEmits(['update'])

const settingstore = settingsStore()
const { settings } = storeToRefs(settingstore)

const themestore = themeStore();
const { theme } = storeToRefs(themestore);

const toggleIndex = ref(0)

const update = (option, index) => {
    toggleIndex.value = index
    emit('update', option)
}

const props = defineProps({
    options: Array,
    setting: String,
})

const selectedOption = (opt) => {
    let value = settings.value[props.setting] === true ? 'on' : settings.value[props.setting] === false  ? 'off' : settings.value[props.setting]
    return value === opt && 'bg-green-600 text-white'
}
</script>

<style scoped>
.bg {
    background: #b9b8b8;
}
</style>
