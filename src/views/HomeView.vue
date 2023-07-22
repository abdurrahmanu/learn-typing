<script setup>
import { ref } from 'vue';
import data from '../../data/quotes.json'
import HeaderComponent from '../components/headerComponent.vue';
import typingContainerComponent from '../components/typingContainerComponent.vue';

const containerText = ref('')

const getText = () => {
  let quotes = ''
  let no_of_quotes = 1

  for (let i = 0; i < no_of_quotes; i++) {
    let random = Math.floor(Math.random() * data.length)
    i < 1 ? quotes = data[random].quote : quotes +=  ' ' + data[random].quote
  }

  containerText.value = quotes
}

</script>

<template>
  <div class="bg-neutral-950 min-h-screen lg:max-w-[90%] m-auto pt-5 md:pt-[73px]">
    <HeaderComponent />
    <typingContainerComponent
    @generate="getText"
    :containerText="containerText" />
  </div>
</template>
