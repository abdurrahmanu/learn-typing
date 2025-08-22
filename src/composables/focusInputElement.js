export default function focusInputElement(delay) {
  const mainstore = mainStore();
  const { route } = storeToRefs(mainstore);

  const settingstore = settingsStore();
  const { pauseTyping } = storeToRefs(settingstore);

  const typingstore = typingStore();
  const { focus } = storeToRefs(typingstore);

  if (pauseTyping.value && route.value !== "home") return;

  focus.value = true;
}
