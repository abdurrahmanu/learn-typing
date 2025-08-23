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
          centerLoader,
          wordBreak,
          borderStyle,
          settings.font,
          textPosition === 'center' && 'text-center',
          textPosition === 'left' && 'text-left',
        ]">
        <TestLoader v-if="!currentTest?.test"/>
        <FocusTest class="focus-button fill-parent center-text-xy"/>
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
import FocusButton from './FocusTest.vue';

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

const centerLoader = computed(() => {
  if (!currentTest.value.test) return 'flex justify-center items-center'
})

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
  @apply scroll-smooth px-2 mx-auto overflow-hidden relative ;
}

.focus-button {
  @apply text-sm z-[1] backdrop-blur-[6px] font-bold
}
</style>
