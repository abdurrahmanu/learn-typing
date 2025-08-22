<template>
  <Transition name="container">
    <div id="focus">
      <div
        id="focus"
        @click="focusInput"
        aria-describedby="full-text"
        ref="testEl"
        class="container-style"
        :style="style"
        :class="[
          wordBreak,
          borderStyle,
          settings.font,
          textPosition === 'center' && 'text-center',
          textPosition === 'left' && 'text-left',
        ]"
      >
        <focusButton
          class="fill-parent center-text-xy text-sm z-[1] backdrop-blur-[6px] font-bold"
        />
        <Character
          v-for="(character, index) in test"
          :index="index"
          :key="index"
          :character="character"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup>
const typingstore = typingStore();
const { inputEl } = storeToRefs(typingstore);

const mainstore = mainStore();
const { currentTest, testEl } = storeToRefs(mainstore);

const test = computed(() => {
  return currentTest.value.test;
});

const setttingstore = settingsStore();
const { settings, textPosition, testStyle, testHeight, contentFitHeight } =
  storeToRefs(setttingstore);

const wordBreak = computed(() => {
  return (
    (settings.value["no-space"] ||
      settings.value["test-type"] === "custom" ||
      settings.value["test-type"] === "characters") &&
    "break-words"
  );
});

const borderStyle = computed(() => {
  return (
    settings.value["show-border"] && "ring-[1px] ring-neutral-900 rounded-md"
  );
});

function focusInput() {
  if (isTouchScreenDevice()) {
    inputEl.value.focus();
  }
}

const style = computed(() => ({
  ...testStyle.value,
  height: contentFitHeight.value + "px",
  "max-height": `min(${testHeight.value}px, ${contentFitHeight.value}px)`,
}));
</script>

<style scoped>
.container-style {
  @apply scroll-smooth px-2 mx-auto overflow-hidden relative;
}
</style>
