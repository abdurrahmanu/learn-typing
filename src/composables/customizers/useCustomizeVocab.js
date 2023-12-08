import { ref } from 'vue'
import { englishWords } from '../../../data/englishWords'


export function useCustomizeVocab(arg, textLength) {
    const res = ref('');
    const numberOfWords = ref(textLength || 20)
    const { mostUsed, mediumUsed, rarelyUsed } = englishWords();

    arg === 'seldom-used' ? generateText(mediumUsed)
        : arg === 'most-used' ? generateText(mostUsed) :
            arg === 'rarely-used' ? generateText(rarelyUsed) : ''

    function generateText(vocabType) {
        for (let i = 0; i < numberOfWords.value; i++) {
            let random = Math.floor(Math.random() * vocabType.length);

            if (!res.value.length) {
                res.value += vocabType[random];
            } else {
                res.value += ' ' + vocabType[random];
            }
        }
    }
    
    return { res }
}