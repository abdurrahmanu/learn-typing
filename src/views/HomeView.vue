<template>
  <div
    ref="testContainerEl"
    v-if="!testCompleted"
    class="mx-auto relative max-w-[1500px] overflow-hidden w-full py-10 flex-1 bg-inherit"
  >
    <QuickSettings />
    <TestContainer />
  </div>
</template>
<script setup>
const settingstore = settingsStore();
const { settingsToUpdate, toggleCapsToast, pauseTyping, toggleCustomModal } =
  storeToRefs(settingstore);

const nextstore = nextStore();
const { goNext } = storeToRefs(nextstore);

const typingstatestore = typingStore();
const { refocus, testCompleted, focus, playerInput, beginTest, inputEl } =
  storeToRefs(typingstatestore);

const mainstore = mainStore();
const { testEl, testContainerEl, font } = storeToRefs(mainstore);

const connect = connectStore();
const { connectionAvailable } = storeToRefs(connect);

function handleKeydown(event) {
  const eventType = event.inputType || event.key;
  const pasteDropReplaceEvents = [
    "insertFromPaste",
    "insertFromDrop",
    "insertReplacementText",
  ];

  if (toggleCustomModal.value) return; // temporary --------- will fix later

  if (pasteDropReplaceEvents.includes(eventType)) return;

  if (pauseTyping.value) {
    focus.value = true;
    pauseTyping.value = false;
    return;
  }

  if (eventType === "Escape" && !testCompleted.value) {
    goNext.value = true;
    return;
  }

  if (eventType === "CapsLock") {
    toggleCapsToast.value = true;
    setTimeout(() => {
      toggleCapsToast.value = false;
    }, 2000);
  }

  let value = inputEvent(event);

  if (value) evaluateInput(value);
}

function handleTouchMove(event) {
  if (
    event.target === testEl.value ||
    testEl.value.contains(event.srcElement)
  ) {
  }
}

function handleWheel(event) {
  if (
    event.target === testEl.value ||
    testEl.value.contains(event.srcElement)
  ) {
  }
}

function handleBlur() {
  refocus.value = true;
}

function handleFocus() {
  refocus.value = false;
}

function handleOffline() {
  connectionAvailable.value = false;
}

function handleOnline() {
  // DB();
}

function handleClick(event) {
  if (testCompleted.value) return;
  const focusElement =
    event.srcElement.id === "focus" || event.srcElement.closest("#focus");
  if (focusElement) {
    if (focus.value) return;
    else focus.value = true;
  } else focus.value = false;
}

let mobile = isMobile();

onMounted(() => {
  let mounted = true;
  validateTestLines(mounted);
  useListener("touchmove", handleTouchMove);
  useListener("wheel", handleWheel);
  useListener("blur", handleBlur);
  useListener("focus", handleFocus);
  useListener("offline", handleOffline);
  useListener("online", handleOnline);
  useListener("click", handleClick);
  mobile
    ? useListener("input", handleKeydown, false, inputEl.value)
    : useListener("keydown", handleKeydown);
});

onUnmounted(() => {
  useListener("touchmove", handleTouchMove, true);
  useListener("wheel", handleWheel, true);
  useListener("blur", handleBlur, true);
  useListener("focus", handleFocus, true);
  useListener("offline", handleOffline, true);
  useListener("online", handleOnline, true);
  useListener("click", handleClick, true);
  mobile
    ? useListener("input", handleKeydown, false, inputEl.value)
    : useListener("keydown", handleKeydown, true);
});

useWatcher({
  focus,
  goNext,
  testCompleted,
  font,
  toggleCapsToast,
  playerInput,
  settingsToUpdate,
  beginTest,
});
</script>
