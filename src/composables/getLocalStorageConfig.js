import {ref} from 'vue'
import { mainStore } from "../store/mainStore"
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';
import {pagesStore}  from '../store/pagesStore'
import {themeStore}  from '../store/themeStore'
import {fontStore} from '../store/fontStore'
import {alphabetsStore}  from '../store/alphabetsModeStore';

export const localStorageConfig = async () => {
    const alphabets_ = alphabetsStore()
    const { alphabetsMode_, alphabetsCombination, useAlphabetCombination } = storeToRefs(alphabets_)

    const font_ = fontStore()
    const {font, range} = storeToRefs(font_)

    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const main = mainStore()
    const { enableBackSpace, mode} = storeToRefs(main)

    const customize = customizeStore()
    const { customizers, disableOption, caretType, hideElements, isBlindMode } = storeToRefs(customize)

    const pages = pagesStore()
    const {currentPage } = storeToRefs(pages)

    if (localStorage.getItem('dorayi-typing')) {
        const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))
        
        if (localStorageSettings.value.theme) {
            theme.value = localStorageSettings.value.theme
        } else {
            theme.value  = 'white'
            localStorageSettings.value.theme = theme.value
        }
    
        if (localStorageSettings.value.fontsize) {
            font.value = localStorageSettings.value.fontsize 
            range.value = (font.value - 16) / 0.16
        }

        if (localStorageSettings.value.caret) {
            caretType.value = localStorageSettings.value.caret
        }

        if (localStorageSettings.value.mode) {
            mode.value = localStorageSettings.value.mode
            if (mode.value === 'alphabets') {
                alphabetsMode_.value = true
                currentPage.value = 1
            }
            else {
                alphabetsMode_.value = false
                currentPage.value = 0
            }
        }

        if (localStorageSettings.value.alphabets.combo) {
            useAlphabetCombination.value = true
            alphabetsCombination.value = localStorageSettings.value.alphabets.combination || []
        }

        if (localStorageSettings.value.hide) {
            hideElements.value = true
        }

        isBlindMode.value = localStorageSettings.value.config[0]['blind-mode']
        
        if (localStorageSettings.value.config && localStorageSettings.value.config.length) {
            customizers.value = localStorageSettings.value.config[0]
            disableOption.value = localStorageSettings.value.config[1] 
        } else {
            localStorageSettings.value.config = [customizers.value, disableOption.value]
            enableBackSpace.value = customizers.value['backspace']
        }
    } 
    
    else {
        let dorayiTyping = {
            config: [customizers.value, disableOption.value],
            caret: 'border',
            theme: 'dark',
            mode: mode.value,
            hide: false,
            fontsize: font.value,
            alphabets: {
                combo: false,
                combination: [],
                mode: ''
            }
        }
        localStorage.setItem('dorayi-typing', JSON.stringify(dorayiTyping))
    }
}