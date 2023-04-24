import Chart from "chart.js/auto";
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

const stuff = (async function () {
  const data = { covidData };

  new Chart(document.getElementById("acquisitions"), {
    type: "bar",
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.map((row) => row.count),
        },
      ],
    },
  });
})();

export { stuff };
