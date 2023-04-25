<script setup>
import chart from "./src/acquisitions";
</script>

<template>
  <!-- <div class="case-data">
    <div class="single-data" v-for="data in covidData" :key="data">
      <h2>{{ data.date_of_interest }}</h2>
      <h3>{{ data.case_count }} cases</h3>
      <h3>{{ data.bk_case_count }} brooklyn cases</h3>
    </div>
  </div> -->

  <chart />

  <!-- <div>{{ api }}</div> -->
</template>

<style scoped>
/* .case-data {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.single-data {
  width: 20%;
} */
</style>
