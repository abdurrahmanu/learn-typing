import { ref } from 'vue'

export function useRestartTyping() {
    const correctCount = ref(0);
    const wrongCount = ref(0);
    const typedAlphabet = ref('');
    const typedAlphabetIndex = ref(0);
    const textLength = ref(0);
    const completedTyping = ref(false);
    const startTiming = ref(false);
    const restartTyping = ref(false);
    const focusInput = ref(false);

    const restart = (event) => {
        if (!props.containerText.length) return;
        focusInput.value = true;
        restartTyping.value = true;
        correctCount.value = 0;
        wrongCount.value = 0;
        typedAlphabet.value = '';
        typedAlphabetIndex.value = '';
        textLength.value = '';
        completedTyping.value = '';
        startTiming.value = false;
        setTimeout(() => {
            restartTyping.value = false;
        }, 0);
        if (event === 'skip') {
            emit('generate');
        }
    };

    return true
}