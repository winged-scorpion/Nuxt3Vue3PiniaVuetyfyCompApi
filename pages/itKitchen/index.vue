<script setup lang="ts">

import BaseH1 from "~/components/base/BaseH1.vue";

const videoList = [
  {
    id: 1,
    description: 'кратко по терминологий',
    link: 'https://www.youtube.com/watch?v=gV6eobXisYU',
    img: 'https://jsek.work/vt-sunflowers.jpg'
  },
  {
    id: 2,
    description: 'event-loop',
    link: 'https://www.youtube.com/watch?v=377qAu37OTE',
    img: 'https://jsek.work/vt-sunflowers.jpg'
  },
  {
    id: 3,
    description: 'собеседование на junior хорошее по скриптам',
    link: 'https://www.youtube.com/watch?v=ScRTey_dvhI',
    img: 'https://jsek.work/vt-sunflowers.jpg'
  },
  {
    id: 4,
    description: 'по вью',
    link: 'https://www.youtube.com/watch?v=IeZt4h0w0Kg&t=7519s',
    img: 'https://jsek.work/vt-sunflowers.jpg'
  },
  {
    id: 5,
    description: '16 вопросов по js',
    link: 'https://www.youtube.com/watch?v=3kLS5UPvfss',
    img: 'https://jsek.work/vt-sunflowers.jpg'
  },
  {
    id: 6,
    description: "важное по резюме",
    link: "https://www.youtube.com/watch?v=_ytszV4ItAg&ab_channel=СаняобIT",
    img: 'https://jsek.work/vt-sunflowers.jpg'
  }
]

function openVideo(id: number) {
  console.log('id-------------------------------', id)
}

</script>


<template>
  <div class="pageContainer">
    <BaseH1/>

    <div class="player player-wrap">
      <div
          class="player__body"
          v-for="item in videoList"
          @click="openVideo(item.id)"
      >
        <v-icon class="player__play">mdi-play-box</v-icon>
        <img
            :src="item.img"
            :alt="item.description"
        >
        <!--        <v-video-->
        <!--            aspect-ratio="16/9"-->
        <!--            preload="metadata"-->
        <!--            :image="item.img"-->
        <!--            :src="item.link"-->
        <!--        />-->
        <div class="player__description">{{ item.description }}</div>
      </div>
    </div>

  </div>
</template>

<style scoped lang="scss">
@import "assets/variables";

.videoItem {
  border: solid 2px #000;
  margin: 15px 0;
  width: 45%;

  div {
    padding: 5px 10px;

    &:first-of-type {
      border-right: solid 2px #f5f5f5;
    }
  }

  strong {
    margin-right: 5px;
    display: block;
  }
}

.mh {
  min-height: 76px;
}

.player {
  &-wrap {
    margin: 25px 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 2%
  }

  &__body {
    width: 32%;
    height: 200px;
    margin-bottom: 15px;
    min-width: 450px;
    background: #5f9ea091;
    display: flex;
    align-items: end;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    border-radius: 40px 0 0 0;
    position: relative;
    overflow: hidden;

    &:before {
      content: '';
      display: block;
      width: 40px;
      height: 40px;
      background: #fff;
      position: absolute;
      right: 0;
      bottom: 0;
      border-radius: 40px 0 0 0;
      z-index: 2;
    }

    &:hover {
      background: rgb(95 158 160);

      i {
        opacity: 1;
      }
    }

    img {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

  &__play {
    z-index: 4;
    font-size: 85px;
    color: red;
    position: absolute;
    top: 50%;
    margin: -43px auto;
    left: 0;
    right: 0;
    opacity: 0;
    transition: 0.3s;
  }

  &__description {
    padding: 10px 0 0 10px;
    font-size: 20px;
    position: relative;
    z-index: 3;
    text-shadow: $shadow;
  }
}


</style>
