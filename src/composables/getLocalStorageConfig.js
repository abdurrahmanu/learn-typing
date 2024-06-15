import { mainStore } from "../store/mainStore"
import { storeToRefs } from 'pinia';
import { customizeStore } from '../store/customizeStore';
import {pagesStore}  from '../store/pagesStore'
import {themeStore}  from '../store/themeStore'
import {alphabetsStore}  from '../store/alphabetsModeStore';

export const localStorageConfig = async (config, restart) => {
    const alphabets_ = alphabetsStore()
    const { alphabetsMode_, alphabetsConfig, alphabetsCombination, useAlphabetCombination } = storeToRefs(alphabets_)

    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const main = mainStore()
    const { enableBackSpace, customTexts, mode} = storeToRefs(main)

    const customize = customizeStore()
    const { customizers, disableOption, caretType } = storeToRefs(customize)

    const pages = pagesStore()
    const {currentPage } = storeToRefs(pages)

        if (!localStorage.getItem('dorayi-typing-theme')) {
        if (localStorage.getItem('theme')) {
            theme.value = 'neutral'
            localStorage.setItem('dorayi-typing-theme', 'dark')
        } else {
            theme.value = 'white'
            localStorage.setItem('dorayi-typing-theme', 'white')
        }
        } else {
        if (localStorage.getItem('dorayi-typing-theme') === 'dark') {
            theme.value = 'neutral'
            localStorage.setItem('dorayi-typing-theme', 'dark')
        } else {
            theme.value = 'white'
            localStorage.setItem('dorayi-typing-theme', 'white')
        }
        }
    
        if (localStorage.getItem('custom-text') ) {
        customTexts.value = JSON.parse(localStorage.getItem('custom-text'))
        }

        if (localStorage.getItem('dorayi-typing-preferred-caret')) {
            caretType.value = localStorage.getItem('dorayi-typing-preferred-caret')
        }
    
        if (localStorage.getItem('dorayi-typing-mode')) {
        if (localStorage.getItem('dorayi-typing-mode') === 'alphabets') {
            mode.value = 'alphabets'
            alphabetsMode_.value = true
            currentPage.value = 1
            if (localStorage.getItem('dorayi-typing-use-alphabets-combination') === 'true') {
            useAlphabetCombination.value = true
            if (localStorage.getItem('dorayi-typing-alphabet-combination')) {
                alphabetsCombination.value = JSON.parse(localStorage.getItem('dorayi-typing-alphabet-combination'))
            }
            }
        } 
    
        else {
            alphabetsMode_.value = false
            currentPage.value = 0
            mode.value = 'auto'
        }
    }
    
        if (localStorage.getItem('alphabets-mode')) alphabetsConfig.value = JSON.parse(localStorage.getItem('alphabets-mode'))
    
        if (localStorage.getItem('dorayi-typing-preferred-config')) {
        let saved = JSON.parse(localStorage.getItem('dorayi-typing-preferred-config'))
        customizers.value = saved[0]
        disableOption.value = saved[1]
        } 
        else localStorage.setItem('dorayi-typing-preferred-config', JSON.stringify([customizers.value, disableOption.value]))
        enableBackSpace.value = customizers.value['backspace']
}