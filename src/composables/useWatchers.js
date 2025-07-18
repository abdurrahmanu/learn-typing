import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {nextStore} from '../store/nextStore'
import { countdownStore } from '../store/countdownStore';
import { customizeStore } from '../store/customizeStore';
import {charCountStore} from '../store/charCountStore'
import {timerStore} from '../store/timerStore'
import { typingStateStore } from '../store/typingStateStore';
import { useRouter } from 'vue-router';
import { isMobile } from './isMobile';
import { watch } from 'vue';
import { textBoxHeight } from './textBox';
import { connectStore } from '../store/connectStore';

export default function useWatchers({
    focus: focus, 
    goNext: next, 
    hasCompletedSession: completed, 
    font: font, 
    toggleCapsToast: capsToggle, 
    preferredConfigs: config,
    playerInput: input,
    scrollTextContainer: scrollContainer,
}) {
    const router = useRouter()
    
    const connectstore = connectStore()
    const {showConnectionStrength, connectionStrength} = storeToRefs(connectstore)

    const typingstatestore = typingStateStore()
    const {inputEl} = storeToRefs(typingstatestore)
    const {resetTypingState} = typingstatestore
    
    const timerstore = timerStore()
    const {clearTimer, wpmTime} = timerstore
    
    const correctwrongstore = charCountStore()
    const {clearResult} = correctwrongstore
    
    const nextstore = nextStore()
    const {switchNext} = nextstore
        
    const customize = customizeStore()
    const { customizers, hideElements, toggleCapsToast, pauseTyping } = storeToRefs(customize)
    
    const mainstore = mainStore()
    const { hasCompletedSession, testContainerEl} = storeToRefs(mainstore)
    const {resetToDefault} = mainstore
    
    const count = countdownStore()
    const {clearCounter} = count
    
    if (scrollContainer) {
        watch(scrollContainer, (newVal, oldVal)=> {
            if (testContainerEl.value instanceof HTMLElement) {
                if (Object.keys(newVal).length) {
                    testContainerEl.value.scrollTo({
                        top: newVal.top
                    })
                } else {
                    testContainerEl.value.scrollTo({
                        top: 0
                    })
                }
            }
            }, 
            {deep: true}
        )
    }
    
    if (input) {
        watch(input, (newVal, oldVal) => {
            if (!oldVal) wpmTime(hasCompletedSession.value)
        })
    }

    if (font) {
        watch(font, (newVal) => textBoxHeight())
    }
    
    if (capsToggle) {
        watch(capsToggle, (newVal, oldVal) => newVal ? setTimeout(() => toggleCapsToast.value = oldVal, 5000) : false )
    }
    
    if (config) {
          watch(config, newVal => {
              if (newVal && navigator.onLine && showConnectionStrength.value) {
                connectionStrength.value = 'connected'
                setTimeout(() => {
                  showConnectionStrength.value = false
                }, 4000);
              }
            }, {deep: true})  
      }
      
      if (next) {     
          watch(next, newVal => {
              if (newVal) {
                if (hasCompletedSession.value) {
                    router.push('/')
                }
                
                resetTypingState()
                resetToDefault()
                clearResult()
                clearTimer()
                clearCounter()
                switchNext()
              }
            })
      }
      
      if (completed) {
          watch(completed, (newVal) => {
            if (customizers.value['timer']) clearCounter()
            if (newVal) {
                wpmTime(hasCompletedSession.value)
                router.push({path: 'result'})
              }
          }, {deep: true})
      }

      if (focus) {
        watch(focus, newVal => {
            if (newVal) {
                pauseTyping.value = false
                inputEl.value.focus()
                // navigator.virtualKeyboard.show()
                if (isMobile()) newVal ? hideElements.value = true : ''
            } else {
                pauseTyping.value = true
                inputEl.value.blur()
            }
          })
      }
}