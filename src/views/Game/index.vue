<template>
  <div class="game-container">
    <div class="game-body">
      <div v-for="(row, rI) in gameOption.data" :key="rI" class="game-body_row">
        <div v-for="(col, cI) in row" :key="cI" class="game-body_col">
          <div class="game-body_item" :style="{ backgroundColor: ColorOption[col][0], color: ColorOption[col][1] }">
            {{ col === 0 ? '' : col }}
          </div>
        </div>
      </div>
    </div>
    <div class="game-footer">
      <div class="game-button" @click="newGame">重新开始</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, onMounted } from 'vue';
import { ColorOption } from './utils/Config';
import { start_game } from './utils/Init';
import { GameOptionType } from '@/views/Game/interface';

const gameOption = reactive<GameOptionType>({
  size: 4,
  data: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
});

const newGame = () => {
  start_game(gameOption);
};

onMounted(() => {
  newGame();
});
</script>

<style lang="less" scoped>
.game-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.game-body {
  //position: absolute;
  //top: 50%;
  //left: 50%;
  //transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
  background-color: #bbada1;
  padding: 12px;
  .game-body_row {
    display: flex;
    height: calc((100% - (v-bind('gameOption.size') - 1) * 12px) / v-bind('gameOption.size'));
    &:not(:nth-last-child(1)) {
      margin-bottom: 12px;
    }
    .game-body_col {
      width: calc((100% - (v-bind('gameOption.size') - 1) * 12px) / v-bind('gameOption.size'));
      //width: 60px;
      &:not(:nth-last-child(1)) {
        margin-right: 12px;
      }
      .game-body_item {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24px;
        border-radius: 4px;
        background-color: #cdc0b5;
      }
    }
  }
}
.game-footer {
  margin-top: 10px;
  height: 50px;
  //line-height: 50px;
  .game-button {
    cursor: pointer;
    width: 60px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: #bbada1 1px solid;
    text-align: center;
  }
}
</style>
