<template>
  <div class="relative max-h-fit min-h-screen lg:w-full w-[90%] m-auto pt-10 md:pt-[73px] flex flex-col gap-1">
    <headerComponent 
    @newConfig="checkConfiguration($event)"
    @selectedOptionsArray="customizeProp = $event"
    />
    
    <div class="relative">
      <component 
      :class="[proposeRestart ? 'blur-sm': '']"
      :next="next" 
      :result="result"
      :restart="restart"
      :is="components[viewComponentIndex]" 
      :customizeSettingsProp="customizeSettingsProp" 
      :textAlign="viewComponentIndex === 0 && textAlign.length > 0" 
      @resultData="result = $event"
      @sessionCompleted="nextComponent(1)"
      @nextSession="viewComponentIndex = 0, switchNext(0)"
      @startedTyping="startedTyping = true"
      />

      <div @click="proposeRestart = false, restart = true" v-if="proposeRestart" class="text-white font-mono absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        restart
      </div>
    </div>
    
    <div class="absolute text-xs bottom-5 grid gap-5 justify-center w-full">
      <RestartButtonComponent @escapeToNextSession="switchNext" />
      <AllContacts />
    </div>
  </div>
</template>

<script setup>
import AllContacts from '@/components/AllContacts.vue'
import headerComponent from '../components/headerComponent.vue'
import RestartButtonComponent from '../components/restartButtonComponent.vue';
import TypingView from './TypingView.vue';
import ResultView from './ResultView.vue';
import UserProgressView from './UserProgressView.vue';
import { ref, watchEffect, watch } from 'vue';

const components = [TypingView, ResultView, UserProgressView]
const next = ref(false)
const viewComponentIndex = ref(0)
const customizeProp = ref([])
const customizeSettingsProp = ref([])
const textAlign = ref('')
const result = ref(null)
const changeMainComponent = ref(false)
const proposeRestart = ref(false)
const restart = ref(false)
const startedTyping = ref(false)

const checkConfiguration = (e) => {
  if (startedTyping.value) {
    viewComponentIndex.value === 0 ? proposeRestart.value = true : ''
  }
}

const switchNext = () => {
  next.value = true
  setTimeout(() => {    
    next.value = false
  }, 0);
}

watchEffect(() => {
  if (restart.value) {
    setTimeout(() => {
      restart.value = false
    }, 100);
  }
})

const nextComponent = (index) => {
    startedTyping.value = false
    changeMainComponent.value = true
  setTimeout(() => {
      viewComponentIndex.value = index
      changeMainComponent.value = false
  }, 600);
}

watch(customizeProp, (newValue, oldValue) => {
  customizeSettingsProp.value = newValue

  if (newValue.includes('centralize')) {
    textAlign.value = 'text-center'
  } else textAlign.value = ''
}, { deep: true }
)

</script>

<style scoped>
.scale-up-enter-from {
  width: 1px;
  height: 1px;
  opacity: 0;
}

.scale-up-enter-to {
  width: 1000px;
  height: 1000px;
  opacity: 1;
}

.scale-up-enter-active,
.scale-up-leave-active {
  transition: all ease 600ms;
}

.scale-up-leave-to {
  display: hidden;
}

</style>
