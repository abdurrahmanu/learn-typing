import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useDarkMode = defineStore('darkmode', () => {
    const darkMode = ref(false)
    
    function checkLocalStorageForSavedBackground() {
        if (localStorage.getItem('typingBgMode')) {
            if (localStorage.getItem('typingBgMode').length) {
                if (localStorage.getItem('typingBgMode') == 'true') {
                    darkMode.value = true
                } else if (localStorage.getItem('typingBgMode' == 'false')) {
                    darkMode.value = false
                } 
            }
        } else {
            localStorage.setItem('typingBgMode', darkMode.value)
        }
    }

    const toggleDarkMode = computed(() => darkMode.value ? 'dark' : '');

    return {
        darkMode,
        toggleDarkMode,
        checkLocalStorageForSavedBackground,
    }
})


