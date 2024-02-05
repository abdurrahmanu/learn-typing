import {defineStore} from 'pinia'
import {ref, computed} from 'vue'

export const typingStore = defineStore('typingStore', () => {
    const tooltip = ['random', 'length', 'word', 'format', 'format', 'word', 'word']
    const options = [
        ['custom', 'centralize'],
        ['auto', 'short', 'long', '10', '20', '30', '45'],
        ['most-used', 'seldom-used', 'rarely-used'],
        ['caps'],
        ['punctuations'],
        ['numbers'],
        ['quotes', 'random']
    ]
    
    const openModal = ref(false)
    const hoverIndex = ref(null)
    const selections = ref([])
    const emit = defineEmits(['selectedOptionsArray', 'emitTextAlign', 'newConfig']) 
    
    const mouseEnter = (index) => hoverIndex.value = index
    const mouseLeave = (index) => hoverIndex.value = null
    
    const selectedOption = (selectedOpt) => {
        emit('newConfig')
        if (selectedOpt === 'centralize') {
            emit('emitTextAlign');
        }
    
        if (selections.value.indexOf(selectedOpt) !== -1) {
            selections.value = selections.value.filter(option => option !== selectedOpt);
        } else {
            for (let i = 0; i < options.length; i++) {
                if (options[i].find(each => each.includes(selectedOpt))) {
                    selections.value[i] = selectedOpt
                }
            } 
        }
    
        emit('selectedOptionsArray', selections.value)
    
    }
    
    return {
        tooltip,
        options,
        openModal,
        hoverIndex,
        selections,
        mouseEnter,
        mouseLeave,
        selectedOption,
    }
})