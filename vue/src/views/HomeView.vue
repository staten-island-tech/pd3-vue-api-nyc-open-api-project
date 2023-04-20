<script setup>
// import TheWelcome from "../components/TheWelcome.vue";
import { ref, onMounted } from "vue";
const covidData = ref("");
async function api() {
  let response = await fetch(
    "https://data.cityofnewyork.us/resource/rc75-m7u3.json"
  );
  covidData.value = await response.json();
}
onMounted(() => {
  api();
});
</script>

<template>
  <main>
    <div class="death-data">
      <div class="single-data" v-for="data in covidData" :key="data">
        <h2>{{ data.date_of_interest }}</h2>
        <h3>{{ data.case_count }} cases</h3>
        <h3>{{ data.bk_case_count }} brooklyn cases</h3>
      </div>
    </div>
  </main>
</template>

<style scoped>
.death-data {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.single-data {
  width: 20%;
}
</style>
