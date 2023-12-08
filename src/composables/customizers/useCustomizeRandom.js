import { ref } from 'vue'

export function useCustomizeRandom(arg) {
    const res = ref('')
    
    return { res }
}