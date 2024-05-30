import {ref, computed} from 'vue'
import {alphabetsStore}  from '../store/alphabetsModeStore';
import {dictionaryStore}  from '../store/dictionaryModeStore';
import { storeToRefs } from 'pinia';

export function test() {
    const res  =  ref('')
    const alphabets_ = alphabetsStore()
    const { alphabetsMode_ } = storeToRefs(alphabets_)
    const {generateAlphabetsTest} = alphabets_
    
    const dictionary = dictionaryStore()
    const { dictionaryMode_ } = storeToRefs(dictionary)
    const {generateDictionaryTest}  = dictionary

    if (dictionaryMode_.value) res.value = generateDictionaryTest()
    else if (alphabetsMode_.value) res.value = generateAlphabetsTest()

    return {
        res
    }
}