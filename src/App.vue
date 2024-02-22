<template>
    <div class="relative min-h-[100vh] mx-auto  bg-neutral-900 selection:bg-transparent">
      <RouterView />
  </div>
</template>

// if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
