<script setup lang="ts">

import TheAddition from "~/components/TheAddition.vue";
import TheMultiplication from "~/components/TheMultiplication.vue";
import TheTrainingFormVeeValidate from "~/components/base/BaseVeeValidate.vue";
</script>

<template>
  <div class="pageContainer">
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
  </div>

</template>

<style scoped lang="scss">

</style>
