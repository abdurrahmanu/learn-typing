<template>
  <canvas class="max-w-[600px] w-[90%] m-auto" ref="lineGraph"></canvas>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue'
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

const props = defineProps({
  x: {
    default: [],
    type: Array
  },
  y: {
    default: [],
    type: Array
  }
})

const lineGraph = ref(null)
const labels = ref([])

onMounted(() => {
  labels.value = props.x

  const xAndY = computed(() => labels.value.map((val, index) => {
    return {x: val, y: props.y[index]}
  }))

  const data = ref({
    labels: labels.value,
    datasets: [{
      label: 'Typing Session result',
      data: xAndY.value,
      fill: false,
      borderColor: 'skyblue',
      tension: 0.1
    }]
  })
  
  const config = ref({
    type: 'line',
    data: data.value,
    options: {
    stepped: true,
    scales: {
      x: {
        type: 'linear',
        position: 'bottom'
      }
    }
  }
  })

  new Chart(lineGraph.value, config.value)
})
</script>