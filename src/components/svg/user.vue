<template>
	<div ref="menuEl" class="relative h-fit">		
		<div @click="toggleSidebar = !toggleSidebar" :class="[toggleSidebar ? 'rounded-t-md shadow-sm shadow-black' : '']" class="px-1 py-2 transition-all duration-100 w-7">
			<svg v-show="!toggleSidebar" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				 viewBox="0 0 472.615 472.615" style="enable-background:new 0 0 472.615 472.615;" xml:space="preserve">
			<g>
				<g>
					<circle cx="236.308" cy="117.504" r="111.537" :fill="svgFill"/>
				</g>
			</g>
			<g>
				<g>
					<path  :fill="svgFill" d="M369,246.306c-1.759-1.195-5.297-3.493-5.297-3.493c-28.511,39.583-74.993,65.402-127.395,65.402
						c-52.407,0-98.894-25.825-127.404-65.416c0,0-2.974,1.947-4.451,2.942C41.444,288.182,0,360.187,0,441.87v24.779h472.615V441.87
						C472.615,360.549,431.538,288.822,369,246.306z"/>
				</g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			<g>
			</g>
			</svg>			
			<p v-show="toggleSidebar" :class="[theme === 'neutral' ? 'hover:border-red-800 hover:text-red-500' : 'hover:border-red-600 hover:text-red-700']" class="text-[12px] text-center text-red-700 border border-transparent font-cursive"><span>X</span></p>
		</div>
		<div v-show="toggleSidebar" :class="[appTheme]" class="w-fit whitespace-nowrap absolute max-w-[200px] h-fit shadow-sm shadow-black z-[999999] top-[100%]">
			<div>
				<div @click="navigate(option), toggleSidebar = !toggleSidebar" class="flex items-center gap-2 px-5 py-3 text-sm cursor-pointer" :class="[theme === 'neutral' ? 'hover:bg-neutral-800' : 'hover:bg-slate-100']" v-for="(option, index) in options" :key="index">
					<!-- <img width="15px" :src="'/' + images[index]" alt=""> -->
					<span>{{ option }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import {storeToRefs} from 'pinia'
import {mainStore} from '../../store/mainStore'
import {useRouter} from 'vue-router'
import {pagesStore}  from '../../store/pagesStore'
import {themeStore}  from '../../store/themeStore'

const theme_ = themeStore()
const {theme, appTheme, svgFill } = storeToRefs(theme_)

const pages = pagesStore()
const {toggleSidebar } = storeToRefs(pages)

const router  = useRouter()

const menuEl = ref(null)
const images = ['keyboard.svg', 'keyboard.svg', 'keyboard.svg']
const options = ['Home', 'Sign Up', 'My Progress']

onMounted(() => {
	window.addEventListener('click', event => {
		if (event.target !== menuEl.value && !menuEl.value.contains(event.target)) {
			toggleSidebar.value = false
    	}	
	})
})

const navigate = (option) => {
	if (option.toLowerCase() === 'my progress') {
		router.push({path: 'progress'})
	} 
	if (option.toLowerCase() === 'sign up') {
		router.push({path: 'sign'})
	}
	if (option.toLowerCase() === 'home') {
		router.push({path: '/'})
	}
}
</script>

<style scoped>
</style>
