import { ref } from 'vue'
import { quotes } from '../../data/quotes.js'
import { useCustomizeRandom } from './customizers/useCustomizeRandom';
import { useCustomizeLength } from './customizers/useCustomizeLength';
import { useCustomizeVocab } from './customizers/useCustomizeVocab';
import { useCustomizeWords } from './customizers/useCustomizeWords';
import { useCustomizeFormat } from './customizers/useCustomizeFormat';
import { useDefaultFormat } from './customizers/useDefaultFormat';

export function  UseGetQuotes (customizeProps) {
    const res = ref('');
    const { data } = quotes()
    const customizeRandom = ref('')
    const customizeLength = ref('')
    const customizeVocab = ref('')
    const customizeWords = ref('')
    const customizeFormat = ref([])

    const optionsSeperation = ref({
        'random': ['custom'],
        'length': ['short', 'long', '10', '20', '30', '45', 'custom'],
        'vocab': ['most-used', 'seldom-used', 'rarely-used'],
        'format': ['caps', 'punctuations', 'numbers'],
        'word': ['quotes', 'random']
    })

    function generateText(numberOfQuotes) {
        if (numberOfQuotes === undefined || numberOfQuotes === null) numberOfQuotes = Math.floor(Math.random() * 4)
        while (numberOfQuotes === 0) numberOfQuotes = Math.floor(Math.random() * 4)
        
        for (let index = 0; index < numberOfQuotes; index++) {
            let random = Math.floor(Math.random() * data.length);
            index < 1 ? res.value = data[random] : res.value += ' ' + data[random];
        }

        return res.value
    }

    function loopThroughAllCustomizeableProps() {
        for (let i = 0; i < customizeProps.length; i++) {
            if (optionsSeperation.value['random'].indexOf(customizeProps[i]) > -1) {
                customizeRandom.value = customizeProps[i]
            }

            if (optionsSeperation.value['length'].indexOf(customizeProps[i]) > -1) {
                customizeLength.value = customizeProps[i]
            }

            if (optionsSeperation.value['vocab'].indexOf(customizeProps[i]) > -1) {
                customizeVocab.value = customizeProps[i]
            }

            if (optionsSeperation.value['format'].indexOf(customizeProps[i]) > -1) {
                customizeFormat.value.push(customizeProps[i])
            }

            if (optionsSeperation.value['word'].indexOf(customizeProps[i]) > -1) {
                customizeWords.value = customizeProps[i]
            }
        }
    }

    function callCustomizeFunctions() {
        if (customizeLength.value) {
            res.value = useCustomizeLength(customizeLength.value).res.value
        } else {
            res.value = generateText()
        }
        
        if (customizeFormat.value) {
            res.value = useCustomizeFormat(customizeFormat.value, res.value).res.value
        }
    
        if (customizeVocab.value) {
            res.value = useCustomizeVocab(customizeVocab.value).res.value
        }
    
        if (customizeWords.value) {
            useCustomizeWords(customizeWords.value)
            if (customizeWords.value === 'random') {

            } else {
                
            }
        }
    
        if (customizeRandom.value) {
            useCustomizeRandom(customizeRandom.value)
        }
    }

    if (customizeProps) {
        loopThroughAllCustomizeableProps()
        callCustomizeFunctions()
    } else {
        res.value = useDefaultFormat(generateText())
    }

    return { res }
};
