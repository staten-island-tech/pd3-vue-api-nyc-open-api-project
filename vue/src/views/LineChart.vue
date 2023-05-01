<template>
  <CovidDataLine></CovidDataLine>
  <div class="about"></div>
</template>

<script setup>
import CovidDataLine from '../components/CovidDataLine.vue'
</script>
<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
