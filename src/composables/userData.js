import { settingsStore } from '../store/settingsStore'
import { storeToRefs } from 'pinia'
import { authStore } from '../store/authStore'
import {userDataStore} from '../store/userDataStore'

export const userData = () => {
    const customize = settingsStore()
    const {settings, disableOption} = storeToRefs(customize)

    const authstore = authStore()
    const {user} = storeToRefs(authstore)

    const userstore = userDataStore()
    const {userInfo, bestStats, userHistory} = storeToRefs(userstore)
    const {populateUserData} = userstore

    populateUserData(user.value)
    
    return {
        difficulty: 'beginner',
        customTests: {'demo': 'This is a custom test, you can add your own tests by pressing the plus icon. This demo test cannot be deleted'},
        config: [settings.value, disableOption.value],
        cursor: 'cursor',
        theme: window.matchMedia("(prefers-color-scheme: dark)").matches ?  'dark' : 'white',
        fontsize: 50,
        userInfo: userInfo.value,
        bestStats: bestStats.value,
        userHistory: userHistory.value,
    }
}