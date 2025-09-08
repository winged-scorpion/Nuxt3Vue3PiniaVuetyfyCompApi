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
      cover
      cycle
      v-if="props.taskList !== undefined"
      :show-arrows="props.taskList.taskCode && props.taskList.taskCode?.length > 1"
      :class="{'__noPagination':props.taskList.taskCode?.length === 1}"
  >
    <v-carousel-item
        v-for="(item,i) of props.taskList.taskCode"
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

<style scoped lang="scss"></style>
<style lang="scss">
.v-btn--active {
  background: rgb(95, 158, 160);
}

.__noPagination {
  .v-carousel__controls {
    display: none;
  }
}
</style>
