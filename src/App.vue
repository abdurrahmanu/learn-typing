<template>
    <div class="relative min-h-[100vh] mx-auto  bg-neutral-900 selection:bg-transparent">
      <RouterView />
  </div>
<!-- if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) -->
</template>

<script setup>
import {ref, watch} from 'vue'

// const {quotesWithoutAuthors} = englishWords()
// for (let index = 0; index < quotesWithoutAuthors.length; index++) {
//   if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length <= 9 ) {
//     newQuotes.value['ten'].push(quotesWithoutAuthors[index])
//   }   else if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length  <= 19) {
//     newQuotes.value['twenty'].push(quotesWithoutAuthors[index])
//   } else  if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length  <= 29) {
//     newQuotes.value['thirty'].push(quotesWithoutAuthors[index])
//   } else if (quotesWithoutAuthors[index].length - quotesWithoutAuthors[index].replace(/\s+/g, '').length  <= 39) {
//     newQuotes.value['fourty'].push(quotesWithoutAuthors[index])
//   }
// }
</script>