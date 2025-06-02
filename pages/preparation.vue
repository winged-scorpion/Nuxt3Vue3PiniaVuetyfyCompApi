<script setup lang="ts">
import {ref, watch, defineAsyncComponent} from "vue";
import BaseH1 from "~/src/components/BaseH1.vue";

import {preparationGetJson} from "~/src/preparationGetJson";
import {BASE_COLOR, INPUT_TYPE} from "~/src/constant";
import BaseButton from "~/src/components/BaseButton.vue";
import BaseInput from "~/src/components/BaseInput.vue";
import type {Question} from "~/model/preparation";

import {Shuffle} from "~/composables/randomKeysArray";

const preparation = await preparationGetJson();
const list = preparation.default;

const selectFilter = reactive(<String[]>[]);

const taskList = reactive(<Question[]>[]);

const outTaskList = reactive(<Question[]>[]);

const showQuestion = reactive(<Question>{});

const progressBarModel = ref(0);
const showIntervalQuestions = ref(1);
const viewingDisableButton = ref(true);
const testStatus = ref(false);
const timeMultiplier = ref(0);
const audio = ref('')
const mixTopics = ref(false)
const viewing = ref(true)
const mixQuestions = ref(false)

let asyncModalWithOptions: any;

let stop = ref(false);

const selectCheck = (item: string) => {
  if (selectFilter.length === 0 || !selectFilter.includes(item)) {
    selectFilter.push(item)
  } else {
    selectFilter.forEach((elDelete, index) => {
      if (elDelete === item) {
        selectFilter.splice(index, 1)
      }
    })
  }
  viewingDisableButton.value = selectFilter.length === 0;

  let selectArrayQuestion: Question[][] = []
  for (let task of list) {
    selectFilter.forEach((item) => {
      if (task.tag === item) {
        selectArrayQuestion.push(task.list)
      } else {

      }
    })
  }
  Object.assign(taskList, selectArrayQuestion)
}

let questionSlider: any;

const playStop = (event: Boolean) => {
  if (event) {
    clearInterval(questionSlider);
  } else {
    viewingDisableButton.value = false;
  }
}

const nextTask = () => {
  Object.assign(showQuestion, outTaskList.shift())
  audio.value = showQuestion.audio
  if (audio.value.length !== 0) {
    asyncModalWithOptions = defineAsyncComponent({
      loader: () => import('~/src/components/BaseAudio.vue'),
    })
  }

  if (taskList.length === 0) stop.value = true;
  return showQuestion.time;
}

function questionInterval() {
  return showIntervalQuestions.value * 60000 * (timeMultiplier.value || 1);
}

function questionRandom(item: boolean) {
  console.log('questionRandom')

  //Object.assign(taskList.sort(() => Math.random() - 0.5))
}

function shuffleTopics(item: boolean) {
  if (item) {
    Object.assign(outTaskList, Shuffle(taskList.slice()))
  } else {
    outTaskList.length = 0
    Object.assign(outTaskList, taskList)
  }
}

function topicsList() {

}

function viewingSlider(event:Boolean) {

  playStop(event)
  if(event){
    return false
  }else{
    if(!mixTopics.value) Object.assign(outTaskList, taskList.flat())
  }

  Object.assign(outTaskList, outTaskList.flat())

  testStatus.value = true;
  timeMultiplier.value = <number>nextTask();

  function questionSliderFunction() {
    progressBarModel.value = ++progressBarModel.value;
    if (progressBarModel.value >= 100) {
      progressBarModel.value = 0
      timeMultiplier.value = <number>nextTask();
    }
  }

  watch(() => questionInterval(), () => {
    clearInterval(questionSlider)
    questionSlider = setInterval(() => {
      questionSliderFunction();
    }, questionInterval() / 100);
  }, {deep: true});


  questionSlider = setInterval(() => {
    questionSliderFunction();
  }, questionInterval() / 100);

  watch(() => stop.value, () => {
    if (stop.value) {
      setTimeout(() => {
        clearInterval(questionSlider)
      }, questionInterval());
    }
  }, {deep: true});

}

const nextQuestions = () => {
  progressBarModel.value = 100;
}
function educationStop() {
  // selectFilter.length = 0;
  // selectCheck('')
  viewingDisableButton.value = true;
  taskList.length = 0
  testStatus.value = false;
  progressBarModel.value = 0;
}

</script>
<template>
  <div class="pageContainer">
    <BaseH1/>
    <div class="preparation">
      <div class="preparation__list">
        <div class="preparation__control">
          <label>
            <span>
              Интервал между вопросами в минутах,<br> базовый интервал 1 минута
            </span>
            <BaseInput
                v-model="showIntervalQuestions"
                :inputType="INPUT_TYPE.number"
            />
          </label>
          <label class="preparation__control-item">
            <v-checkbox
                density="compact"
                hide-details
                :color="BASE_COLOR"
                @click="shuffleTopics(mixTopics = !mixTopics)"
            />
            <span>Перемешать темы</span>
          </label>
          <label class="preparation__control-item">
            <v-checkbox
                density="compact"
                hide-details
                :color="BASE_COLOR"
                @click="questionRandom(mixQuestions = !mixQuestions)"
            />
            <span>Перемешать вопросы в темах</span>
          </label>
        </div>
        <div
            v-for="item of list"
        >
          <v-checkbox
              density="compact"
              hide-details
              :color="BASE_COLOR"
              :value="item.tag"
              :label="item.name"
              @change="selectCheck(item.tag)"
          />
        </div>
        <div class="preparation__nav">
          <BaseButton
              @click="viewingSlider(viewing = !viewing)"
              :disabled='viewingDisableButton'
              class="button"
          >
            <span v-if="viewing">Старт</span>
            <span v-else>Пауза</span>
          </BaseButton>
          <BaseButton
              @click="educationStop"
              :disabled='viewingDisableButton'
              class="button"
          >
           Сброс
          </BaseButton>

        </div>
      </div>
      <div class="preparation__task">
        <div class="card-task__wrap">
          <div v-if="testStatus">Осталось вопросов {{ outTaskList.length }}</div>
          <div
              v-if="testStatus"
              class="card-task">
            <v-progress-linear
                v-model="progressBarModel"
                height="10"
                class="question_time_progress"
            ></v-progress-linear>
            <component
                v-if="audio.length !== 0"
                :is="asyncModalWithOptions"
                :audio-link="audio"
            />

            <details class="taskItem">
              <summary class="btnAccordion">{{ showQuestion.question }}</summary>
              <br>
              <div>
                {{ showQuestion.answer }}
              </div>
            </details>
            <BaseButton
                @click="nextQuestions()"
            >
              Далее
            </BaseButton>


          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

.card-task {
  display: block;
  position: relative;
  box-shadow: 0 0 10px #ababab;
  border-radius: 10px;
  padding: 15px;
  margin-top: 15px;

  &__wrap {
    width: 50%;
    margin: 20px auto;
  }
}

.button {
  width: 100%;
  margin: 15px 0;
}

.taskItem {
  position: relative;
  z-index: 2;
  border-radius: 10px;
  cursor: pointer;
  margin-bottom: 25px;
}

.preparation {
  display: flex;
  align-items: flex-start;

  &__list {
    width: 20%;
  }

  &__task {
    width: 80%;
  }

  &__control {
    border: solid 4px #5f9ea036;
    padding: 10px;
    border-radius: 10px;

    &-item {
      display: flex;
      align-items: center;

      span {
        cursor: pointer;
      }
    }
  }
}

.question_time_progress {
  position: absolute;
  left: 0;
  margin: 0 0 0;
  border-radius: 10px 10px 0 0;
}

.preparation__nav {
  position: fixed;
  bottom: 100px;
  display: flex;
  justify-content: center;
  width: 100vw;
  left: 0;
  right: 0;
  margin: auto;
  gap: 20px;

  button {
    width: 200px;
    margin: 0;
  }
}

</style>
