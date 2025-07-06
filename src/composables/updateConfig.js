import { mainStore } from "../store/mainStore"
import { customizeStore } from "../store/customizeStore";
import { connectStore } from "../store/connectStore";
import { themeStore } from "../store/themeStore";
import {getSingleDoc} from './firestoreDocs'
import { storeToRefs } from 'pinia';

export const configUpdate = async () => {
    const store = mainStore()
    const {preferredConfigs, customTests} = storeToRefs(store)

    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const connect = connectStore()
    const {isConnectingServer} = storeToRefs(connect)

    const customize = customizeStore()
    const { customizers, disableOption, textLines, cursorType, difficulty, font, range, blind, backspace } = storeToRefs(customize)

    preferredConfigs.value = await getSingleDoc(localStorage.getItem('kiboardID'))

    isConnectingServer.value = false
    theme.value = preferredConfigs.value.theme || theme.value
    font.value = preferredConfigs.value.fontsize || font.value
    range.value = (font.value - 16) / 0.26
    cursorType.value = preferredConfigs.value.cursor || cursorType.value
    blind.value = preferredConfigs.value.blind || false
    difficulty.value = preferredConfigs.value.difficulty || difficulty.value
    backspace.value = preferredConfigs.value.backspace || backspace.value
    customizers.value = preferredConfigs.value.config[0] || customizers.value
    disableOption.value = preferredConfigs.value.config[1] || disableOption.value
    customTests.value = preferredConfigs.value.customTests || customTests.value['demo']
    textLines.value = preferredConfigs.value.textLines || 3
}