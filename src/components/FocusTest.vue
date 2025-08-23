<template>
  <p id="focus" v-if="shouldFocus">Click test or press any key to focus</p>
</template>

<script setup>
const typingstore = typingStore();
const { refocus, focus } = storeToRefs(typingstore);

const shouldFocus = computed(() => {
  return (isTouchScreenDevice() && !focus.value) || refocus.value;
});

// watch(focus, newVal => {
//   if (newVal) {
//     shouldFocus.value = false
//   } else {
//     setTimeout(() => {
//       shouldFocus.value = (isTouchScreenDevice() && !focus.value) || refocus.value;
//     }, 300);
//   }
// })
</script>
