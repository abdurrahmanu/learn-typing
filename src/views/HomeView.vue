<template>
    <div  class="m-auto max-w-[1500px] lg:flex pt-10 pb-5"> 
      <div class="w-[100%] mx-auto flex-none space-y-2">   
        <Customize />
        <TestContainer />
      </div>
    </div>
</template>

<script setup>
import TestContainer from '../components/TestContainer.vue'
import Customize from '../components/Customize.vue'
</script>
