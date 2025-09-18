<script setup lang="ts">

import {IMG_LIST} from "~/src/constant";
import {type PropType} from "vue";
import type {ModalContentLiveCode} from "~/model/modal";

const props = defineProps({
  sliderList: {
    type: Object as PropType<string[]>,
    required: false
  },
  taskList: {
    type: Object as PropType<ModalContentLiveCode>,
    required: false
  },
  sliderImg: {
    type: Boolean
  },
  update: {
    type: Boolean
  }
});

const validateBackground = (str: string) => {
  let link = '';
  IMG_LIST.forEach(item => {
    if (str.indexOf(item) > 0) {
      link = str
    }
  })
  return link;
}
const taskListStatus = ref(false);
watch(() => props, () => {
  taskListStatus.value = props.taskList !== undefined;
}, {deep: true});
</script>
<template>
  <v-carousel
      controls
      indicators
      v-if="props.sliderList !== undefined"
      :class="{'__noPagination':props.sliderList.length === 1}"
  >
    <v-carousel-item
        v-for="item of props.sliderList"
        :src="validateBackground(item)"
        class="projectSlider"
    >
    </v-carousel-item>
  </v-carousel>
  <v-carousel
      v-if="taskListStatus"
      height="auto"
      :show-arrows="props.taskList?.taskCode && props.taskList.taskCode.length > 1"
      :class="{'__noPagination':props.taskList?.taskCode?.length === 1}"
  >
    <v-carousel-item
        v-for="(item,i) of props.taskList?.taskCode"
        :key="i"
        class="projectSlider"
    >
      <TheTileModalContentComponent
          :code-task="item"
          :code-title="taskList?.taskHead"
      />
    </v-carousel-item>
  </v-carousel>

</template>


<style lang="scss">
.v-btn--active {
  background: rgb(95, 158, 160);
}

.v-carousel-item {
  padding-bottom: 50px;
}

.__noPagination {
  .v-carousel__controls {
    display: none;
  }
}
</style>
