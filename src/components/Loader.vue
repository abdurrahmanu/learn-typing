<template>
  <div class="min-h-[100dvh] bg-zinc-300">
    <div class="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] space-y-3">
      <div class="loader m-auto"></div>
      </div>
  </div>
</template>

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
  background: #000000;
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
