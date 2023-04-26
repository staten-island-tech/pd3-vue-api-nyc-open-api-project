<script>
import Chart from 'chart.js/auto'
import { ref } from 'vue'
const covidData = ref('')
async function covidAPI() {
  let response = await fetch('https://data.cityofnewyork.us/resource/rc75-m7u3.json')
  covidData.value = await response.json()
  return covidData.value
}

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },

  async mounted() {
    let covidData = await covidAPI()
    let cat = []
    let covidDate = covidData
      .filter((el) => {
        let n = '2020-03'
        return el.date_of_interest.includes(n)
      })
      .map((e) => {
        return cat.push({ a: e.date_of_interest, b: e.bx_death_count })
      })

    cat.forEach((el) => console.log(el.b))
    console.log(cat.a)
    let dog = covidData.filter((el) => {
      return el.date_of_interest.includes('2020-03')
    })
    let a = []
    dog.forEach((el) => {
      a.push(parseInt(el.bx_death_count))
    })
    console.log(a)
    let b = a.reduce((total, currentValue) => total + currentValue, 0)
    console.log(b)
    let covidNum = covidData
      .filter((el) => {
        let n = 21
        return el.date_of_interest.includes('20${n}-03')
      })
      .map((e) => {
        return e.bx_death_count.reduce((total, currentValue) => total + currentValue, 0)
      })
    console.log(covidNum)
    console.log(covidDate)
    let BronxDeath = covidData.map((el) => {
      return el.bx_death_count
    })

    let BrooklynDeath = covidData.map((el) => {
      return el.bk_death_count
    })

    let ManhattanDeath = covidData.map((el) => {
      return el.mn_death_count
    })

    let QueensDeath = covidData.map((el) => {
      return el.qn_death_count
    })

    let StatenIslandDeath = covidData.map((el) => {
      return el.si_death_count
    })

    console.log('Component Mounted')
    const ctx = document.getElementById('myChart')
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: covidDate,
        datasets: [
          {
            label: 'Bronx',
            data: BronxDeath,
            borderWidth: 1
          },
          {
            label: 'Brooklyn',
            data: BrooklynDeath,
            borderWidth: 1
          },
          {
            label: 'Manhattan',
            data: ManhattanDeath,
            borderWidth: 1
          },
          {
            label: 'Queens',
            data: QueensDeath,
            borderWidth: 1
          },
          {
            label: 'Staten Island',
            data: StatenIslandDeath,
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
  width: 1500px;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
