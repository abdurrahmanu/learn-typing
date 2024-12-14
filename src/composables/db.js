import { storeToRefs } from 'pinia';
import {themeStore}  from '../store/themeStore'
import {customizeStore} from '../store/customizeStore'
import { mainStore } from '../store/mainStore';
import { connectStore } from '../store/connectStore';
import { doc, getDoc } from 'firebase/firestore'
import {db} from '../firebase'
import {ref} from 'vue'

export const DB = async (update) => {
    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const connect = connectStore()
    const {hasInternetConnection, connectingServer, connectionStrength, showConnectionStrength} = storeToRefs(connect)

    const main = mainStore()
    const {customTests} = storeToRefs(main)

    const customize = customizeStore()
    const { customizers, cookies_, doubleEachWord, disableOption, cursorType, difficulty, mode, hideElements, font, range, blind, backspace, capslock } = storeToRefs(customize)

    if (!update) {
        if (navigator.onLine) connectingServer.value = true
        else {
            connectingServer.value = false
            hasInternetConnection.value = false
            return
        }
    }

    const getSingleDoc = async (ID) => {
        let user = doc(db, "user", ID )
        return await getDoc(user).then((data) => data.exists() ? data.data() : false )
    }

    if (localStorage.getItem('kiboard')) localStorage.clear()
    if (localStorage.getItem('kicookies')) {
        connectingServer.value = false
        return
    }

    if (localStorage.getItem('kiboardID')) {
        let userData = ref(undefined)
        let timedOut = ref(false)

        setTimeout(() => {
            if (!userData.value) {
                timedOut.value = true
                connectingServer.value = false
                showConnectionStrength.value = true
                connectionStrength.value = 'connecting server...'
            }
        }, 5000);

        cookies_.value = true
        userData.value = await getSingleDoc(localStorage.getItem('kiboardID'))

        if (update) {
            showConnectionStrength.value = true
            connectionStrength.value = 'connecting server...'
        } 

        if (!userData.value) {
            connectingServer.value = false
            showConnectionStrength.value = true
            connectionStrength.value = 'your connection is not strong'
            return
        }

        if (update) {
            showConnectionStrength.value = true
            connectionStrength.value = 'connection is back'
        } 

        if (timedOut.value) connectionStrength.value = 'connection is back'
        connectingServer.value = false
        doubleEachWord.value = userData.value.doubleEachWord
        theme.value = userData.value.theme
        font.value = userData.value.fontsize 
        range.value = (font.value - 16) / 0.26
        hideElements.value = userData.value.hide
        cursorType.value = userData.value.cursor
        blind.value = userData.value.blind
        difficulty.value = userData.value.difficulty
        backspace.value = userData.value.backspace
        customizers.value = userData.value.config[0]
        disableOption.value = userData.value.config[1] 
        mode.value = userData.value.mode
        capslock.value = userData.value.capslock
        customTests.value = userData.value.customTests
    } else connectingServer.value = false
}
