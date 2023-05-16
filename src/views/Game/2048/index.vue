<template>
  <div class="game-container">
    <div class="game-header">
      <span>游戏难度: {{ `lavel ${gameOption.size}` }}</span>
      <span>总分: {{ gameOption.score }}</span>
    </div>
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
      <div class="game-button" @click.stop="() => handleVisible()">重新开始</div>
    </div>
    <el-dialog title="提示" v-model="visible" width="50%">
      <el-row :gutter="8">
        <el-col :span="8">游戏难度：</el-col>
        <el-col :span="16">
          <el-select v-model="level">
            <el-option v-for="item in gameLevel" :key="item" :label="`lavel ${item}`" :value="item" />
          </el-select>
        </el-col>
      </el-row>
      <template #footer>
        <el-button @click="cancel"> 取 消 </el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue';
import { ColorOption } from './utils/Config';
import { start_game } from './utils/Init';
import { GameOptionType } from '@/views/Game/2048/interface';

const gameLevel = reactive([4, 5, 6]);
const gameOption = reactive<GameOptionType>({
  size: 4,
  data: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
  watchEffect: false,
  score: 0,
});

const newGame = () => {
  start_game(gameOption);
};

onMounted(() => {
  newGame();
});

let visible = ref<boolean>(false);
let level = ref<number>(4);
const handleVisible = () => (visible.value = !visible.value);
const cancel = () => {
  level.value = 4;
  handleVisible();
};
const submit = () => {
  gameOption.score = 0;
  gameOption.size = level.value;
  cancel();
  newGame();
};
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
.game-header {
  width: 100%;
  padding: 12px 0;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
  padding: 12px 0;
  .game-button {
    cursor: pointer;
    //width: 60px;
    //width: auto;
    padding: 0 12px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: #bbada1 1px solid;
    text-align: center;
  }
}

/deep/ .el-dialog__body {
  padding: 10px 20px;
}
</style>
