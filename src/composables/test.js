import {ref, computed} from 'vue'
import {alphabetsStore}  from '../store/alphabetsModeStore';
import { storeToRefs } from 'pinia';

export function test() {
    const res  =  ref('')
    const alphabets_ = alphabetsStore()
    const { alphabetsMode_ } = storeToRefs(alphabets_)
    const {generateAlphabetsTest} = alphabets_

    if (alphabetsMode_.value) res.value = generateAlphabetsTest()

    return {
        res
    }
}