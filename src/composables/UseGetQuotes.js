import { ref } from 'vue'
import { quotes } from '../../data/quotes.js'
import { useCustomizeLength } from './customizers/useCustomizeLength';
import { useCustomizeWords } from './customizers/useCustomizeWords';
import { useCustomizeFormat } from './customizers/useCustomizeFormat';

export function  UseGetQuotes (config) {
    const res = ref('');
    const { data } = quotes()

    function generateText(length) {
        let numberOfQuotes = Math.floor(Math.random() * 3) + 1
        
        for (let index = 0; index < numberOfQuotes; index++) {
            let random = Math.floor(Math.random() * data.length);
            index < 1 ? res.value = data[random] : res.value += ' ' + data[random];
        }
    }

    function customize () {
        let text = res.value
        res.value = useCustomizeWords([config[1], config[4], config[5]]).res.value
        res.value = useCustomizeFormat([config[2], config[3]], text).res.value
    }

    if (!config) generateText()

    if (config !== undefined) {
        if (config[0] !== 'auto') generateText(+config[0].slice(0, -1))
        else  generateText()
        customize()
    }

    return { res }
};
