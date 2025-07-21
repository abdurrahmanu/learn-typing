import {defineStore} from 'pinia'
import {ref} from 'vue'

export const userDataStore = defineStore('userDataStore', () => {
    const userInfo = ref('is this suppose to reload?')
    const bestStats = ref({})
    const userHistory =  ref({})

    const populateUserData = (user) => {
        userInfo.value = {
            username: 'user',
            uid: user?.uid || '',
            email: user?.email || '',
            ranking: '-',
            testsStarted: 0,
            testsFinished: 0,
            secondsTyped: 0,
            joinedAt: new Date(+user?.reloadUserInfo?.createdAt).toString(),
            photoURL: user?.photoURL,
        },
        bestStats.value =  {
            bestWPM: 0,
            highestAccuracy: 0,
            rawSpeed: 0,
            consistency: 0,
            streakDays: 0,
            longestTime: 0,
            highestRank: '-',
        },
        userHistory.value = {
            tests: []
        }
    }
    
    return {
        userInfo,
        bestStats,
        userHistory,
        populateUserData,
    }
})