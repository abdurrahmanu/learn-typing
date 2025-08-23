<template>
  <div class="md:w-[40%] w-full flex flex-wrap px-3">
    <div class="relative flex flex-wrap w-full gap-4">
      <p
        @click="update(option)"
        v-for="(option, index) in options"
        :key="index"
        :class="[selectedOption(option), theme === 'dark' ? 'inner-shadow-dark' : 'inner-shadow-light']"
        class="text-center font-mono h-fit font-bold w-full p-[2px] px-10 max-w-[300px] rounded-md uppercase"
      >
        {{ option }}
      </p>
    </div>
    <div v-for="(comp, name_, index) in components" :key="index" class="w-full">
      <component
        :is="comp"
        @emitUpdate="update"
        v-if="name === name_"
      ></component>
    </div>
  </div>
</template>

<script setup>
import CursorSetting from "./CursorSetting.vue";
import Difficulty from "./Difficulty.vue";
import FontRange from "./FontRange.vue";
import TestLines from "./TestLines.vue";
import TestWidth from "./TestWidth.vue";
import Fonts from "./Fonts.vue";

const themestore = themeStore();
const { theme } = storeToRefs(themestore);

const components = {
  "Test Width": TestWidth,
  "Test Lines": TestLines,
  Cursor: CursorSetting,
  Difficulty: Difficulty,
  "Font size": FontRange,
  Fonts: Fonts,
};

const props = defineProps({
  options: {
    default: [],
    value: Array,
  },
  name: {
    default: "Mode",
    value: String,
  },
  setting: {
    default: "",
    value: String,
  },
});

const settingstore = settingsStore();
const { settings } = storeToRefs(settingstore);
const { updateSingleSetting } = settingstore;

const userOption = ref(
  settings.value[props.setting] === false
    ? "off"
    : settings.value[props.setting] === true
    ? "on"
    : settings.value[props.setting]
);

const update = (option) => {
  userOption.value = option;
  let value = option === "on" ? true : option === "off" ? false : option;
  updateSingleSetting(props.setting, value);
};

const selectedOption = (option) => {
  let style = "";
  if (userOption.value === option) {
    if (theme.value === "dark") style = "bg-slate-300 text-black";
    else style = "bg-neutral-600 text-white";
  } else {
    if (theme.value === "dark") style = "";
    else style = "ring-black hover:ring-4";
  }

  return style;
};
</script>
