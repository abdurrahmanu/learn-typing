import {ref} from 'vue'
import { storeToRefs } from 'pinia';
import {themeStore}  from '../store/themeStore'
import {customizeStore} from '../store/customizeStore'
import {alphabetsStore}  from '../store/alphabetsModeStore';
import { mainStore } from '../store/mainStore';

export const localStorageConfig = async () => {
    const alphabets_ = alphabetsStore()
    const { alphabetsMode_, alphabetsCombination, useAlphabetCombination } = storeToRefs(alphabets_)

    const theme_ = themeStore()
    const {theme } = storeToRefs(theme_)

    const main = mainStore()
    const {customTests} = storeToRefs(main)

    const customize = customizeStore()
    const { customizers, doubleEachWord, disableOption, cursorType, difficulty, mode, hideElements, font, range, blind, backspace, capslock } = storeToRefs(customize)

    if (localStorage.getItem('kiboard')) {
        const localStorageSettings = ref(JSON.parse(localStorage.getItem('kiboard')))

        let dorayiTypingObject = {
            doubleEachWord: typeof(localStorageSettings.value.doubleEachWord) === 'boolean' ? localStorageSettings.value.doubleEachWord : doubleEachWord.value,
            capslock: typeof(localStorageSettings.value.capslock) === 'boolean' ? localStorageSettings.value.capslock : capslock.value,
            difficulty: localStorageSettings.value.difficulty || difficulty.value,
            customTests: localStorageSettings.value.customTests ||  customTests.value,
            config:  [ localStorageSettings.value.config[0] || customizers.value, localStorageSettings.value.config[1] || disableOption.value],
            cursor: localStorageSettings.value.cursor || 'border',
            theme: localStorageSettings.value.theme || 'white',
            backspace: typeof(localStorageSettings.value.backspace) === 'boolean' ? localStorageSettings.value.backspace : true,
            blind: localStorageSettings.value.blind || false,
            mode: localStorageSettings.value.mode || 'auto',
            hide: localStorageSettings.value.hide || false,
            fontsize: localStorageSettings.value.fontsize || 32,
            alphabets: {
                combo: localStorageSettings.value.alphabets.combo || false,
                combination: localStorageSettings.value.alphabets.combination ||  [],
            }
        }

        localStorageSettings.value = dorayiTypingObject
        localStorage.setItem('kiboard', JSON.stringify(localStorageSettings.value))
        doubleEachWord.value = localStorageSettings.value.doubleEachWord
        theme.value = localStorageSettings.value.theme
        font.value = localStorageSettings.value.fontsize 
        range.value = (font.value - 16) / 0.26
        hideElements.value = localStorageSettings.value.hide
        cursorType.value = localStorageSettings.value.cursor
        blind.value = localStorageSettings.value.blind
        difficulty.value = localStorageSettings.value.difficulty
        backspace.value = localStorageSettings.value.backspace
        customizers.value = localStorageSettings.value.config[0]
        disableOption.value = localStorageSettings.value.config[1] 
        mode.value = localStorageSettings.value.mode
        capslock.value = localStorageSettings.value.capslock
        customTests.value = localStorageSettings.value.customTests
        if (mode.value === 'alphabets') alphabetsMode_.value = true
        else alphabetsMode_.value = false
        
        if (localStorageSettings.value.alphabets.combo) {
            useAlphabetCombination.value = true
            alphabetsCombination.value = localStorageSettings.value.alphabets.combination || []
        }
    }
    
    else {
        let dorayiTypingObject = {
            difficulty: 'beginner',
            doubleEachWord: false,
            capslock: true,
            customTests: {'demo': 'This is a custom test, you can add your own tests by pressing the plus icon. This demo test cannot be deleted'},
            config: [customizers.value, disableOption.value],
            cursor: 'border',
            theme: window.matchMedia("(prefers-color-scheme: dark)").matches ?  'dark' : 'white',
            backspace: true,
            blind: false,
            mode: 'auto',
            hide: false,
            fontsize: 32,
            alphabets: {
                combo: false,
                combination: [],
            }
        }
        localStorage.setItem('kiboard', JSON.stringify(dorayiTypingObject))
    }
}