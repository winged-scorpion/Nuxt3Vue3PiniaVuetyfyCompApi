<script setup lang="ts">
import {randomBackground} from '~/src/functions';
import {getLiveTaskJson} from "~/src/liveTaskGetJson";
import {ref} from "vue";
import MasonryWall from '@yeger/vue-masonry-wall';
import TaskTileComponent from "~/components/TaskTilePreComponent.vue";
import BaseH1 from "~/components/base/BaseH1.vue";

const
    modalVisible = ref(false),
    taskList = await getLiveTaskJson()
const taskListArr = reactive({
  taskCode: [] as string[],
  taskHead: ''
})

function openDialog(taskId: number) {
  taskListArr.taskCode = taskList.default[taskId][1];
  taskListArr.taskHead = String(taskList.default[taskId][0]);
  modalVisible.value = true;
}

</script>
<template>
  <div class="pageContainer">
    <BaseH1/>
    <masonry-wall :items="taskList.default" :ssr-columns="1" :column-width="300" :gap="16">
      <template #default="{ item, index }">
        <TaskTileComponent
            @click="openDialog(index)"
            class="tile pa-2"
            :key="index"
            :tile-text="String(item[0])"
            :styleBackground=randomBackground()
        />
      </template>
    </masonry-wall>
  </div>
  <BaseDialog
      :task=taskListArr
      :type-content="'livecode'"
      :visible=modalVisible
      @closed="modalVisible = false"
  />
</template>

<style lang="scss">
.tile {
  cursor: pointer;

  &:hover {
    strong {
      color: #fff;
    }
  }

  strong {
    transition: 0.1s;
  }
}

.card-title {
  display: block;
  flex: none;
  font-size: 1.25rem;
  font-weight: 500;
  -webkit-hyphens: auto;
  hyphens: auto;
  letter-spacing: 0.0125em;
  min-width: 0;
  padding: 0.5rem 1rem;
  text-transform: none;
}

pre {
  font-size: 14px;
  color: black;
  font-weight: 900;
}
</style>
