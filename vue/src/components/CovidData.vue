<template>
  <div class="row">
    <form id="form">
      <input class="input" type="text" name="search" placeholder="2020-03 to 2022-11" />
      <input class="button" @click="enter" type="submit" value="Search" />
    </form>
  </div>

  <div class="chart">
    <canvas id="case-chart"></canvas>
  </div>
  <div class="chart2">
    <canvas id="case-chart2"></canvas>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

async function api() {
  let res = await fetch('https://data.cityofnewyork.us/resource/rc75-m7u3.json')
  let covidData = await res.json()
  return covidData
}

export default {
  name: 'CovidCaseCount',
  methods: {
    enter: async function (e) {
      e.preventDefault()
      let chart = document.getElementById('case-chart')
      let chart2 = document.getElementById('case-chart2')
      chart.remove()
      chart2.remove()
      document.querySelector('.chart').innerHTML = ''
      document.querySelector('.chart2').innerHTML = ''
      document
        .querySelector('.chart')
        .insertAdjacentHTML('afterbegin', `<canvas id="case-chart"></canvas>`)
      document
        .querySelector('.chart2')
        .insertAdjacentHTML('afterbegin', `<canvas id="case-chart2"></canvas>`)
      let input = document.querySelector('.input').value
      console.log(`Month: ${input}`)

      let data = await api()

      let a = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.date_of_interest.slice(0, 10)
        })

      let b = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.case_count
        })
      let blist = []
      for (let i = 0; i < b.length; i++) {
        blist.push(parseFloat(b[i]))
      }
      let bsum = 0
      blist.forEach((e) => {
        bsum += e
      })
      console.log(`All: ${bsum}`)

      let bxdata = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.bx_case_count
        })
      let bxlist = []
      for (let i = 0; i < bxdata.length; i++) {
        bxlist.push(parseFloat(bxdata[i]))
      }
      let bxsum = 0
      bxlist.forEach((e) => {
        bxsum += e
      })
      console.log(`Bronx: ${bxsum}`)

      let bkdata = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.bk_case_count
        })
      let bklist = []
      for (let i = 0; i < bkdata.length; i++) {
        bklist.push(parseFloat(bkdata[i]))
      }
      let bksum = 0
      bklist.forEach((e) => {
        bksum += e
      })
      console.log(`Brooklyn: ${bksum}`)

      let mndata = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.mn_case_count
        })
      let mnlist = []
      for (let i = 0; i < mndata.length; i++) {
        mnlist.push(parseFloat(mndata[i]))
      }
      let mnsum = 0
      mnlist.forEach((e) => {
        mnsum += e
      })
      console.log(`Manhattan: ${mnsum}`)

      let qndata = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.qn_case_count
        })
      let qnlist = []
      for (let i = 0; i < qndata.length; i++) {
        qnlist.push(parseFloat(qndata[i]))
      }
      let qnsum = 0
      qnlist.forEach((e) => {
        qnsum += e
      })
      console.log(`Queens: ${qnsum}`)

      let sidata = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.si_case_count
        })
      let silist = []
      for (let i = 0; i < sidata.length; i++) {
        silist.push(parseFloat(sidata[i]))
      }
      let sisum = 0
      silist.forEach((e) => {
        sisum += e
      })
      console.log(`Staten Island: ${sisum}`)

      new Chart(document.getElementById('case-chart'), {
        data: {
          datasets: [
            {
              type: 'bar',
              label: `Daily Covid Cases for ${input}`,
              data: b
            }
          ],
          labels: a
        }
      })

      new Chart(document.getElementById('case-chart2'), {
        type: 'doughnut',
        data: {
          labels: ['Bronx', 'Brooklyn', 'Manhattan', 'Queens', 'Staten Island'],
          datasets: [
            {
              data: [bxsum, bksum, mnsum, qnsum, sisum]
            }
          ]
        }
      })
    }
  }
}
</script>

<style scoped>
.chart {
  width: 40vw%;
  margin-bottom: 5rem;
}
.chart2 {
  width: 40vw;
}

.input {
  height: 2.25rem;
  border-radius: 6px;
  margin-right: 0.2rem;
}

.button {
  appearance: none;
  background-color: #fafbfc;
  border: 1px solid rgba(27, 31, 35, 0.15);
  border-radius: 6px;
  box-shadow: rgba(27, 31, 35, 0.04) 0 1px 0, rgba(255, 255, 255, 0.25) 0 1px 0 inset;
  box-sizing: border-box;
  color: #24292e;
  cursor: pointer;
  display: inline-block;
  font-family: -apple-system, system-ui, 'Segoe UI', Helvetica, Arial, sans-serif,
    'Apple Color Emoji', 'Segoe UI Emoji';
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  list-style: none;
  padding: 6px 16px;
  position: relative;
  transition: background-color 0.2s cubic-bezier(0.3, 0, 0.5, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  white-space: nowrap;
  word-wrap: break-word;
}
.button:hover {
  background-color: #f3f4f6;
  text-decoration: none;
  transition-duration: 0.1s;
}
.button:disabled {
  background-color: #fafbfc;
  border-color: rgba(27, 31, 35, 0.15);
  color: #959da5;
  cursor: default;
}
.button:active {
  background-color: #edeff2;
  box-shadow: rgba(225, 228, 232, 0.2) 0 1px 0 inset;
  transition: none 0s;
}
.button:focus {
  outline: 1px transparent;
}
.button:before {
  display: none;
}
</style>
