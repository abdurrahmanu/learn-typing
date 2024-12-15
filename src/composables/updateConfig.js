import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { connectStore } from "../store/connectStore";
import { themeStore } from "../store/themeStore";
import { storeToRefs } from 'pinia';

export const configUpdate = async () => {
    const main = mainStore()
    const {preferredConfigs, customTests} = storeToRefs(main)

    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const connect = connectStore()
    const {connectingServer} = storeToRefs(connect)

    const customize = customizeStore()
    const { customizers, doubleEachWord, disableOption, cursorType, difficulty, mode, hideElements, font, range, blind, backspace, capslock } = storeToRefs(customize)

    connectingServer.value = false
    doubleEachWord.value = preferredConfigs.value.doubleEachWord
    theme.value = preferredConfigs.value.theme
    font.value = preferredConfigs.value.fontsize 
    range.value = (font.value - 16) / 0.26
    hideElements.value = preferredConfigs.value.hide
    cursorType.value = preferredConfigs.value.cursor
    blind.value = preferredConfigs.value.blind
    difficulty.value = preferredConfigs.value.difficulty
    backspace.value = preferredConfigs.value.backspace
    customizers.value = preferredConfigs.value.config[0]
    disableOption.value = preferredConfigs.value.config[1] 
    mode.value = preferredConfigs.value.mode
    capslock.value = preferredConfigs.value.capslock
    customTests.value = preferredConfigs.value.customTests
}