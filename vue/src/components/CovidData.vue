<script>
import Chart from "chart.js/auto";
// import { ref } from "vue";

async function api() {
  let res = await fetch(
    "https://data.cityofnewyork.us/resource/rc75-m7u3.json"
  );
  let covidData = await res.json();
  return covidData;
}

export default {
  name: "CovidCaseCount",
  props: {},
  methods: {
    enter: async function (e) {
      e.preventDefault();
      let chart = document.getElementById("case-chart");
      chart.remove();
      document.querySelector(".chart").innerHTML = "";
      document
        .querySelector(".chart")
        .insertAdjacentHTML(
          "beforebegin",
          `<canvas id="case-chart" style="width: 500vw; height: 350vh"></canvas>`
        );
      let input = document.querySelector(".input").value;
      console.log(`Month: ${input}`);

      let data = await api();

      let a = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.date_of_interest.slice(0, 10);
        });

      let b = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.case_count;
        });
      let blist = [];
      for (let i = 0; i < b.length; i++) {
        blist.push(parseFloat(b[i]));
      }
      let bsum = 0;
      blist.forEach((e) => {
        bsum += e;
      });
      console.log(`All: ${bsum}`);

      let bxdata = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.bx_case_count;
        });
      let bxlist = [];
      for (let i = 0; i < bxdata.length; i++) {
        bxlist.push(parseFloat(bxdata[i]));
      }
      let bxsum = 0;
      bxlist.forEach((e) => {
        bxsum += e;
      });
      console.log(`Bronx: ${bxsum}`);

      let bkdata = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.bk_case_count;
        });
      let bklist = [];
      for (let i = 0; i < bkdata.length; i++) {
        bklist.push(parseFloat(bkdata[i]));
      }
      let bksum = 0;
      bklist.forEach((e) => {
        bksum += e;
      });
      console.log(`Brooklyn: ${bksum}`);

      let mndata = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.mn_case_count;
        });
      let mnlist = [];
      for (let i = 0; i < mndata.length; i++) {
        mnlist.push(parseFloat(mndata[i]));
      }
      let mnsum = 0;
      mnlist.forEach((e) => {
        mnsum += e;
      });
      console.log(`Manhattan: ${mnsum}`);

      let qndata = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.qn_case_count;
        });
      let qnlist = [];
      for (let i = 0; i < qndata.length; i++) {
        qnlist.push(parseFloat(qndata[i]));
      }
      let qnsum = 0;
      qnlist.forEach((e) => {
        qnsum += e;
      });
      console.log(`Queens: ${qnsum}`);

      let sidata = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.si_case_count;
        });
      let silist = [];
      for (let i = 0; i < sidata.length; i++) {
        silist.push(parseFloat(sidata[i]));
      }
      let sisum = 0;
      silist.forEach((e) => {
        sisum += e;
      });
      console.log(`Staten Island: ${sisum}`);

      new Chart(document.getElementById("case-chart"), {
        data: {
          datasets: [
            {
              type: "bar",
              label: `Daily Covid Cases for ${input}`,
              data: b,
            },
          ],
          labels: a,
        },
      });

      new Chart(document.getElementById("case-chart2"), {
        type: "polarArea",
        data: {
          labels: ["Bronx", "Brooklyn", "Manhattan", "Queens", "Staten Island"],
          datasets: [
            {
              data: [bxsum, bksum, mnsum, qnsum, sisum],
            },
          ],
        },
      });
    },
  },
};
</script>

<template>
  <div class="row">
    <form id="form">
      <input
        type="text"
        name="search"
        class="input"
        placeholder="2020-03 to 2022-11"
      />
      <input @click="enter" type="submit" value="Search" class="button" />
    </form>
    <button class="bar"></button>
  </div>

  <div class="chart">
    <canvas id="case-chart"></canvas>
  </div>
  <div class="chart2">
    <canvas id="case-chart2"></canvas>
  </div>
</template>

<style scoped>
.chart {
  width: 1500px;
  margin-bottom: 5rem;
}
.chart2 {
  width: 600px;
}
</style>
