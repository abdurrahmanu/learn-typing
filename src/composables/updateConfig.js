import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { connectStore } from "../store/connectStore";
import { themeStore } from "../store/themeStore";
import {getSingleDoc} from './firestoreDocs'
import { storeToRefs } from 'pinia';
import { authStore } from "../store/authStore";

export const updateConfig = async (userData) => {
    const authstore = authStore()
    const {login, user} = storeToRefs(authstore)
    
    const store = mainStore()
    const { customTests} = storeToRefs(store)

    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const connect = connectStore()
    const {loadingApp} = storeToRefs(connect)

    const customize = customizeStore()
    const { customizers, disableOption, textLines, cursorType, difficulty, font, range, blind, backspace } = storeToRefs(customize)
    
    loadingApp.value = false
    theme.value = userData.theme || theme.value
    font.value = userData.fontsize || font.value
    range.value = (font.value - 16) / 0.26
    cursorType.value = userData.cursor || cursorType.value
    blind.value = userData.blind || false
    difficulty.value = userData.difficulty || difficulty.value
    backspace.value = userData.backspace || backspace.value
    customizers.value = userData.config[0] || customizers.value
    disableOption.value = userData.config[1] || disableOption.value
    customTests.value = userData.customTests || customTests.value['demo']
    textLines.value = userData.textLines || 3
}