import { storeToRefs } from 'pinia';
import {themeStore}  from '../store/themeStore'
import {customizeStore} from '../store/customizeStore'
import { mainStore } from '../store/mainStore';
import { cookiesStore } from '../store/cookiesStore';
import { connectStore } from '../store/connectStore';
import { doc, getDoc } from 'firebase/firestore'
import {db} from '../firebase'

export const DB = async () => {
    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const connect = connectStore()
    const {isOnline, connectingServer} = storeToRefs(connect)

    const main = mainStore()
    const {customTests} = storeToRefs(main)

    const cookies = cookiesStore()
    const {showCookiesModal} = storeToRefs(cookies)

    const customize = customizeStore()
    const { customizers, cookies_, doubleEachWord, disableOption, cursorType, difficulty, mode, hideElements, font, range, blind, backspace, capslock } = storeToRefs(customize)

    const getSingleDoc = async (ID) => {
        let user = doc(db, "user", ID )
        return await getDoc(user).then((data) => {
            data.exists() ? data.data() : false
            connectingServer.value = false
        }).catch(error => {
            connectingServer.value = false
        })
    }

    if (localStorage.getItem('kiboardID')) {
        cookies_.value = true

        if (navigator.onLine) {
            setTimeout(() => {
                if (connectingServer.value === true) {
                    connectingServer.value = false
                    isOnline.value = false
                }
            }, 4000);
            let userData = await getSingleDoc(localStorage.getItem('kiboardID'))
            if (!userData) return
            doubleEachWord.value = userData.doubleEachWord
            theme.value = userData.theme
            font.value = userData.fontsize 
            range.value = (font.value - 16) / 0.26
            hideElements.value = userData.hide
            cursorType.value = userData.cursor
            blind.value = userData.blind
            difficulty.value = userData.difficulty
            backspace.value = userData.backspace
            customizers.value = userData.config[0]
            disableOption.value = userData.config[1] 
            mode.value = userData.mode
            capslock.value = userData.capslock
            customTests.value = userData.customTests
        }
    }
    else if (!localStorage.getItem('kiboard') && navigator.onLine) showCookiesModal.value = true
}