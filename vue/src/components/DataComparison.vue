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
</template>

<script>
import Chart from "chart.js/auto";

async function api() {
  let res = await fetch(
    "https://data.cityofnewyork.us/resource/rc75-m7u3.json"
  );
  let covidData = await res.json();
  return covidData;
}
export default {
  methods: {
    enter: async function (e) {
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
    },
  },
};
</script>

<style scoped></style>
