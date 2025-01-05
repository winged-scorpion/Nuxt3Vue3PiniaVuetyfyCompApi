<script setup lang="ts">
import {ref, watch} from "vue";
import BaseH1 from "~/src/components/BaseH1.vue";
import {projectGetJson} from "~/src/projectGetJson";
import TheIndexTileProjectComponent from "~/src/components/TheIndexTileProjectComponent.vue";
import TheRangeSlider from "~/src/components/TheProjectFilter.vue";

const projectList = await projectGetJson();
const projectListArr = ref(projectList.default);
const modelValue = ref();

watch(() => modelValue, () => {
  projectListArr.value = projectList.default.slice(modelValue.value[0], modelValue.value[1] + 1).flat()
}, {deep: true});
const numGenerate = (max:number) => Math.floor(Math.random() * max);

</script>

<template>
  <div class="pageContainer">

    <BaseH1/>

    <TheRangeSlider
        v-model="modelValue"
    />

    <div class="projectList">
        <TheIndexTileProjectComponent
            v-for="item of projectListArr"
            :projectArr="item"
            :key="numGenerate(5000)"
        />
    </div>
  </div>
</template>
<style lang="scss">
.projectList {
  & > div {
    &:nth-child(odd) {
      & > div {
        flex-direction: row-reverse;
        .btn-wrap{
          text-align: left;
        }
      }
    }
  }
}

</style>
