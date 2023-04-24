<script setup>
// import Chart from 'chart.js/auto'
import { ref, onMounted } from 'vue'
const covidData = ref('')
async function covidAPI() {
  let response = await fetch('https://data.cityofnewyork.us/resource/rc75-m7u3.json')
  covidData.value = await response.json()
}

onMounted(() => {
  covidAPI()
  console.log('This good?')
})
</script>

<template>
  <main>
    <div v-for="data in covidData" :key="data">
      <h1>{{ data.death_count }} Deaths on {{ data.date_of_interest }}</h1>
      <h1>{{ data.bx_death_count }} in Bronx</h1>
      <h1>{{ data.bk_death_count }} in Brooklyn</h1>
      <h1>{{ data.mn_death_count }} in Manhattan</h1>
      <h1>{{ data.qn_death_count }} in Queens</h1>
      <h1>{{ data.si_death_count }} in Staten Island</h1>
    </div>

    <h1>poo</h1>
  </main>
</template>
