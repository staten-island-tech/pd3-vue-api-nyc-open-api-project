<script>
import Chart from 'chart.js/auto'
import { ref } from 'vue'
const covidDataRef = ref('')
async function covidAPI() {
  let response = await fetch('https://data.cityofnewyork.us/resource/rc75-m7u3.json')
  covidDataRef.value = await response.json()
  return covidDataRef.value
}
let covidData = await covidAPI()

export default {
  data() {
    return {
      text: this.value
    }
  },
  name: 'HelloWorld',
  props: {
    msg: String
  },

  methods: {
    renderChart() {
      let n = this.text

      let SiDeath = []
      let BxDeath = []
      let BkDeath = []
      let MnDeath = []
      let QnDeath = []
      let Date = []

      covidData
        .filter((el) => {
          return el.date_of_interest.includes(n)
        })
        .map((e) => {
          BkDeath.push(e.bk_death_count)
          MnDeath.push(e.mn_death_count)
          QnDeath.push(e.qn_death_count)
          SiDeath.push(e.si_death_count)
          BxDeath.push(e.bx_death_count)
          Date.push(e.date_of_interest)
        })

      const ctx = document.getElementById('myChart')
      this.existence = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Date,
          datasets: [
            {
              label: 'Bronx',
              data: BxDeath,
              borderWidth: 1
            },
            {
              label: 'Brooklyn',
              data: BkDeath,
              borderWidth: 1
            },
            {
              label: 'Manhattan',
              data: MnDeath,
              borderWidth: 1
            },
            {
              label: 'Queens',
              data: QnDeath,
              borderWidth: 1
            },
            {
              label: 'Staten Island',
              data: SiDeath,
              borderWidth: 1
            }
          ]
        },
        existence: null,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      })
    },
    destroyChart() {
      if (this.existence) {
        this.existence.destroy()
        this.existence = null
      }
    },
    onKeyDown() {
      return this.text
    },
    async getData() {}
  },
  watch: {
    text() {
      this.destroyChart()

      this.renderChart()

      console.log(this.text)
    }
  },

  mounted() {}
}
</script>

<template>
  <div>
    <input v-model="text" placeholder="YYYY-MM" @click="onKeyDown" />
    <canvas id="myChart"></canvas>
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
  height: 80vh;
}
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
