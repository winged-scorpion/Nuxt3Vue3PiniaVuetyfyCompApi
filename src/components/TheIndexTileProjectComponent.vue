<script setup lang="ts">
import BaseCarousel from "~/src/components/BaseCarousel.vue";
import BaseButton from "~/src/components/BaseButton.vue";
import BaseDetails from "~/src/components/BaseDetails.vue";
import type {ProjectCompanyList} from "~/model/projectListSlider";

const props = defineProps({
  projectArr: {
    type: Object as PropType<ProjectCompanyList>,
    required: true
  }
});
const subHead = 'Как проходила работа:';
const numGenerate = (max: number) => Math.floor(Math.random() * max);

</script>

<template>

  <div class="project-wrap">
    <div class="project-wrap__head">
      <h3>{{ projectArr?.name }} - {{ projectArr?.temp }}</h3>
    </div>

    <div
        class="project projectBorderWrap"
        v-for="projectItem of projectArr.projectList"
        :class="{dark_time_revert:projectItem.darkTime}"
        :key="numGenerate(5000)"
    >

      <div
          class="project__slider"
          :class="{'flex-center':projectItem.slider?.length === 1}"
      >
        <div v-if="projectItem.darkTime" class="dark_time"></div>
        <span v-else>
          <BaseCarousel
              v-if="projectItem.slider !== undefined && projectItem.slider?.length > 1"
              :show-arrows="false"
              :slider-list="projectItem.slider"
          />
          <img
              v-if="projectItem.slider !== undefined && projectItem.slider?.length === 1"
              :src="projectItem.slider[0]"
              alt=""
              class="one-img"
          >
        </span>
      </div>
      <div
          class="project__description"
          :class="{dark_time:projectItem.darkTime}"
      >
        <h2>{{ projectItem.project }}</h2>
        <h4>{{ projectItem.project_description }}</h4>
        <hr>
        <section>
          <div><strong class="subHead">Стек:</strong></div>
          <div class="stag">
          <span v-for="item of projectItem.stack">
            {{ item }}
          </span>
          </div>
          <hr>
        </section>
        <section
            v-if="projectItem.work !== undefined && projectItem.work.length !== 0"
        >
          <div><strong class="subHead">Что было сделано:</strong></div>
          <ol>
            <li v-for="item of projectItem.work">{{ item }}</li>
          </ol>
          <hr>
        </section>
        <section
            v-if="projectItem.workflow">
          <BaseDetails
              :header="subHead"
          >
            {{ projectItem.workflow }}
          </BaseDetails>
          <hr>
        </section>
        <div
            class="btn-wrap"
            v-if="projectItem.link"
        >
          <hr>
          <BaseButton
              :href="projectItem.link"
          >
            Посетить сайт
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.project-wrap {
  position: relative;
  padding: 10px 0;
  margin-bottom: 50px;

  .project {
    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &:before, &:after {
    display: block;
    width: 100%;
    max-width: 300px;
    height: 300px;
    position: absolute;
    z-index: 1;
    content: '';
  }

  &:before {
    right: 0;
    top: 38px;
    border-right: solid 4px #5f9ea0;
    border-top: solid 4px #5f9ea0;
    border-radius: 0 10px 0 0;
    box-shadow: 5px -5px 5px #5f9ea0;
  }

  &:after {
    left: 0;
    bottom: 10px;
    border-left: solid 4px #5f9ea0;
    border-bottom: solid 34px #5f9ea0;
    border-radius: 0 0 0 10px;
    box-shadow: -5px 5px 5px #5f9ea0;
  }

  &__head {

  }
}

.project {
  display: flex;
  position: relative;
  z-index: 2;
  background: #fff;
  width: 100%;
  border-radius: 6px;
  overflow: hidden;
  min-height: 400px;
  border: solid 4px #5f9ea0;
  margin-bottom: 25px;

  &.dark_time_revert {
    flex-direction: row;

    .project__slider {
      position: static;
    }
  }

  &__slider, &__description {
    width: 50%;
    position: relative;
    min-height: inherit;
  }

  &__description {
    padding: 20px;

    &.dark_time {
      .details {
        width: 70%;
      }

      section {
        position: relative;

        &:last-of-type {
          &:after {
            display: block;
            content: '';
            background: url("~/assets/images/saimon/not_work.webp") no-repeat;
            width: 200px;
            height: 200px;
            background-size: contain;
            scale: -1 1;
            position: absolute;
            right: 0;
            top: 0;
          }
        }
      }
    }

    section {
      &:last-of-type {
        hr {
          display: none;
        }
      }
    }
  }

  &__slider {
    .dark_time {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: #f3f3f314;

      &:before, &:after {
        content: '';
        display: block;
        position: absolute;
      }

      &:before {
        background: url("~/assets/images/saimon/saimon_sadness.png") no-repeat;
        background-size: contain;
        width: 200px;
        height: 95px;
        bottom: 0;
        left: 10%;
      }

      &:after {
        background: url("~/assets/images/saimon/png-klev-club-p-pautina-png-5.png") no-repeat;
        background-size: contain;
        width: 250px;
        height: 234px;
        left: 0;
        top: 0;
      }
    }
  }
}

.projectBorderWrap {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 6px;
}

.stag {
  span {
    margin: 0 10px 0 0;

    &:last-of-type {
      margin-right: 0;
    }
  }
}

ol {
  padding: 0 0 0 30px;
}

hr {
  margin: 5px 0 15px;
  background: #305152;
  border: none;
  height: 1px;
}

.btn-wrap {
  text-align: right;

  .v-btn {
  }
}

.one-img {
  max-width: 100%;
  object-fit: cover;
}
</style>
