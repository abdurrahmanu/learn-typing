<template>
    <div class="relative flex gap-2 py-5 m-auto w-fit h-fit">
        <div id="eyeright" class="relative transition-all duration-500 moon">
            <span ref="rightEyeBall" class="eyeball">
                <span class="eyelid"></span>
            </span>
        </div>
        <div id="eyeleft" class="relative transition-all duration-500 moon">
            <span ref="leftEyeBall" class="eyeball">
                <span class="eyelid"></span>
            </span>
        </div>
    </div>
</template>

<script setup>
import {ref, onMounted}  from 'vue'

const rightEyeBall = ref(0)
const leftEyeBall = ref(0)
const mouseY = ref(0)
const mouseX = ref(0)

// onMounted(() => {
//     window.addEventListener('mousemove', event => {
//         mouseY.value = event.clientY
//         mouseX.value = event.clientX
//         calculateMousePosition()
//     })
    
//     function calculateMousePosition() {
//         let eyeTopOffest = rightEyeBall.value.getBoundingClientRect().top
//         let eyeBottomOffest = rightEyeBall.value.getBoundingClientRect().bottom
//         let eyeRightOffest = rightEyeBall.value.getBoundingClientRect().right
//         let eyeLeftOffest = rightEyeBall.value.getBoundingClientRect().left
//         let eyeCenterVertical = eyeTopOffest + ((eyeBottomOffest - eyeTopOffest) / 2)
//         let eyeCenterHorizontal = eyeLeftOffest + ((eyeRightOffest - eyeLeftOffest) / 2)
//         let mousePositionIsGreaterThanEyePositionX = mouseX.value > eyeCenterHorizontal
//         let mousePositionIsGreaterThanEyePositionY = mouseY.value > eyeCenterVertical
        
//         if (mousePositionIsGreaterThanEyePositionY) {
//             let offsetY = mouseY.value - eyeCenterVertical
//             const offsetX = ref(0)
//             if (mousePositionIsGreaterThanEyePositionX) {
//                 offsetX.value = mouseX.value - eyeCenterHorizontal
//             } else {
//                 offsetX.value = eyeCenterHorizontal - mouseX.value
//             }
//             let offsetZ = Math.sqrt((offsetY * offsetY) + (offsetX.value * offsetX.value))
//             let ratio = offsetX.value / offsetZ
//             let angleInRadians = Math.acos(ratio)
//             let angleInDegrees = ((angleInRadians * 180) / Math.PI).toFixed(2)
//             // leftEyeBall.value.style.transform = `translate(${offsetX.value, offsetY}px)`
//             // rightEyeBall.value.style.transform = `translate(${offsetX.value, offsetY}px)`
//         }
//         else {
//             let offsetY = eyeCenterVertical - mouseY.value
//             const offsetX = ref(0)
//             if (mousePositionIsGreaterThanEyePositionX) {
//                 offsetX.value = mouseX.value - eyeCenterHorizontal
//             } else {
//                 offsetX.value = eyeCenterHorizontal - mouseX.value
//             }
//             let offsetZ = Math.sqrt((offsetY * offsetY) + (offsetX.value * offsetX.value))
//             let ratio = offsetX.value / offsetZ
//             let angleInRadians = Math.acos(ratio)
//             let angleInDegrees = ((angleInRadians * 180) / Math.PI).toFixed(2)
//             // leftEyeBall.value.style.transform = `translate(${offsetX.value, offsetY}px)`
//             // rightEyeBall.value.style.transform = `translate(${offsetX.value, offsetY}px)`
//         }
//     }
// })
</script>

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/v8/firebase.User
      var uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

<style>
:root {
    --dots: #aead0d;
    --body: #fff56c;
    --eyes: #474848;
    --black: #1b1e20;
    --white: #fff;
}

#eyeleft, #eyeright {
    position: relative;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: white;
    border: 2px solid black;
}

.eyeball, .eyeball {
    position: absolute;
    top: 30%;
    left: 30%;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--eyes);
    border: 2px solid black;
}

.eyelid, .eyelid {
    position: absolute;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--black);
    border: 2px solid black;
}

.moon:after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 10px;
    width: 100%;
    height: 80px;
    border-radius: 50%;
    box-shadow:  0 15px 0 0  rgb(214, 118, 8);
    transform: rotate(180deg);
    }
</style>