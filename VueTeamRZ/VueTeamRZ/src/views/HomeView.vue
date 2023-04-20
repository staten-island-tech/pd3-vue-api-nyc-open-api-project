<script setup>
import Chart from 'chart.js/auto'
import { ref, onMounted } from 'vue'
const covidData = ref('')
async function api() {
  let response = await fetch('https://data.cityofnewyork.us/resource/rc75-m7u3.json')
  covidData.value = await response.json()
}

onMounted(() => {
  api()
})
</script>

<template>
  <main>
    <h1 v-for="data in covidData" :key="data">{{ covidData.death_count }}</h1>
  </main>
</template>
