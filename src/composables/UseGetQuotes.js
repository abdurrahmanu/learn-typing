import { ref } from 'vue'
import { quotes } from '../../data/quotes.js'
import { useCustomizeLength } from './customizers/useCustomizeLength';
import { useCustomizeWords } from './customizers/useCustomizeWords';
import { useCustomizeFormat } from './customizers/useCustomizeFormat';

export function  UseGetQuotes (config) {
    const res = ref('');
    const { data } = quotes()

    function generateText(numberOfQuotes) {
        if (numberOfQuotes === undefined || numberOfQuotes === null) numberOfQuotes = Math.floor(Math.random() * 4)
        while (numberOfQuotes === 0) numberOfQuotes = Math.floor(Math.random() * 4)
        
        for (let index = 0; index < numberOfQuotes; index++) {
            let random = Math.floor(Math.random() * data.length);
            index < 1 ? res.value = data[random] : res.value += ' ' + data[random];
        }
    }
    
    function customize () {
        let text = res.value
        res.value = useCustomizeLength(config[0]).res.value
        res.value = useCustomizeWords([config[1], config[4], config[5]]).res.value
        res.value = useCustomizeFormat([config[2], config[3]], text).res.value

        console.log(config);
    }

    generateText()
    if (config !== undefined) customize()

    return { res }
};
