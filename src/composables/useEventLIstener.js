import { isTouchScreenDevice } from "./isTouchScreenDevice"
import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore"
import { typingStateStore } from "../store/typingStateStore"
import { connectStore } from "../store/connectStore"
import focusInputElement from "./focusInputElement"
import { inputEvent } from "./inputEvent"
import { storeToRefs } from "pinia"
import { onMounted, onUnmounted } from "vue"
import { mobileInputEvent } from "./mobileInputEvent"
import { DB } from "./connectDB"
import { nextStore } from "../store/nextStore"
import { themeStore } from "../store/themeStore"

export default function useEventListener(target, listener) {
    const nextstore = nextStore()
    const {goNext} = storeToRefs(nextstore)

    const theme_ = themeStore()
    const {openBackgrounds } = storeToRefs(theme_)

    const typingstatestore = typingStateStore()
    const {refocus, focus, backspaceIsPressed, textIsFocused,inputEl} = storeToRefs(typingstatestore)
    
    const customize = customizeStore()
    const {pauseTyping } = storeToRefs(customize)
    
    const store = mainStore()
    const { testContainerEl, hasCompletedSession} = storeToRefs(store)
    
    const connect = connectStore()
    const {connectionAvailable } = storeToRefs(connect)
    
    const eventsObject = {
        'keydown': function() {
            if (pauseTyping.value) return
            if (textIsFocused.value) preventKeyBoardScroll(event)
            if (isTouchScreenDevice() && !focus.value) focusInputElement(true)
        },

        'input': function(event) {
            if (isTouchScreenDevice() && event.srcElement === inputEl.value) {
                mobileInputEvent(event)
            }
            if (event.inputType === 'deleteContentBackward')  backspaceIsPressed.value = true
            else if (event.inputType !== 'deleteContentBackward') backspaceIsPressed.value = false
        },

        'touchmove': function(event) {
            if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) preventScroll(event)
        },

        'wheel': function(event) {
            if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) preventScroll(event)
        },

        'blur': function() {
            refocus.value = true
        },

        'focus': function() {
            refocus.value = false
        },

        'offline': function() {
            connectionAvailable.value = false
        },

        'online': function() {
            DB(true)
        },

        'keypress': function() {
            !isTouchScreenDevice() && inputEvent(event)
        },

        'keydown': function() {
            !isTouchScreenDevice() && inputEvent(event)
        },

        'keyup': function(event) {
            if ((event.key === 'Escape' && !hasCompletedSession.value) || 
            (event.key === 'Enter' && hasCompletedSession.value)) goNext.value = true
        },
 
        'click': function(event) {
            if (!isTouchScreenDevice() || hasCompletedSession.value) return

            const focusElement = event.srcElement.id === 'focus' || event.srcElement.closest('#focus')
        
            if (!focusElement) {
                inputEl.value.blur()
                focus.value = false
            } 
            else focusInputElement()   
        },
    }
    
    onMounted(() => {
        target && target.addEventListener(listener, event => eventsObject[listener](event))        
    })

    // onUnmounted(() => {
    //     target.removeEventListener(listener, undefined)
    // })
}