<script setup>
import { ref, onMounted } from "vue";
const covidData = ref("");
// import TheWelcome from "../components/TheWelcome.vue";

async function api() {
  let response = await fetch(
    "https://data.cityofnewyork.us/resource/rc75-m7u3.json"
  );
  let data = await response.json();
  covidData.value = data.death_count;
  console.log(covidData);
  // console.log(data.data.death_count[0]);
  // this.users = users;
  // console.log(this.users[0]);
}
onMounted(() => {
  api();
});
</script>

<template>
  <!-- <main>
    <TheWelcome />
  </main> -->
  <div></div>
</template>

<style></style>
