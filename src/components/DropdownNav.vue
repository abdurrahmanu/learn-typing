<template>
    <Transition name="slide-in-side-nav" appear mode="in-out"> 
        <div ref="menuEl"  v-show="toggleNavbar" class="absolute top-[50px] z-[1] right-0 h-fit w-fit border border-neutral-400 border-t-0" :class="[appTheme]">
            <div @click="navigate(option), toggleNavbar = !toggleNavbar" class="flex items-center gap-2 px-10 py-3 text-sm cursor-pointer" :class="[theme === 'dark' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100', ]" v-for="(option, index) in options" :key="index">
                <span>{{ option }}</span>
            </div>
        </div>
    </Transition>
</template>

<script setup>
import {ref, onMounted, watchEffect} from 'vue'
import {storeToRefs} from 'pinia'
import {useRouter, useRoute} from 'vue-router'
import {pagesStore}  from '../store/pagesStore'
import {themeStore}  from '../store/themeStore'
import {authStore}  from '../store/authStore'
import { mainStore } from '../store/mainStore'

const menuEl = ref()

const store = mainStore()
const {hasCompletedSession, userEl} = storeToRefs(store)
const {switchNext} = store

const theme_ = themeStore()
const {theme, appTheme } = storeToRefs(theme_)

const pages = pagesStore()
const {toggleNavbar } = storeToRefs(pages)

const auth_ = authStore()
const {isAuthenticated } = storeToRefs(auth_)

const router  = useRouter()

const options = ref(['Home', 'Login'])

onMounted(() => {
    window.addEventListener('click', (event) => {
        if (!menuEl.value.contains(event.target) && event.target !== userEl.value && !userEl.value.contains(event.target)) {
            toggleNavbar.value = false
        }
    })
})

watchEffect(() => {
	if (isAuthenticated.value) {
        options.value.pop()
		options.value.push('Account')
	} else {
        options.value.pop()
		options.value.push('Login')
	}
})

const navigate = (option) => {
	if (option.toLowerCase() === 'login') {
		router.push({path: 'auth'})
	}
	if (option.toLowerCase() === 'account') {
		router.push({path: 'account'})
	}
	if (option.toLowerCase() === 'home') {
		if (hasCompletedSession.value) switchNext()
		router.push({path: '/'})
	}
}
</script>

<style scoped>
.slide-in-side-nav-enter-from {
    transform: translateY(-100%);
}

.slide-in-side-nav-enter-active,
.slide-in-side-nav-leave-active {
    transition: all .5s ease;
}

.slide-in-side-nav-leave-to {
    transform: translateY(-100%);

}
</style>