import { storeToRefs } from 'pinia';
import {themeStore}  from '../store/themeStore'
import {customizeStore} from '../store/customizeStore'
import {alphabetsStore}  from '../store/alphabetsModeStore';
import { mainStore } from '../store/mainStore';
import { cookiesStore } from '../store/cookiesStore';
import { doc, getDoc } from 'firebase/firestore'
import {db} from '../firebase'

export const DB = async () => {
    const alphabets_ = alphabetsStore()
    const { alphabetsMode_, alphabetsCombination, useAlphabetCombination } = storeToRefs(alphabets_)

    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const main = mainStore()
    const {customTests} = storeToRefs(main)

    const cookies = cookiesStore()
    const {showCookiesModal} = storeToRefs(cookies)

    const customize = customizeStore()
    const { customizers, cookies_, doubleEachWord, disableOption, cursorType, difficulty, mode, hideElements, font, range, blind, backspace, capslock } = storeToRefs(customize)

    const getSingleDoc = async (ID) => {
        let user = doc(db, "user", ID )
        return await getDoc(user).then((data) => data.exists() ? data.data() : false)
    }

    if (localStorage.getItem('kiboardID')) {
        cookies_.value = true

        if (navigator.onLine) {
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
            if (mode.value === 'alphabets') alphabetsMode_.value = true
            else alphabetsMode_.value = false

            if (userData.alphabetsCombo) {
                useAlphabetCombination.value = true
                alphabetsCombination.value = userData.alphabetsCombination || []
            }    
        }
    } 

    else if (!localStorage.getItem('kiboard') && navigator.onLine) showCookiesModal.value = true
}