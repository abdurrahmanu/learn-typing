import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {nextStore} from '../store/nextStore'
import { countdownStore } from '../store/countdownStore';
import { customizeStore } from '../store/customizeStore';
import {correctWrongCountStore} from '../store/correctWrongCountStore'
import {timerStore} from '../store/timerStore'
import { typingStateStore } from '../store/typingStateStore';
import { useRouter } from 'vue-router';
import { isMobile } from './isMobile';
import { watch } from 'vue';
import { textBoxHeight } from './textBox';
import { connectStore } from '../store/connectStore';
import { managePlayerInput } from './managePlayerInput';

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
    const {playerInput, previousPlayerInput, playerInputLength} = storeToRefs(typingstatestore)
    const {resetTypingState} = typingstatestore
    
    const timerstore = timerStore()
    const {clearTimer, wpmTime} = timerstore
    
    const correctwrongstore = correctWrongCountStore()
    const {wrongCount} = storeToRefs(correctwrongstore)
    const {clearResult} = correctwrongstore
    
    const nextstore = nextStore()
    const {switchNext} = nextstore
        
    const customize = customizeStore()
    const { customizers, pauseTyping, hideElements, toggleCapsToast } = storeToRefs(customize)
    
    const store = mainStore()
    const { hasCompletedSession, mobileBackspace, testContainerEl} = storeToRefs(store)
    const {resetToDefault} = store
    
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
            if (!oldVal) wpmTime(hasCompletedSession.value, playerInput.value, playerInputLength.value)
            if (pauseTyping.value) return
            if (mobileBackspace.value && wrongCount.value === 0) {
                playerInput.value = oldVal
                mobileBackspace.value = false
                return
            }
            previousPlayerInput.value = oldVal
            managePlayerInput()
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

                resetToDefault()
                clearResult()
                clearTimer()
                resetTypingState()
                clearCounter()
                switchNext(customizers.value)
              }
            })
      }
      
      if (completed) {
          watch(completed, (newVal) => {
            if (customizers.value['timer']) clearCounter()
            if (newVal) {
                wpmTime(hasCompletedSession.value, playerInput.value, playerInputLength.value)
                router.push({path: 'result'})
              }
          }, {deep: true})
      }

      if (focus) {
        watch(focus, newVal => {
            if (isMobile()) {
              newVal ? hideElements.value = true : ''
            }
          })
      }
}