import { customizeStore } from '../store/customizeStore'
import { storeToRefs } from 'pinia'
import { authStore } from '../store/authStore'
import {userDataStore} from '../store/userDataStore'

export const userData = () => {
    const customize = customizeStore()
    const {customizers, disableOption} = storeToRefs(customize)

    const authstore = authStore()
    const {user} = storeToRefs(authstore)

    const userstore = userDataStore()
    const {userInfo, bestStats, userHistory} = storeToRefs(userstore)
    const {populateUserData} = userstore

    populateUserData(user.value)
    
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
        userInfo: userInfo.value,
        bestStats: bestStats.value,
        userHistory: userHistory.value,
    }
}