<template>
  <div :class="[appTheme]">
    <FontWidth />
    <!-- <AITestGenerator /> -->
    <Loader v-if="loadingApp" />
    <Main v-else />
  </div>
</template>

<script setup>
import {auth} from './firebase'
import { onAuthStateChanged } from 'firebase/auth'

const themestore = themeStore()
const { appTheme } = storeToRefs(themestore)

const authstore = authStore()
const {login, user, data} = storeToRefs(authstore)

const connectstore = connectStore()
const {loadingApp} = storeToRefs(connectstore)

onMounted( async () => {
  loadingApp.value = false

  onAuthStateChanged( auth, async (_) => {
    user.value = _

    if (user.value?.emailVerified && navigator.onLine) {
      // sign in
      if (!data.value) {
        data.value = await getSingleDoc(user.value.uid)
      }

      // sign up
      if (!data.value) {
        data.value = await addSingleDoc(user.value.uid)
      }

      if (data.value) {
        login.value = true
      }
    }

    else {
      loadingApp.value = false
      login.value = false
      data.value = null
      generateTest()
    }

  })

  watch(login, newVal => {
    if (newVal) {
      if (data.value) {
        getUser()
        generateTest()
      }
    }
  })
})

onUnmounted(() => {
  data.value = null
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Caveat:wght@400..700&family=Exo:ital,wght@0,100..900;1,100..900&family=Itim&family=Montserrat+Alternates:ital,wght@0,100..900;1,100..900&family=Pacifico&family=Reddit+Mono:wght@200..900&family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Shadows+Into+Light&family=Fira+Code:wght@300..700&family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&family=Inter:ital,wght@0,100..900;1,100..900&display=swap');

@import url('https://fonts.googleapis.com/css2?family=UnifrakturCook:wght@700&display=swap');

.no-scrollbar::-webkit-scrollbar {
    display: none;
}

.no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none
}

* {
  -webkit-tap-highlight-color: transparent;
}

.center-xy {
  @apply absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
}

.center-xt {
  @apply absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2
}

.center-x {
  @apply absolute left-1/2 -translate-x-1/2
}

.center-y {
  @apply absolute top-1/2 -translate-y-1/2
}

.fill-parent {
  @apply absolute top-0 left-0 bottom-0 right-0
}

.center-text-xy {
  @apply flex items-center justify-center
}

.default {
  @apply appearance-none outline-none
}

.bottom-right {
  @apply absolute bottom-0 right-[2px]
}

.range-style {
    @apply w-[100%] h-1 outline-none
}

.inner-shadow-light {
  @apply shadow-[inset_0_2px_8px_rgba(0,0,0,0.3)]
}

.inner-shadow-dark {
  @apply shadow-[inset_0_2px_6px_rgba(255,255,255,0.15)]
}

.amiri {
  font-family: 'Amiri', serif;
  font-weight: 400;
}

.fraktur {
  font-family: 'UnifrakturCook', cursive;
  font-weight: 700;
}

.caveat {
  font-family: "Caveat", cursive;
  font-weight: 400;
  font-style: normal;
}

.exo {
  font-family: 'Exo', sans-serif;
  font-weight: 400;
}

.montserrat {
  font-family: 'Montserrat Alternates', sans-serif;
  font-weight: 400;
}

.roboto-mono {
  font-family: 'Roboto Mono', monospace;
  /* font-weight: 400; */
}

.reddit-mono {
  font-family: 'Reddit Mono', monospace;
  /* font-weight: 400; */
}

.shadows-into-light {
  font-family: 'Shadows Into Light', cursive;
  font-weight: 400;
}

/* ✅ Added fonts */

.itim {
  font-family: 'Itim', cursive;
  font-weight: 400;
}

.pacifico {
  font-family: 'Pacifico', cursive;
  font-weight: 400;
}

.fira-code {
  font-family: 'Fira Code', monospace;
  font-weight: 400;
}

.source-code-pro {
  font-family: 'Source Code Pro', monospace;
  font-weight: 400;
}

.inter {
  font-family: 'Inter', sans-serif;
  font-weight: 400;
}

</style>
