<script setup lang="ts">
import BaseH1 from "~/components/base/BaseH1.vue";
import TheAddition from "~/components/TheAddition.vue";
import TheMultiplication from "~/components/TheMultiplication.vue";
import TheTrainingFormVeeValidate from "~/components/form/TheTrainingFormVeeValidate.vue";
</script>

<template>
  <div class="pageContainer">
    <BaseH1/>
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


<style scoped>

</style>
