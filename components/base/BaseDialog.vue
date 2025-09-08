<script setup lang="ts">
import type {ModalContentLiveCode} from "~/model/modal";
import {type PropType, ref, watch} from "vue";
import BaseCarousel from "~/components/base/BaseCarousel.vue";
import TheTileModalContentComponent from "~/components/TheTileModalContentComponent.vue";

const props = defineProps({
  task: {
    type: Object as PropType<ModalContentLiveCode>,
    required: true
  },
  typeContent: {
    type: String,
    required: true
  },
  visible: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <div
      class="modal"
      :class="{show: visible}"
  >
    <div class="modal__body">
      <div v-if="typeContent === 'livecode'">
        <BaseCarousel
            :show-arrows="false"
            height="auto"
            :task-list="task"
        />
      </div>
      <div v-if="typeContent === 'video'">
        видео
      </div>
      <v-btn
          text="&#x2716;"
          density="compact"
          @click="$emit('closed')"
      />
    </div>

  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: #00000033;
  z-index: 9999;
  display: none;
  justify-content: center;
  align-items: center;
  &__body{
    position: relative;
    width: 50%;
  }
  button{
    width: 50px;
    height: 50px;
    position: absolute;
    right: 0;
    top: 0;

  }
}
.show{
  display: flex;
}

</style>
