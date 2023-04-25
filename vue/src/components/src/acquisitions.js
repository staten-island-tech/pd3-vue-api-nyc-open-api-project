import Chart from "chart.js/auto";

// import { ref } from "vue";

// const covidData = ref("");
async function api() {
  let response = await fetch(
    "https://data.cityofnewyork.us/resource/rc75-m7u3.json"
  );
  let data = await response.json();
  console.log(data[0]);
}
api();
/* onMounted(() => {
  api();
}); */

export default function chart(data) {
  new Chart(document.getElementById("acquisitions"), {
    type: "bar",
    data: {
      labels: data.products.map((e) => e.date_of_interest),
      datasets: [
        {
          label: "Acquisitions by year",
          data: data.products.map((e) => e.case_count),
        },
      ],
    },
  });
}
