<script setup lang="ts">

import TheMultiplication from "~/components/TheMultiplication.vue";
import TheAddition from "~/components/TheAddition.vue";
import TheTrainingFormVeeValidate from "~/components/base/BaseVeeValidate.vue";
</script>

<template>
  <h2>Тренировка Разному функционалу</h2>
  <div>
    <TheAddition/>
  </div>
  <div>
    <TheMultiplication/>
  </div>
  <div>
    <TheTrainingFormVeeValidate/>
  </div>
</template>

<style scoped lang="scss">

</style>
