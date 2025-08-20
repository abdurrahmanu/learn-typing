export const getUser = () => {
    const authstore = authStore()
    const {data} = storeToRefs(authstore)

    const mainstore = mainStore()
    const { customTests, customQuotes, customWords} = storeToRefs(mainstore)

    const userstore = userDataStore()
    const {userInfo, bestStats, userHistory} = storeToRefs(userstore)

    const themestore = themeStore()
    const {theme } = storeToRefs(themestore)

    const connect = connectStore()
    const {loadingApp} = storeToRefs(connect)

    const settingstore = settingsStore()
    const { settings, disableOption } = storeToRefs(settingstore)

    bestStats.value = { ...bestStats.value, ...data.value?.bestStats }
    customTests.value = { ...customTests.value, ...data.value?.customTests }
    customWords.value = { ...customWords.value, ...data.value?.customWords }
    customQuotes.value = { ...customQuotes.value, ...data.value?.customQuotes }
    disableOption.value = { ...disableOption.value, ...data.value?.disableOption }
    settings.value = { ...settings.value, ...data.value?.settings }
    theme.value = data.value?.theme || theme.value
    userHistory.value = { ...userHistory.value, ...data.value?.userHistory }
    userInfo.value = { ...userInfo.value, ...data.value?.userInfo }

    loadingApp.value = false
}