import { ref } from 'vue'

export async function fetchWord(word) {
    const data = ref({
        wordData: '',
        message: '',
        error: ''
    })

    let url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + word
        try {
            const res = await fetch(url);
            const definitions = await res.json();
            if (res.status === 200) {
                data.value.wordData = definitions[0].meanings.map(word => word)
            }
            else {
                data.value.message = 'not found'
            }
        } catch (error) {
            data.value.error = error.message
        }
    
    return { data }
}



