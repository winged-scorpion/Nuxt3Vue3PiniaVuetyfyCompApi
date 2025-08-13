<script setup lang="ts">
import {ref, watch, defineAsyncComponent} from "vue";
import BaseH1 from "~/components/base/BaseH1.vue";

import {preparationGetJson} from "~/src/preparationGetJson";
import {BASE_COLOR, INPUT_TYPE} from "~/src/constant";
import BaseButton from "~/components/base/BaseButton.vue";
import BaseInput from "~/components/base/BaseInput.vue";
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
const audio = ref('');
const mixTopics = ref(false);
const viewing = ref(true);
const mixQuestions = ref(false);
const checked = ref(false);
const pause = ref(false)
const stop = ref(false);
const randomGroup = ref(false)
let questionSlider: any;
let asyncModalWithOptions: any;

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
  mapGroupTask()
}

const playStop = (event: Boolean) => {
  if (event) {
    clearInterval(questionSlider);
    pause.value = true;
  } else {
    viewingDisableButton.value = false;
  }
}

const nextTask = () => {
  Object.assign(showQuestion, outTaskList.shift())
  audio.value = showQuestion.audio
  if (audio.value.length !== 0) {
    asyncModalWithOptions = defineAsyncComponent({
      loader: () => import('~/components/base/BaseAudio.vue'),
    })
  }

  if (taskList.length === 0) stop.value = true;
  return showQuestion.time;
}

function questionInterval() {
  return showIntervalQuestions.value * 60000 * (timeMultiplier.value || 1);
}

function questionRandom(item: boolean) {}

function mapGroupTask() {
  if (!randomGroup.value) {
    outTaskList.length = 0
    Object.assign(outTaskList, taskList)
  } else {
    Object.assign(outTaskList, Shuffle(taskList.slice()))
  }
}

function randomGroupTask(item: boolean) {
  randomGroup.value = item
  mapGroupTask()
}

function viewingSlider(event: Boolean) {
  playStop(event)
  if (event) {
    return false
  } else {
    if (!mixTopics.value) Object.assign(outTaskList, taskList.flat())
  }
  // if (pause.value) {
  //   console.log('stop  ----> start',progressBarModel.value)
  //
  // } else {
  //   playSlider(pause.value)
  // }
  playSlider(pause.value)
}

function playSlider(pause:boolean) {
  console.log('pause',pause)
  if(!pause){
    //Object.assign(outTaskList, outTaskList.flat())
    console.log('1111')
  }else{
    console.log('2222')
  }




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
  selectFilter.length = 0;
  viewingDisableButton.value = true;
  taskList.length = 0
  viewing.value = true
  testStatus.value = false;
  progressBarModel.value = 0;
  checked.value = false
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
                @click="randomGroupTask(mixTopics = !mixTopics)"
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
              v-model="checked"
              @change="selectCheck(item.tag)"
              multiple
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
