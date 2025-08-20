export const createUser = (user) => {
    const settingstore = settingsStore()
    const {settings, disableOption} = storeToRefs(settingstore)

    const userstore = userDataStore()
    const {userInfo, bestStats, userHistory} = storeToRefs(userstore)
    
    return {
        bestStats: bestStats.value,
        customTests: {'demo': 'This is a custom test, you can add your own tests by pressing the plus icon. This demo test cannot be deleted'},
        customWords: {'demo1': 'messi', 'demo2': 'cr7'},
        customQuotes: {'demo': 'This is a custom quote, you can add your own tests by pressing the plus icon. This demo test cannot be deleted'},
        disableOption: disableOption.value,
        settings: settings.value,
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches ?  'dark' : 'white',
        userHistory: userHistory.value,
        userInfo: {
            ...userInfo.value,
            username: 'user',
            uid: user?.uid || '',
            email: user?.email || '',
            joinedAt: new Date(+user?.reloadUserInfo?.createdAt).toString(),
            photoURL: user?.photoURL
        },
    }
}