<template>
  <div class="flex flex-wrap gap-3">
    <div
      v-for="(value, cursor, index) in allCursors"
      :key="index"
      @click="changeCursor(cursor)"
      class="flex px-5 py-1 font-bold cursor-pointer rounded-md w-[80px] justify-center"
      :class="[cursorStyle(cursor), theme === 'dark' ? 'inner-shadow-dark' : 'inner-shadow-light']"
    >
      <p class="w-fit" :class="value">
        {{ cursor === "word-pulse" ? "word" : "A" }}
      </p>
    </div>
  </div>
</template>

<script setup>
const emit = defineEmits(["emitUpdate"]);
const settingstore = settingsStore();
const { settings } = storeToRefs(settingstore);

const themestore = themeStore();
const { theme } = storeToRefs(themestore);

const allCursors = {
  border: "border-[1px] border-neutral-500",
  cursor: "border-l-[1px] border-l-neutral-500",
  underline: "border-b-[1px] border-b-neutral-500",
  pulse: "animate-pulse",
  "word-pulse": "animate-pulse",
};

const cursorStyle = (cursor) => {
  let style = "";
  if (settings.value.cursor === cursor) {
    if (theme.value === "dark") style = "bg-slate-300 text-black";
    else style = "bg-neutral-600 text-white";
  } else {
    if (theme.value === "dark") style = "";
    else style = "ring-black hover:ring-4";
  }

  return style;
};

const changeCursor = (cursor) => {
  emit("emitUpdate", cursor);
};
</script>

<style scoped>
.pulse {
  transition: all 2s ease;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 80%;
  }
  50% {
    opacity: 30%;
  }
  100% {
    opacity: 80%;
  }
}
</style>
