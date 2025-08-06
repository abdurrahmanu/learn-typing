import {storeToRefs} from 'pinia'
import {mainStore} from '../store/mainStore'
import {nextStore} from '../store/nextStore'
import { countdownStore } from '../store/countdownStore';
import { settingsStore } from '../store/settingsStore';
import {characterStore} from '../store/characterStore'
import {timerStore} from '../store/timerStore'
import { typingStateStore } from '../store/typingStateStore';
import { useRouter } from 'vue-router';
import { isMobile } from './isMobile';
import { watch } from 'vue';
import { updateDB } from './updateDB';
import { userDataStore } from '../store/userDataStore';
import { resultStore } from '../store/resultStore';
import { authStore } from '../store/authStore';
import { validateTestLines } from './validateTestLines';

export default function useWatchers({
    focus: focus, 
    goNext: next, 
    testCompleted: completed, 
    toggleCapsToast: capsToggle, 
    playerInput: input,
    scrollTextContainer: scrollContainer,
    settingsToUpdate: update,
}) {
    const router = useRouter()

    const authstore = authStore()
    const {login} = storeToRefs(authstore)

    const userstore = userDataStore()
    const {userHistory, userInfo} = storeToRefs(userstore)

    const typingstatestore = typingStateStore()
    const {inputEl, testCompleted, halfWayReset} = storeToRefs(typingstatestore)
    const {resetTypingState} = typingstatestore
    
    const timerstore = timerStore()
    const {clearTimer, wpmTime} = timerstore

    const resultstore = resultStore()
    const {WPM, accuracy} = storeToRefs(resultstore)
    
    const correctwrongstore = characterStore()
    const {clearResult} = correctwrongstore
    
    const nextstore = nextStore()
    const {generateNewTest} = nextstore
        
    const customize = settingsStore()
    const { settings, hideElements, toggleCapsToast, pauseTyping, settingsToUpdate } = storeToRefs(customize)
    
    const mainstore = mainStore()
    const { testEl} = storeToRefs(mainstore)
    const {resetToDefault} = mainstore
    
    const count = countdownStore()
    const {clearCounter} = count
    
    if (scrollContainer) {
        watch(scrollContainer, (newVal, oldVal)=> {
            if (testEl.value instanceof HTMLElement) {
                if (Object.keys(newVal).length) {
                    testEl.value.scrollTo({
                        top: newVal.top
                    })
                } else {
                    testEl.value.scrollTo({
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
            if (!oldVal) wpmTime(testCompleted.value)
        })
    }
    
    if (capsToggle) {
        watch(capsToggle, (newVal, oldVal) => newVal ? setTimeout(() => toggleCapsToast.value = oldVal, 5000) : false )
    }
      
      if (next) {     
          watch(next, newVal => {
              if (newVal) {
                if (testCompleted.value) {
                    router.push('/')
                }

                if (halfWayReset.value && !testCompleted.value && login.value && navigator.onLine) {
                    // let currentTimeInSeconds = (performance.now() - startTime.value).toFixed(0) / 1000
                    // let previousTimeInSeconds = userInfo.value.secondsTyped
                    // let totalTime = (currentTimeInSeconds + previousTimeInSeconds).toFixed(2)
                    // userInfo.value.secondsTyped = totalTime
                    userInfo.value.testsStarted = Number(userInfo.value.testsStarted) + 1
                    
                    settingsToUpdate.value.push({
                        name: Object.keys({userInfo})[0],
                        value: userInfo.value
                    })
                }

                resetTypingState()
                resetToDefault()
                clearResult()
                clearTimer()
                clearCounter()
                generateNewTest()
              }
            })
      }
      
      if (completed) {
          watch(completed, (newVal) => {
            if (settings.value['countdown']) clearCounter()   
            if (newVal) {
                if (navigator.onLine && login.value) {
                    userInfo.value.testsFinished = Number(userInfo.value.testsFinished) + 1
                    userInfo.value.testsStarted = Number(userInfo.value.testsStarted) + 1
                    
                    userHistory.value.tests.push({
                        date: new Date().toISOString().split('T')[0],
                        test:'', // Yet
                        wpm: WPM.value,
                        accuracy: accuracy.value,
                        mode: '', // Yet
                    })
                    
                    settingsToUpdate.value.push(
                        {
                            name: Object.keys({userInfo})[0],
                            value: userInfo.value
                        },
                        {   
                            name: Object.keys({userHistory})[0],
                            value: userHistory.value
                        }
                    )
                }
                wpmTime(testCompleted.value)
                router.push({path: 'result'})
            }

          }, {deep: true})
      }

      if (focus) {
        watch(focus, newVal => {
            if (newVal) {
                pauseTyping.value = false
                inputEl.value.focus()
                if (isMobile()) newVal ? hideElements.value = true : ''
            } else {
                pauseTyping.value = true
                inputEl.value.blur()
            }
          })
      }

      if (update) {
        watch(update, newVal => {
            if (newVal.length) {                
                updateDB(newVal)
                settingsToUpdate.value = []
            }
        }, {deep: true})
      }
}