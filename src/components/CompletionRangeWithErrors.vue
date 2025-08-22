<template>
  <div ref="rangeEl" v-show="!testCompleted && completionLevel">
    <div :style="{ width: completionLevel + '%' }" class="flex h-1">
      <div
        v-show="index <= playerInput.length - 1"
        :class="[
          playerInput[index] === alphabet && index <= playerInput.length - 1
            ? 'bg-green-500'
            : 'bg-red-500',
        ]"
        :style="{ width: singleDivWidth + 'px' }"
        v-for="(alphabet, index) in currentTest.test"
        :key="index"
      ></div>
    </div>
  </div>
</template>

<script setup>
const rangeEl = ref(null);
const singleDivWidth = ref(0);

const typingstore = typingStore();
const { completionLevel, playerInput, testCompleted } =
  storeToRefs(typingstore);

const store = mainStore();
const { currentTest } = storeToRefs(store);

const { test } = currentTest.value;

onMounted(() => {
  watchEffect(() => {
    if (test.length) {
      const cssObject = getComputedStyle(rangeEl.value.parentElement);
      const width = +cssObject.getPropertyValue("width").slice(0, -2);
      singleDivWidth.value = +(width / test.length).toFixed(2);
    }
  });
});
</script>
