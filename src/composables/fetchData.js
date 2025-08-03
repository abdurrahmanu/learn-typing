import { mainStore } from "../store/mainStore"
import { settingsStore } from "../store/settingsStore";
import { connectStore } from "../store/connectStore";
import { themeStore } from "../store/themeStore";
import { storeToRefs } from 'pinia';
import {userDataStore}  from '../store/userDataStore'

export const fetchData = (data) => {
    const store = mainStore()
    const { customTests, font, range} = storeToRefs(store)

    const userstore = userDataStore()
    const {userInfo, bestStats, userHistory} = storeToRefs(userstore)

    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const connect = connectStore()
    const {loadingApp} = storeToRefs(connect)

    const customize = settingsStore()
    const { settings, disableOption } = storeToRefs(customize)

    loadingApp.value = false
    
    theme.value = data.theme || theme.value
    range.value = (font.value - 16) / 0.26
    settings.value = data.config[0] || settings.value
    disableOption.value = data.config[1] || disableOption.value
    customTests.value = data.customTests || customTests.value['demo']
    userInfo.value = data.userInfo
    bestStats.value = data.bestStats
    userHistory.value = data.userHistory
}