import { ref } from 'vue'
import data from '../../../data/quotes.json'

export function useCustomizeLength(arg) {
    const res = ref('')
    const numberOfQuotes = ref(0)

    if (arg === 'auto') {
        numberOfQuotes.value = Math.round(Math.random()  * 4) + 1
    } 

    if (arg === '10+') {

    }

    if (arg === '20+') {
        
    }    
    
    if (arg === '40+') {
        
    }    

    for (let index = 0; index < numberOfQuotes.value; index++) {
        let random = Math.floor(Math.random() * data.length);
        index < 1 ? res.value = data[random].quote : res.value += ' ' + data[random].quote;
    }

    return { res }
}