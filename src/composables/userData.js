import { customizeStore } from '../store/customizeStore'
import { storeToRefs } from 'pinia'
import { authStore } from '../store/authStore'

export const userData = () => {
    const customize = customizeStore()
    const {customizers, disableOption} = storeToRefs(customize)

    const authstore = authStore()
    const {user} = storeToRefs(authstore)
    
    return {
        difficulty: 'beginner',
        customTests: {'demo': 'This is a custom test, you can add your own tests by pressing the plus icon. This demo test cannot be deleted'},
        config: [customizers.value, disableOption.value],
        cursor: 'cursor',
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches ?  'dark' : 'white',
        backspace: true,
        blind: false,
        fontsize: 32,
        textLines: 3,
        user: {
            username: 'user',
            uid: user.value?.uid || '',
            email: user.value?.email || '',
            ranking: '-',
            testsStarted: 0,
            testsFinished: 0,
            minutesTyped: 0,
            joinedAt: new Date(+user.value?.reloadUserInfo?.createdAt).toString(),
            photoURL: user.value?.photoURL,
        },
        bestStats: {
            bestWPM: 0,
            highestAccuracy: 0,
            rawSpeed: 0,
            consistency: 0,
            streakDays: 0,
            longestTime: 0,
            highestRank: '-',
        },
        userHistory: {
            tests: []
        }
    }
}