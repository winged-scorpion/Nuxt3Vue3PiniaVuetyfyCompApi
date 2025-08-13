<script setup lang="ts">
import BaseH1 from "~/components/base/BaseH1.vue";
import TheIndexTileProjectComponent from "~/components/TheIndexTileProjectComponent.vue";
import TheRangeSlider from "~/components/TheProjectFilter.vue";
import {useProjectList} from "~/store/projectList";

const projectListStore = useProjectList()
projectListStore.getProjectList()

const projectListArrBase = computed(() => {
  if (projectListStore.outProduct) {
    return projectListStore.outProduct
  }
  return false
})

const numGenerate = (max: number) => Math.floor(Math.random() * max);

function updateShowProjectList(item: [number, number]) {
  projectListStore.getProjectList(item)
}

</script>

<template>
  <div class="pageContainer">
    <BaseH1/>
    <TheRangeSlider
        @updateProjectList="updateShowProjectList"
    />

    <div
        class="projectList"
    >

      <TheIndexTileProjectComponent
          v-for="item of projectListArrBase"
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

        .btn-wrap {
          text-align: left;
        }
      }
    }
  }
}

</style>
