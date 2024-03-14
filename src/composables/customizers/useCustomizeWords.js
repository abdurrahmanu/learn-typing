import {ref} from 'vue'
import data from '../../../data/quotes.json'


export function useCustomizeWords([...args]) {
    console.log(args);
    const customizeWordsRes = ref('')

    return {customizeWordsRes}
}