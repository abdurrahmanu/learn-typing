import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { connectStore } from "../store/connectStore";
import { themeStore } from "../store/themeStore";
import { storeToRefs } from 'pinia';
import { authStore } from "../store/authStore";

export const updateDataFromDB = (data) => {
    const store = mainStore()
    const { customTests} = storeToRefs(store)

    const authstore = authStore()
    const {userDataAndStats} = storeToRefs(authstore)

    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const connect = connectStore()
    const {loadingApp} = storeToRefs(connect)

    const customize = customizeStore()
    const { customizers, disableOption, textLines, cursorType, difficulty, font, range, blind, backspace } = storeToRefs(customize)

    loadingApp.value = false
    
    theme.value = data.theme || theme.value
    font.value = data.fontsize || font.value
    range.value = (font.value - 16) / 0.26
    cursorType.value = data.cursor || cursorType.value
    blind.value = data.blind || false
    difficulty.value = data.difficulty || difficulty.value
    backspace.value = data.backspace || backspace.value
    customizers.value = data.config[0] || customizers.value
    disableOption.value = data.config[1] || disableOption.value
    customTests.value = data.customTests || customTests.value['demo']
    textLines.value = data.textLines || 3
    userDataAndStats.value = {
        user: data.user,
        bestStats: data.bestStats,
        userHistory: data.userHistory
    }
}