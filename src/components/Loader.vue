<template>
  <div class="min-h-[100dvh] w-[100%] bg-neutral-900">
    <div class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] space-y-3">
      <div class="loader m-auto"></div>
      <div class="p-3 m-auto mt-1 space-y-2 rounded-sm ring w-fit hover:ring-green-600 group">
        <div class="relative font-medium cursor-default w-fit h-fit p-[2px] m-auto">
          <span class="absolute top-0 left-[50%] translate-x-[-50%] text-[15px] font-black pt-[1px]">KI</span>
          <board class="w-8"/>
        </div>
        <p class="text-center text-[30px] leading-0 opacity-95 roboto-mono exo-ital"><span class="group-hover:text-blue-500">Ki</span><span class="group-hover:text-green-500">Board</span></p>
      </div>
      </div>
  </div>
</template>

<script setup>
import board from './svg/board.vue';
</script>

<style scoped>
.loader {
  width: 40px;
  height: 26px;
  --c:no-repeat linear-gradient(#000000 0 0);
  background:
    var(--c) 0    100%,
    var(--c) 50%  100%,
    var(--c) 100% 100%;
  background-size:8px calc(100% - 4px);
  position: relative;
}
.loader:before {
  content: "";
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #ffffff;
  left: 0;
  top: 0;
  animation: 
    l3-1 1.5s  linear infinite alternate,
    l3-2 0.75s cubic-bezier(0,200,.8,200) infinite;
}
@keyframes l3-1 {
  100% {left:calc(100% - 8px)}
}
@keyframes l3-2 {
  100% {top:-0.1px}
}
</style>
