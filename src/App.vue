<template>
<<<<<<< HEAD
  <div class="bg-black">
    <HomeView />
  </div>
</template>

<script setup>
import HomeView from './views/HomeView.vue';
</script>
=======
  <div id="cont">
    <nav>
      <div>TYPING-TEST</div>
      <div class="time">{{minutes}}:{{typing_time}}</div>
    </nav>
    <div class="under_nav"></div>
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




























>>>>>>> f2a73222ffbcd017d0b21efc02a8322f78812a22
