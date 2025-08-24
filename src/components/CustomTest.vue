<template>
  <div class="max-w-[700px] w-[95%] rounded-md py-5 z-[4] text-base md:text-lg">
    <div>
      <div v-if="!saveCustomText" class="space-y-1 text-center">
        <p>Using this enables custom test type</p>
        <p class="text-red-400">
          {{
            mobile
              ? "Maximum of 40 words / 500 characters"
              : "Maximum of 150 words / 1200 characters"
          }}
        </p>
        <div class="relative w-[90%] m-auto">
          <p
            @click="textValue = ''"
            v-if="textValue"
            class="absolute top-0 right-0 px-2 py-[2px] uppercase hover:text-red-500 cursor-default"
          >
            X
          </p>
          <textarea
            v-model="textValue"
            class="bg-inherit w-full h-40 p-2 pt-2 border rounded-md outline-none border-slate-500"
            :placeholder="textAreaPlaceholder"
            :maxlength="touchScreen ? 500 : 1200"
            name="custom-textarea"
          />
        </div>
        <div
          @click="startSavingCustomText"
          class="py-[2px] text-sm m-auto text-center border rounded-full px-4 w-fit border-slate-600 hover:bg-green-800 hover:text-white font-medium"
        >
          ADD TEST
        </div>
      </div>
      <div v-else class="pt-3 text-center">
        <p v-if="textSaved" class="py-3 text-center text-green-600 uppercase">
          Added Successfully
        </p>
        <div v-else class="space-y-4">
          <input
            name="custom-title"
            v-model="customTestTitle"
            type="text"
            :placeholder="titlePlaceholder"
            class="p-1 text-center bg-transparent border-b outline-none border-b-blue-500 placeholder:text-center"
          />
          <div class="flex justify-center gap-2 m-auto font-medium w-fit">
            <div
              @click="cancel"
              class="py-[2px] m-auto text-center border rounded-l-full px-4 w-fit border-slate-600 hover:bg-red-500 hover:text-white"
            >
              CANCEL
            </div>
            <div
              @click="saveNewCustomText"
              class="py-[2px] m-auto text-center border rounded-r-full px-4 w-fit border-slate-600 hover:bg-green-800 hover:text-white"
            >
              SAVE
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="max-w-[90%] m-auto">
      <div class="font-medium text-sm">CUSTOM TESTS</div>
      <div class="max-h-[calc(100dvh_-_50dvh)] overflow-y-auto h-fit p-2">
        <div class="relative overflow-y-auto space-y-[5px]">
          <div
            v-for="(test, key, index) in customTests"
            :key="index"
            class="p-2 border hover:shadow-sm"
            :class="[
              theme === 'dark' ? 'border-neutral-700' : 'border-slate-400',
            ]"
          >
            <div class="space-x-1 font-medium uppercase">
              <span>{{ key }}</span>
              <span
                @click="useTest(key)"
                class="px-3 text-white text-xs bg-green-900 rounded-full py-[1px] hover:bg-green-800 ml-1"
                >use</span
              >
              <span
                v-if="index !== 0"
                @click="del(key)"
                class="px-1 text-xs text-white py-[1px] bg-red-500 rounded-full hover:bg-red-600 text-[10px]"
                >delete</span
              >
            </div>
            <div class="font-[400] exo-ital max-h-[100px] overflow-y-auto">
              {{ test }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const mobile = isMobile();
const touchScreen = isTouchScreenDevice();

const settingstore = settingsStore();
const { customTests, settingsToUpdate, customChoice, toggleCustomModal } =
  storeToRefs(settingstore);

const themestore = themeStore();
const { theme } = storeToRefs(themestore);

const textAreaPlaceholder = ref("Add your preferred test, quote or story.");
const titlePlaceholder = ref("Title");
const textValue = ref("");
const saveCustomText = ref(false);
const textSaved = ref(false);
const customTestTitle = ref("");
const textAreaValueStore = ref("");

const startSavingCustomText = () => {
  if (!textValue.value.length) {
    textAreaPlaceholder.value = "You cannot add an empty field";
    return;
  }

  if (textValue.value.length < 10) {
    textValue.value = "";
    textAreaPlaceholder.value =
      "Custom test should be at least 10 letters long";
    return;
  }

  saveCustomText.value = true;
  textAreaValueStore.value = textValue.value;
  textValue.value = "";
};

const saveNewCustomText = () => {
  if (!customTestTitle.value.length) {
    titlePlaceholder.value = "Must add title";
    return;
  }

  customTests.value[customTestTitle.value] = textAreaValueStore.value.trim();

  settingsToUpdate.value.push({
    type: "customTests",
    name: customTestTitle.value,
    value: customTests.value[customTestTitle.value],
  });

  textSaved.value = true;
  customTestTitle.value = "";
  textAreaValueStore.value = "";

  setTimeout(() => {
    saveCustomText.value = false;
    textSaved.value = false;
  }, 500);
};

const cancel = () => {
  saveCustomText.value = false;
  textSaved.value = false;
  customTestTitle.value = "";
};

const del = (key) => {};

const useTest = (testName) => {
  customChoice.value = testName;
  toggleCustomModal.value = false;
  updateSingleSetting("test-type", "custom");
};
</script>

<style scoped></style>
