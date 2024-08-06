import {ref} from 'vue'
import { storeToRefs } from 'pinia';
import {pagesStore}  from '../store/pagesStore'
import {themeStore}  from '../store/themeStore'
import {customizeStore} from '../store/customizeStore'
import {alphabetsStore}  from '../store/alphabetsModeStore';
import { mainStore } from '../store/mainStore';

export const localStorageConfig = async () => {
    const alphabets_ = alphabetsStore()
    const { alphabetsMode_, alphabetsCombination, useAlphabetCombination } = storeToRefs(alphabets_)

    const theme_ = themeStore()
    const {theme, testBackgroundColor } = storeToRefs(theme_)

    const main = mainStore()
    const {customTests} = storeToRefs(main)

    const customize = customizeStore()
    const { customizers, disableOption, caretType, mode, hideElements, font, range, blind, backspace } = storeToRefs(customize)

    const pages = pagesStore()
    const {currentPage } = storeToRefs(pages)

    if (localStorage.getItem('dorayi-typing')) {
        const localStorageSettings = ref(JSON.parse(localStorage.getItem('dorayi-typing')))

        let dorayiTyping = {
            customTests: localStorageSettings.value.customTests ||  {'demo': 'This is a custom test, you can add your own tests by pressing the plus icon. This demo test cannot be deleted'},
            config:  [ localStorageSettings.value.config[0] || customizers.value, localStorageSettings.value.config[1] || disableOption.value],
            caret: localStorageSettings.value.caret || 'border',
            theme: localStorageSettings.value.theme || 'dark',
            backspace: localStorageSettings.value.backspace || true,
            blind: localStorageSettings.value.blind || false,
            mode: localStorageSettings.value.mode || 'auto',
            hide: localStorageSettings.value.hide || false,
            fontsize: localStorageSettings.value.fontsize || 32,
            testBackground: localStorageSettings.value.testBackground || 'transparent',
            alphabets: {
                combo: localStorageSettings.value.alphabets.combo || false,
                combination: localStorageSettings.value.alphabets.combination ||  [],
                mode: localStorageSettings.value.alphabets.mode || ''
            }
        }

        localStorageSettings.value = dorayiTyping
        localStorage.setItem('dorayi-typing', JSON.stringify(localStorageSettings.value))

        testBackgroundColor.value = localStorageSettings.value.testBackground
        theme.value = localStorageSettings.value.theme
        font.value = localStorageSettings.value.fontsize 
        range.value = (font.value - 16) / 0.26
        hideElements.value = localStorageSettings.value.hide
        caretType.value = localStorageSettings.value.caret
        blind.value = localStorageSettings.value.blind
        backspace.value = localStorageSettings.value.backspace
        customizers.value = localStorageSettings.value.config[0]
        disableOption.value = localStorageSettings.value.config[1] 
        mode.value = localStorageSettings.value.mode
        customTests.value = localStorageSettings.value.customTests
        if (mode.value === 'alphabets') {
            alphabetsMode_.value = true
            currentPage.value = 1
        }
        else {
                alphabetsMode_.value = false
                currentPage.value = 0
        }
        if (localStorageSettings.value.alphabets.combo) {
            useAlphabetCombination.value = true
            alphabetsCombination.value = localStorageSettings.value.alphabets.combination || []
        }
    } 

    else {
        let dorayiTyping = {
            customTests: {'demo': 'This is a custom test, you can add your own tests by pressing the plus icon. This demo test cannot be deleted'},
            config: [customizers.value, disableOption.value],
            caret: 'border',
            theme: window.matchMedia("(prefers-color-scheme: dark)").matches ?  'dark' : 'white',
            backspace: true,
            blind: false,
            mode: 'auto',
            hide: false,
            fontsize: 32,
            testBackground: 'transparent',
            alphabets: {
                combo: false,
                combination: [],
                mode: ''
            }
        }

        localStorage.setItem('dorayi-typing', JSON.stringify(dorayiTyping))
    }
}