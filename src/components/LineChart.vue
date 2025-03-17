<template>
  <canvas class="max-w-[1000px] w-[100%] m-auto" ref="lineGraph"></canvas>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js'
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale,);

const props = defineProps({
  wpm: {
    default: [],
    type: Object
  },
})

const net = Object.values(props.wpm).map((val, index) => val['netWPM'])
const gross = Object.values(props.wpm).map((val, index) => val['grossWPM'])
const time = Array(net.length).fill('').map((_, index) => index)
const lineGraph = ref(null)
const labels = ref([])

onMounted(() => {
  labels.value = time

  // moving average
  let improvedGross = ref([])

  for (let index = 0; index < gross.length; index++) {
    let len = improvedGross.value.length + 1
    let average = [...gross.slice(0, index + 1)].reduce((prev, curr) => prev + curr, 0)
    improvedGross.value.push(Math.round(average) / len)
  }

  let improvedNet = ref([])
  for (let index = 0; index < net.length; index++) {
    // let len = improvedNet.value.length + 1
    // let average = [...gross.slice(0, index + 1)].reduce((prev, curr) => prev + curr, 0)
    // improvedNet.value.push(Math.round(average) / len)
  }


  const data = ref({
    labels: labels.value,
    datasets: [
    {
      label: 'GROSS WPM',
      data: improvedGross,
      borderColor: 'green',
      backgroundColor: 'white',
      fill: false,
      yAxisID: 'y',
      tension: 0.1
    },
    {
      label: 'NET WPM',
      data: net,
      borderColor: 'skyblue',
      backgroundColor: 'white',
      fill: false,
      yAxisID: 'y',
      tension: 0.1
    }
  ]
  })
  
  const config = ref({
    type: 'line',
    data: data.value,
  })

  new Chart(lineGraph.value, config.value)
})
</script>