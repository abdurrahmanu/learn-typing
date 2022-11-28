<script setup>
import { ref, onBeforeMount} from 'vue';
import data from '../data/quotes.json'

const placeholder = ref('This exercise makes you learn how to type well! Yes, you read right.')
const span_text = ref('')
const text = ref('')
const container_el = ref(null)
const input_el = ref(null)
const user_input = ref('')
const container_text = ref('')
const error_count = ref(0)
const correct_count = ref(0)
const show_result = ref(false)
const typing_time = ref(0)
const interval_id = ref()
const minutes = ref(0)

const before_mount = onBeforeMount(() => {
  text.value = placeholder.value
})

window.onkeyup = (e) => {
  input_el.value.focus();

  if (container_el.value.innerText === placeholder.value) {
    input_el.value.setAttribute('placeholder', 'start when you are ready')
    get_text()
  }

  if (e.key === 'Escape') {
    reset()
    get_text()
  }

}

const get_text = () => {
  const all_quotes = ref(data)
  const quotes = ref('')
  const random_quote_index = ref(0)
  let no_of_quotes =  ref(3)

  for (let i = 0; i < no_of_quotes.value; i++) {
    random_quote_index.value = Math.floor(Math.random() * all_quotes.value.length)
    if (i < 1) quotes.value = all_quotes.value[random_quote_index.value].quote
    else quotes.value +=  ' ' + all_quotes.value[random_quote_index.value].quote
  }

  for (let i = 0; i < quotes.value.length; i++) {
      span_text.value += `<span>${quotes.value[i]}</span>`
  }

    container_el.value.innerHTML = span_text.value
    container_text.value = container_el.value.innerText
}

const reset = () => {
  span_text.value = ''
  user_input.value = ''
  show_result.value = false
  typing_time.value = 0
  error_count.value = 0
  correct_count.value = 0
}

const typing = (e) => {

  if (container_el.value.innerText === placeholder.value) {
    user_input.value = ''
  } else {
    if (user_input.value.length === 1) {
      interval_id.value = setInterval(() => {
        typing_time.value++
        if (typing_time.value == 60) {
          typing_time.value = 1
          minutes.value++
        }
      }, 1000);
    }
    input_el.value.setAttribute('maxlength', container_text.value.length)

  if (user_input.value[user_input.value.length - 1] ===
    container_text.value[user_input.value.length - 1]) {
      container_el.value.children[user_input.value.length - 1].style.color = '#24e024'
      correct_count.value++
    } else {
      container_el.value.children[user_input.value.length - 1].style.color = '#e82b2f';
      error_count.value++
  }

  if (container_el.value.children[user_input.value.length - 1].innerText === ' ') {
      if (user_input.value[user_input.value.length - 1] ===
        container_text.value[user_input.value.length - 1]) {
        container_el.value.children[user_input.value.length - 1].style.background = '#95e895'
        container_el.value.children[user_input.value.length - 1].style.opacity = '0.3'
        }
      else {
        container_el.value.children[user_input.value.length - 1].style.background = '#f47a7a';
        container_el.value.children[user_input.value.length - 1].style.opacity = '0.3'
      }
  }

  if (user_input.value.length === container_text.value.length) {
    clearInterval(interval_id.value)
    setTimeout(() => show_result.value = true, 300);
  }
}
}

const restart = () => {
  if (user_input.value.length === container_text.value.length) {
    reset()
    get_text()
  }
}
</script>

<template>
  <div id="cont">
    <nav>
      <div>TYPING-TEST</div>
      <div class="time">{{minutes}}:{{typing_time}}</div>
    </nav>
    <main >
        <div ref="container_el" id="textbox">{{text}}</div>
        <input
        @keydown.delete.prevent
        @input="typing" 
        @keyup.enter.prevent="restart"
        v-model="user_input" 
        ref="input_el" type="text" 
        spellcheck="false" 
        placeholder="Press any key to start typing">

        <div class="result" v-if="show_result">
          <div>
            <div>
              <div :class=" {red: (correct_count/user_input.length) * 100 < 90,
              green: !((correct_count/user_input.length) * 100 < 90)}"></div>
               Accuracy: {{(correct_count/ user_input.length).toFixed(2) * 100}}%
            </div>
            <div>
              <div :class="{green: error_count < (user_input.length/4),
              red: !(error_count < (user_input.length/4))}"></div>
              Error ratio: {{error_count}} / {{error_count + correct_count}}
            </div>
          </div>
          <div>
            <div>Time: {{typing_time}} seconds</div>
              <div>Character per second: {{Math.ceil(correct_count / typing_time)}}</div>
          </div>
        </div>
      </main>

  </div>
</template>














