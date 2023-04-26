<script>
import Chart from "chart.js/auto";

import { ref } from "vue";

const covidData = ref("");
async function api() {
  let res = await fetch(
    "https://data.cityofnewyork.us/resource/rc75-m7u3.json"
  );
  covidData.value = await res.json();
  let data = covidData.value;
  console.log(data);
  return data;
}

export default {
  name: "CovidCaseCount",
  async mounted() {
    let data = await api();
    let a = data.map((e) => {
      return e.date_of_interest;
    });
    let b = data.map((e) => {
      return e.case_count;
    });
    console.log(a);
    console.log(b);

    new Chart(document.getElementById("case-chart"), {
      type: "bar",
      data: {
        labels: a,
        datasets: [
          {
            label: "Covid Case Count",
            data: b,
          },
        ],
      },
    });
  },
};
</script>

<template>
  <canvas id="case-chart" style="width: 500vw; height: 350vh"></canvas>
</template>

<style scoped></style>
