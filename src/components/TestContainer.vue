<template>
  <div :class="[mobile ? 'pt-6' : 'pt-14']">
    <div :style="containerStyle" class="relative w-fit mx-auto space-y-1 min-h-[50px]">
      <div class="max-w-[1000px] w-full mx-auto">
        <Range class="mx-auto" />
      </div>
      <div class="flex items-center pb-2 justify-between m-auto relative">
        <p v-if="!settings['countdown']"></p>
        <Countdown v-else :start="beginCountdown" />
        <restart
          v-if="canRestart"
          @click="goNext = true"
          :style="{ width: halfTestFontSize + 'px' }"
        />
        <WordCount />
      </div>
    </div>
    <OnScreenInput />
    <AllCharacters />
  </div>
</template>

<script setup>
const mobile = isMobile();

const typingstore = typingStore();
const { focus, testCompleted, playerInputLength } = storeToRefs(typingstore);

const timerstore = timerStore();
const { beginCountdown } = storeToRefs(timerstore);

const nextstore = nextStore();
const { goNext } = storeToRefs(nextstore);

const mainstore = mainStore();
const { scrollTextContainer, currentTest } = storeToRefs(mainstore);

const settingstore = settingsStore();
const { settings, testStyle } = storeToRefs(settingstore);

const font = computed(() => settings.value["fontsize"]);

const halfTestFontSize = computed(() => {
  return font.value < 40 ? font.value : font.value / 2;
});

const canRestart = computed(() => {
  return !testCompleted.value && playerInputLength.value;
});

const containerStyle = computed(() => ({
  ...testStyle.value,
  "font-size": (font.value < 40 ? font.value : font.value / 2) + "px",
}));

useWatcher({
  scrollTextContainer,
});

onMounted(() => {
  focus.value = true;
});
</script>
