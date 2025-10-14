<script setup lang="ts">
import {BASE_COLOR, INPUT_TYPE} from "~/src/constant";
import BaseInput from "~/components/base/BaseInput.vue";
import {preparationGetJson} from "~/src/preparationGetJson";
import type {QuestionFull} from "~/model/preparation";
import BaseButton from "~/components/base/BaseButton.vue";
import {ref} from "vue";

const baseQuestionList = (await preparationGetJson()).default,
    sortQuestionList = reactive(<QuestionFull[]>[]),
    playStop = ref(true),
    interviewStatus = ref(false),
    progressBarModel = ref(59),
    interviewData = reactive({
      timeInterview: '1',
      mixTopics: false,
      mixQuestion: false
    }),
    schema = {
      interval: {
        as: 'interval',
        name: 'interval',
        value: '1',
      }
    }

function shuffleTopics() {
  sortQuestionList.sort(() => Math.random() - 0.5)
  interviewData.mixTopics = true
  setTimeout(()=>{
    interviewData.mixTopics = false
  },1000)
}

function shuffleQuestion() {
  sortQuestionList.forEach((item) => {
    item.list.sort(() => Math.random() - 0.5)
  })
  interviewData.mixQuestion = true
  setTimeout(()=>{
    interviewData.mixQuestion = false
  },1000)
}

function sortTopicsTag(tag: string, checked: boolean) {
  if (checked) {
    let itemTopic = baseQuestionList.find((item) => {
      if (item.tag === tag) {
        return item
      }
    })
    sortQuestionList.push(itemTopic)
  } else {
    sortQuestionList.forEach((elDelete, index) => {
      if (elDelete.tag === tag) {
        sortQuestionList.splice(index, 1)
      }
    })
  }
}

</script>
<template>
  <div class="pageContainer">
    <BaseH1/>
    <div class="interview">
      <div class="interview__sidebar">
        <div class="interview__control __controlMix">
          <label>
            <span>
              Интервал между вопросами в минутах
            </span>
            <BaseInput
                v-model="interviewData.timeInterview"
                :schema="schema.interval"
                :inputType="INPUT_TYPE.number"
                :value="interviewData.timeInterview"
            />
          </label>
          <BaseButton
              @click="shuffleTopics()"
              :class="{active:interviewData.mixTopics}"
          >Перемешать темы
          </BaseButton>

          <BaseButton
              @click="shuffleQuestion()"
              :class="{active:interviewData.mixQuestion}"
          >Перемешать вопросы в темах
          </BaseButton>
        </div>
        <div class="interview__control">
          <label
              class="checkbox"
              v-for="topic of baseQuestionList"
          >
            <v-checkbox
                density="compact"
                hide-details
                :color="BASE_COLOR"
                @change="sortTopicsTag(topic.tag,$event.target.checked)"
                multiple
            />
            <span>{{ topic.name }}</span>
          </label>
        </div>
      </div>
      <div class="interview__slider-container">
        <div
            class="interview__tags"
            v-if="sortQuestionList.length !== 0"
        >
          <div
              class="interview__tags-item"
              v-for="topic in sortQuestionList"
          >
            {{ topic.name }}
            <span>{{ topic.list.length }}</span>
          </div>

        </div>
        <div class="interview__slider">
          <div class="slide">
            <strong class="slide__head">Вопрос</strong>
              <v-progress-linear
                  v-model="progressBarModel"
                  height="16px"
                  class="progressBar"
              ></v-progress-linear>
              <details class="slide__body">
                <summary class="slide__accordion">333333</summary>
                <br>
                <div class="slide__down">
                  33333
                </div>
              </details>
          </div>
        </div>
        <div class="interview__button">
          <BaseButton
              class="button"
          >
            <span v-if="playStop">Старт</span>
            <span v-else>Пауза</span>
          </BaseButton>
          <BaseButton
              class="button"
          >
            Сброс
          </BaseButton>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.v-progress-linear__determinate{
  background: rgb(95, 158, 160);
}
</style>
<style scoped lang="scss">
.progressBar{
  background: #5f9ea036;
  border-radius: 10px 10px 0 0;
  margin-bottom: -6px;
  z-index: 1;
  position: relative;
}
.slide{
  &__body{
    width: 500px;
    padding: 15px;
    border-radius: 10px;
    border: solid 2px rgba(95, 158, 160, 0.2117647059);
    z-index: 2;
    background: #fff;
    border-top: none;
    position: relative;
  }
  &__accordion{
    background: rgb(95 158 160 / 10%);
    cursor: pointer;
    padding: 5px;
    border-radius: 5px;
    border: solid 2px #5f9ea036;
  }
  &__head{
    margin-bottom: 10px;
    display: block;
  }
  &__down{
    padding: 10px;
    border: solid 2px rgba(95, 158, 160, 0.2117647059);
    border-radius: 5px;
    background: rgba(95, 158, 160, 0.1);
  }
}

.interview {
  display: flex;
  gap: 20px;
  &__button {
    position: absolute;
    bottom: 0;
    left: 15px;
    right: 15px;
    z-index: 2;
    display: flex;
    justify-content: center;
    gap: 15px;
    border-radius: 10px 10px 0 0;
    border: solid 3px #5f9ea036;
    border-bottom: none;
    padding: 15px;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    padding: 15px;
    border-radius: 0 0 10px 10px;
    border: solid 3px #5f9ea036;
    border-top: none;
    position: relative;
    z-index: 2;

    &-item {
      font-size: 12px;
      padding: 5px;
      border: solid 1px #5f9ea036;
      border-radius: 5px;

      span {
        color: rgb(95 158 160);
      }
    }
  }

  &__sidebar {
    width: 20%;
  }

  &__control {
    border: solid 4px #5f9ea036;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }
    button{
      width: 100%;
      border: solid 2px rgb(95, 158, 160);
      border-top: none;
      border-left: none;
      transition: 1s;
      &.active{
        border: solid 1px red;
        border-bottom: none;
        border-right: none;
      }
    }
    &.__controlMix{
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      font-size: 14px;
    }
  }

  &__slider-container {
    width: 80%;
    border: solid 4px #5f9ea036;
    padding: 0 15px 15px 15px;
    border-radius: 10px;
    position: relative;
  }
  &__slider{
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 70px;
    z-index: 1;
  }
}

.checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
}

</style>
