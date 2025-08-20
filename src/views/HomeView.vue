<template>
    <div ref="testContainerEl" v-if="!testCompleted" class="mx-auto relative max-w-[1500px] overflow-hidden w-full py-10 flex-1 bg-inherit"> 
        <QuickSettings />
        <TestContainer />
    </div>
</template>
<script setup>
const settingstore = settingsStore()
const {settingsToUpdate, toggleCapsToast, pauseTyping, toggleCustomModal} = storeToRefs(settingstore)

const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const typingstatestore = typingStore()
const {refocus, testCompleted, focus, playerInput, beginTest, inputEl} = storeToRefs(typingstatestore)

const mainstore = mainStore()
const { testEl, testContainerEl, font, AIfocus} = storeToRefs(mainstore)

const connect = connectStore()
const {connectionAvailable } = storeToRefs(connect)

function handleKeydown(event) {
    if (AIfocus.value) return
    const eventType = event.inputType || event.key
    const pasteDropReplaceEvents = ['insertFromPaste','insertFromDrop','insertReplacementText']

    if (toggleCustomModal.value) return // temporary --------- will fix later

    if (pasteDropReplaceEvents.includes(eventType)) return

    if (pauseTyping.value) {
        focus.value = true
        pauseTyping.value = false
        return
    }
    
    if (eventType === 'Escape' && !testCompleted.value)  {
        goNext.value = true;
        return;
    }

    if (eventType === 'CapsLock') {
        toggleCapsToast.value = true;
        setTimeout(() => {
            toggleCapsToast.value = false;
        }, 2000);
    }

    let value = inputEvent(event)

    if (value) evaluateInput(value);
}

function handleTouchMove(event) {
    if (event.target === testEl.value || testEl.value.contains(event.srcElement)) {
    }
}

function handleWheel(event) {
    if (event.target === testEl.value || testEl.value.contains(event.srcElement)) {
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
    const focusElement = event.srcElement.id === 'focus' || event.srcElement.closest('#focus');
    if (focusElement) {
        if (focus.value) return
        else focus.value = true
    }
    else focus.value = false
}

onMounted(() => {
    let mounted = true
    validateTestLines(mounted)
    useEventListener('touchmove', handleTouchMove)
    useEventListener('wheel', handleWheel)
    useEventListener('blur', handleBlur)
    useEventListener('focus', handleFocus)
    useEventListener('offline', handleOffline)
    useEventListener('online', handleOnline)
    useEventListener('keydown', handleKeydown)
    useEventListener('click', handleClick)
    useEventListener('input', handleKeydown, false, inputEl.value)
})

onUnmounted(() => {
  useEventListener('touchmove', handleTouchMove, true)
  useEventListener('wheel', handleWheel, true)
  useEventListener('blur', handleBlur, true)
  useEventListener('focus', handleFocus, true)
  useEventListener('offline', handleOffline, true)
  useEventListener('online', handleOnline, true)
  useEventListener('keydown', handleKeydown, true)
  useEventListener('click', handleClick, true)
  useEventListener('input', handleKeydown, false, inputEl.value)
})

useWatchers({
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