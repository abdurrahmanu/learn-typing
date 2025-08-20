export const userDataStore = defineStore('userDataStore', () => {
    const userInfo = ref({
        username: '',
        uid: '',
        email: '',
        ranking: '-',
        testsStarted: 0,
        testsFinished: 0,
        secondsTyped: 0,
        joinedAt: '',
        photoURL: '',
    })

    const bestStats =  ref({
        bestWPM: 0,
        highestAccuracy: 0,
        rawSpeed: 0,
        consistency: 0,
        streakDays: 0,
        longestTime: 0,
        highestRank: '-',
    })

    const userHistory = ref({
        tests: []
    })

    return {
        userInfo,
        bestStats,
        userHistory,
    }
})