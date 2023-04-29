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
      /* let chart = document.getElementById("#0").getContext("2d");
      chart.destroy(); */
      //document.querySelector("#case-chart").destroy();
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

      let data = await api();

      let a = data
        .filter(
          (e) =>
            e.date_of_interest.includes("2020") &&
            e.date_of_interest.includes("01")
        )
        .map((e) => {
          return e.date_of_interest;
        });

      let b = data
        .filter(
          (e) =>
            e.date_of_interest.includes("2020") &&
            e.date_of_interest.includes("01")
        )
        .map((e) => {
          return e.case_count;
        });

      let c = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.date_of_interest;
        });

      let d = data
        .filter((e) => e.date_of_interest.includes(input))
        .map((e) => {
          return e.case_count;
        });

      if (input == null) {
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
      } else {
        new Chart(document.getElementById("case-chart"), {
          type: "bar",
          data: {
            labels: c,
            datasets: [
              {
                label: "Covid Case Count",
                data: d,
              },
            ],
          },
        });
      }
    },
  },
};
</script>

<template>
  <form id="form">
    <input type="text" name="search" class="input" />
    <input @click="enter" type="submit" value="submit" class="button" />
  </form>
  <div class="chart">
    <canvas id="case-chart" style="width: 500vw; height: 350vh"></canvas>
  </div>
</template>

<style scoped></style>
