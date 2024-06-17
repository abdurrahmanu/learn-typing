<template>
    <nav :class="[appTheme]" class="sticky top-0 mx-auto flex items-center justify-between py-2 pl-3 pr-2 h-[50px] shadow-sm shadow-black max-w-[1300px] mb-3 z-[2] xl:fixed lg:w-full">
        <div class="flex items-center gap-3">
            <user @click="toggleSidebar = !toggleSidebar"/>
            <div class="font-mono text-xl font-bold cursor-default md:text-2xl">KEYS-HUB</div>
        </div>
        <div class="flex gap-2 rounded-full w-fit">
            <settings v-if="route.name === 'home'" @click="toggleSettings" class="h-7" />
        </div>
    </nav>
</template>

<script setup>
import user from './svg/user.vue'
import settings from './svg/settings.vue';
import {storeToRefs} from 'pinia'
import { pagesStore } from '../store/pagesStore';
import {customizeStore} from '../store/customizeStore'
import { mainStore } from '../store/mainStore';
import {useRoute} from 'vue-router'
import {themeStore}  from '../store/themeStore'

const pages = pagesStore()
const {toggleSidebar } = storeToRefs(pages)

const theme_ = themeStore()
const { appTheme } = storeToRefs(theme_)

const route = useRoute()
const store = mainStore()
const { pauseTyping} = storeToRefs(store)

const main = customizeStore()
const { showMoreSettings} = storeToRefs(main)

const toggleSettings = () => {
    showMoreSettings.value = !showMoreSettings.value
    if (showMoreSettings.value) pauseTyping.value = true
    else pauseTyping.value = false
}
</script>

