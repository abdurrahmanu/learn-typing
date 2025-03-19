<template>
  <div class="py-5">
    <div class="flex gap-5 w-fit m-auto text-sm">
      <div class="w-fit px-3 border-2 border-gray-500">GROSS WPM</div>
      <div class="w-fit px-3 border-2 border-sky-300">NET WPM</div>
    </div>
    <canvas class="max-w-[1000px] w-[100%] m-auto max-h-[250px]" ref="lineGraph"></canvas>
    <div dir="rtl" class="text-gray-600 text-right w-fit font-bold m-auto">Time</div>
  </div>
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
const time = Array(net.length).fill('').map((_, index) => index + 1)
const lineGraph = ref(null)
const labels = ref([])
const computeTime = computed(() => {
  return Math.round(net.length)
})

onMounted(() => {
  labels.value = time

  // moving average
  let improvedGross = ref([])

  // for (let index = 0; index < gross.length; index++) {
  //   let len = improvedGross.value.length + 1
  //   let average = [...gross.slice(0, index + 1)].reduce((prev, curr) => prev + curr, 0)
  //   improvedGross.value.push(Math.round(average) / len)
  // }

  // 300 seconds --- 

    for (let index = 0; index < gross.length; index++) {
      if (index - 1 > -1) {
        let current = Math.round(gross[index])
        let previous = Math.round(gross[index - 1])

        if (current === 0) improvedGross.value.push((current + previous) / 2)
        else improvedGross.value.push(gross[index])
      } else {
        improvedGross.value.push(gross[index])
      }
    }

  // for (let index = 0; index < net.length; index++) {
  //   if (index - 1 > -1) {
  //     net[index] = (net[index] + net[index - 1]) / 2
  //   }
  // }

  const data = ref({
    labels: labels.value,
    datasets: [
    {
      label: 'GROSS WPM',
      data: improvedGross,
      borderColor: 'skyblue',
      backgroundColor: 'white',
      fill: false,
      yAxisID: 'y',
      tension: 0.2
    },
    {
      // label: 'NET WPM',
      data: net,
      borderColor: 'gray',
      backgroundColor: 'black',
      fill: false,
      yAxisID: 'y',
      tension: 0.2
    }
  ]
  })
  
  const config = ref({
    type: 'line',
    data: data.value,
    options: {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
                stepSize: 20
            }
        }
      }
    }
  })

  new Chart(lineGraph.value, config.value)
})
</script>