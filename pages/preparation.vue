<script setup lang="ts">
import {onMounted, ref, watch, defineAsyncComponent} from "vue";
import BaseH1 from "~/src/components/BaseH1.vue";

import {preparationGetJson} from "~/src/preparationGetJson";
import {BASE_COLOR, INPUT_TYPE} from "~/src/constant";
import BaseButton from "~/src/components/BaseButton.vue";
import BaseInput from "~/src/components/BaseInput.vue";
import type {Question} from "~/model/preparation";

const preparation = await preparationGetJson();
const list = preparation.default;

const selectFilter = reactive(<String[]>[])
const taskList = ref([]);

let taskList2 = reactive(<Question[]>[])

const showQuestion = reactive(<Question>{})



const progressBarModel = ref(0);
const showIntervalQuestions = ref(1);
const disableButtonPlay = ref(true);
const disableButtonStop = ref(true);
const testStatus = ref(false);
const timeMultiplier = ref(0);
const audio = ref('')

let asyncModalWithOptions: any;

let stop = ref(false)

const selectCheck = (item: string) => {
  if (selectFilter.length === 0 || !selectFilter.includes(item)) {
    selectFilter.push(item)
  } else {
    Object.assign(selectFilter.filter((el) => el !== item))
  }
  disableButtonPlay.value = selectFilter.length === 0;
}

let questionSlider: any;

const playStop = (event: string) => {
  if (event === 'play') {
    disableButtonPlay.value = true;
    disableButtonStop.value = false;
  } else {
    disableButtonPlay.value = false;
    disableButtonStop.value = true;
    taskList.value = [];
    testStatus.value = false;
    progressBarModel.value = 0;
  }
}

const nextTask = () => {
  Object.assign(showQuestion,taskList.value.shift())
  audio.value = showQuestion.audio
  if (audio.value.length !== 0) {
    asyncModalWithOptions = defineAsyncComponent({
      loader: () => import('~/src/components/BaseAudio.vue'),
    })
  }

  if (taskList.value.length === 0) {
    stop.value = true;
  }
  return showQuestion.time;
}
const speedcal = () => {
  return showIntervalQuestions.value * 60000 * (timeMultiplier.value || 1);
}

const educationStart = (time: number) => {
  playStop('play')
  for (let task of list) {
    selectFilter.forEach((item) => {
      if (task.tag === item) {
        taskList.value.push(task.list)
      }
    })
  }
  taskList.value = taskList.value.flat();
  testStatus.value = true;
  taskList.value = taskList.value.sort(() => Math.random() - 0.5);
  timeMultiplier.value = nextTask();

  function questionSliderFunction() {
    progressBarModel.value = ++progressBarModel.value;
    if (progressBarModel.value >= 100) {
      progressBarModel.value = 0
      timeMultiplier.value = nextTask();
    }
  }

  watch(() => speedcal(), () => {
    clearInterval(questionSlider)
    questionSlider = setInterval(() => {
      questionSliderFunction();
    }, speedcal() / 100);
  }, {deep: true});


  questionSlider = setInterval(() => {
    questionSliderFunction();
  }, speedcal() / 100);

  watch(() => stop.value, () => {
    if (stop.value) {
      setTimeout(() => {
        clearInterval(questionSlider)
      }, speedcal());
    }
  }, {deep: true});

}
const nextQuestions = () => {
  progressBarModel.value = 100;
}
const educationStop = () => {
  playStop('stop');
  clearInterval(questionSlider);
}


onMounted(() => {

})

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
            />
            <span>Перемешать разделы</span>
          </label>
          <label class="preparation__control-item">
            <v-checkbox
                density="compact"
                hide-details
                :color="BASE_COLOR"
            />
            <span>Перемешать вопросы</span>
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
        <div>
          <BaseButton
              @click="educationStart(showIntervalQuestions)"
              :disabled='disableButtonPlay'
              class="button"
          >
            начать
          </BaseButton>
          <BaseButton
              @click="educationStop()"
              :disabled='disableButtonStop'
              class="button"
          >
            Остановить
          </BaseButton>
        </div>
      </div>
      <div class="preparation__task">
        <div class="card-task__wrap">
          <div v-if="testStatus">Осталось вопросов {{ taskList.length }}</div>
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
    &-item{
      display: flex;
      align-items: center;
      span{
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

</style>
