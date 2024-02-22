import {ref} from 'vue'
import data from '../../../data/quotes.json'


export function useCustomizeWords([...args]) {
    const res = ref('')

    return {res}
}