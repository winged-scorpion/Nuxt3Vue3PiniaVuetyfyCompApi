<script setup lang="ts">
import {ref} from "vue";
import {projectGetJson} from "~/src/projectGetJson";

const projectList = await projectGetJson();
let projectListArr = ref(projectList.projectListArr.flat());

const tickLabels = Object.assign({},projectListArr.value.map((el) => el.temp))
const thumbLabels = projectListArr.value.map((el) => el.name)

defineProps({
  modelValue: Array
});

let emit = defineEmits(['update:modelValue','updateProjectList']);

const range = ref([0, thumbLabels.length - 1])

</script>

<template>
  <div class="range-labels">
    <div
        class="range-labels__wrap"
        v-for="label in thumbLabels"
    >
      <div class="range-labels__item">{{ label }}</div>
    </div>
  </div>

  <v-range-slider
      class="range"
      :max="thumbLabels.length - 1"
      :ticks="tickLabels"
      show-ticks="always"
      :step="1"
      min="0"
      v-model="range"
      @end="emit('updateProjectList',range)"
  />
</template>

<style scoped lang="scss">
.range {
  margin: 15px 40px 50px;
}

.range-labels {
  display: flex;
  padding: 0 40px;
  justify-content: space-between;
  position: relative;

  &__item {
    background: #353535a3;
    color: #fff;
    border-radius: 4px;
    padding: 0 5px;
    font-size: 14px;
    white-space: nowrap;
    width: fit-content;
    position: relative;

    &:before {
      display: block;
      position: absolute;
      content: '';
      width: 0;
      height: 0;
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-top: 7px solid #353535a3;
      left: 0;
      right: 0;
      margin: 0 auto;
      top: 100%;
    }
  }

  &__wrap {
    width: 0;
    position: relative;
    display: flex;
    justify-content: center;
  }
}

</style>
