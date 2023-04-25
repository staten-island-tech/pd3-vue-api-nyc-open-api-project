<script>
import Chart from 'chart.js/auto'
import { ref } from 'vue'
const covidData = ref('')
async function covidAPI() {
  let response = await fetch('https://data.cityofnewyork.us/resource/rc75-m7u3.json')
  covidData.value = await response.json()
}
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  mounted() {
    covidAPI()
    console.log(covidData)
    const date = [1, 2, 3, 4, 5]
    console.log(
      'Component Mounted',
      date.forEach((el) => {
        console.log(el)
      })
    )
    const ctx = document.getElementById('myChart')
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: date,
        datasets: [
          {
            label: 'Bronx',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          },
          {
            label: 'Brooklyn',
            data: [12, 19, 3, 5, 2, 20],
            borderWidth: 1
          },
          {
            label: 'Manhattan',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          },
          {
            label: 'Queens',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          },
          {
            label: 'Staten Island',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    })
  }
}
</script>

<template>
  <div>
    <canvas id="myChart"></canvas>
  </div>
  <div v-for="data in covidData" :key="data">
    <h1>{{ data.death_count }} Deaths on {{ data.date_of_interest }}</h1>
    <h1>{{ data.bx_death_count }} in Bronx</h1>
    <h1>{{ data.bk_death_count }} in Brooklyn</h1>
    <h1>{{ data.mn_death_count }} in Manhattan</h1>
    <h1>{{ data.qn_death_count }} in Queens</h1>
    <h1>{{ data.si_death_count }} in Staten Island</h1>
  </div>
  <h1>shjt</h1>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

#myChart {
  width: 800px;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
