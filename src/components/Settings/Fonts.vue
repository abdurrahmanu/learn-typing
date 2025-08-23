<template>
    <div class="space-y-2 text-xl">
        <p :class="settings.font" class="h-[50px] text-center">The lazy brown fox got into the hole</p>
        <div class="flex gap-4 flex-wrap justify-center">
            <div
            v-for="font in fonts"
            @click="newFont = font"
            :key="font"
            class="text-center h-fit w-full p-[2px] px-10 max-w-[300px] rounded-md"
            :class="[font,
            theme === 'dark' ? 'inner-shadow-dark' : 'inner-shadow-light',
            currentFont(font)]">
                <p class="px-2 min-w-[130px] hover:text-green-900 rounded-md py-1 text-center">{{ font }}</p>
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

const themestore = themeStore();
const { theme } = storeToRefs(themestore);

const currentFont = (font) => {
    let style = "";
    if (settings.value.font === font) {
        if (theme.value === "dark") style = "bg-slate-300 text-black";
        else style = "bg-neutral-600 text-white";
    } else {
        if (theme.value === "dark") style = "";
        else style = "ring-black hover:ring-4";
    }

  return style;
}

watch(newFont, newVal => {
     emit('emitUpdate', newVal)
})
</script>
