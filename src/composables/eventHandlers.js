import { mainStore } from "../store/mainStore"
import { typingStateStore } from "../store/typingStateStore"
import { nextStore } from "../store/nextStore"
import { connectStore } from "../store/connectStore"
import { inputEvent } from "./inputEvent"
import { storeToRefs } from "pinia"
import { DB } from "./connectDB"
import preventKeyBoardScroll from "./preventKeyBoardScroll"
 
const nextstore = nextStore()
const {goNext} = storeToRefs(nextstore)

const typingstatestore = typingStateStore()
const {refocus, focus, textIsFocused} = storeToRefs(typingstatestore)

const store = mainStore()
const { testContainerEl, hasCompletedSession} = storeToRefs(store)

const connect = connectStore()
const {connectionAvailable } = storeToRefs(connect)

export function handleTouchMove(event) {
    if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) {
        preventScroll(event);
    }
}

export function handleWheel(event) {
    if (event.target === testContainerEl.value || testContainerEl.value.contains(event.srcElement)) {
        preventScroll(event);
    }
}

export function handleBlur() {
    refocus.value = true;
}

export function handleFocus() {
    refocus.value = false;
}

export function handleOffline() {
    connectionAvailable.value = false;
}

export function handleOnline() {
    DB(true);
}

export function handleKeydown(event) {        
    if (
        (event.key === 'Escape' && !hasCompletedSession.value) || 
        (event.key === 'Enter' && hasCompletedSession.value)
    ) {
        goNext.value = true;
        return;
    }

    if (textIsFocused.value) {
        preventKeyBoardScroll(event);
    }
    inputEvent(event);
}

export function handleClick(event) {
    if (hasCompletedSession.value) return;
    const focusElement = event.srcElement.id === 'focus' || event.srcElement.closest('#focus');
    focusElement ? focus.value = true : focus.value = false;
}