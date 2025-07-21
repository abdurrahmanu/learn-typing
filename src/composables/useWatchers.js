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
import { updateDB } from './updateDB';
import { userDataStore } from '../store/userDataStore';
import { resultStore } from '../store/resultStore';

export default function useWatchers({
    focus: focus, 
    goNext: next, 
    testCompleted: completed, 
    font: font, 
    toggleCapsToast: capsToggle, 
    playerInput: input,
    scrollTextContainer: scrollContainer,
    settingsToUpdate: update,
    beginTest: begin
}) {
    const router = useRouter()

    const userstore = userDataStore()
    const {userHistory, userInfo, bestStats} = storeToRefs(userstore)

    const typingstatestore = typingStateStore()
    const {inputEl, testCompleted, halfWayReset, completionLevel} = storeToRefs(typingstatestore)
    const {resetTypingState} = typingstatestore
    
    const timerstore = timerStore()
    const {clearTimer, wpmTime} = timerstore

    const resultstore = resultStore()
    const {WPM, accuracy} = storeToRefs(resultstore)
    
    const correctwrongstore = charCountStore()
    const {clearResult} = correctwrongstore
    
    const nextstore = nextStore()
    const {generateNewTest} = nextstore
        
    const customize = customizeStore()
    const { customizers, hideElements, toggleCapsToast, pauseTyping, settingsToUpdate } = storeToRefs(customize)
    
    const mainstore = mainStore()
    const { testContainerEl} = storeToRefs(mainstore)
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
            if (!oldVal) wpmTime(testCompleted.value)
        })
    }

    if (font) {
        watch(font, (newVal) => textBoxHeight())
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

                if (halfWayReset.value && !testCompleted.value && navigator.onLine) {
                    // let currentTimeInSeconds = (performance.now() - startTime.value).toFixed(0) / 1000
                    // let previousTimeInSeconds = userInfo.value.secondsTyped
                    // let totalTime = (currentTimeInSeconds + previousTimeInSeconds).toFixed(2)
                    // userInfo.value.secondsTyped = totalTime
                    userInfo.value.testsStarted++
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
            if (customizers.value['timer']) clearCounter()   
            if (newVal) {
                if (navigator.onLine) {
                    // let currentTimeInSeconds = (performance.now() - startTime.value).toFixed(0) / 1000
                    // let previousTimeInSeconds = userInfo.value.secondsTyped
    
                    // let totalTime = (currentTimeInSeconds + previousTimeInSeconds).toFixed(2)              
                    // userInfo.value.secondsTyped = totalTime
                    userInfo.value.testsFinished++
                    userInfo.value.testsStarted++
                    
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

      if (begin) {
        watch(begin, newVal => {
            if (newVal) {

            }
        })
      }
}