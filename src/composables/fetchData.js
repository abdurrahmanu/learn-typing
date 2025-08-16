export const fetchData = (data) => {
    const store = mainStore()
    const { customTests, font} = storeToRefs(store)

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
    settings.value = data.config[0] || settings.value
    disableOption.value = data.config[1] || disableOption.value
    customTests.value = data.customTests || customTests.value['demo']
    userInfo.value = data.userInfo
    bestStats.value = data.bestStats
    userHistory.value = data.userHistory
}