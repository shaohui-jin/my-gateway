import { Direction, GameDataType, GameOptionType, OperateType } from '@/views/Game/2048/interface';
import { RegisterEvent, UnRegisterEvent } from '@/views/Game/2048/utils/Event';
import { ElMessage } from 'element-plus';
import { watch, reactive } from 'vue';
import { to_down, to_left, to_right, to_up } from '@/views/Game/2048/utils/Handler';
let has_init = false;
let game_data = reactive<GameOptionType>({
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

const getOperaEvent = (option: GameOptionType) => {
  return {
    left: () => to_left(option),
    up: () => to_up(option),
    down: () => to_down(option),
    right: () => to_right(option),
  };
};

/**
 * 初始化游戏
 */
export const start_game = (option: GameOptionType) => {
  game_data = option;
  // 初始化数据渲染表格
  init_game_data(option);
  // 注册监听
  if (!has_init) {
    /**
     * 监听游戏是否结束
     */
    watch(
      () => game_data.data,
      () => {
        if (game_data.watchEffect) {
          const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
          const size: number = JSON.parse(JSON.stringify(game_data.size));
          const flatData: GameDataType = data.flat();
          // 看看有多少个无数据的位置
          const zeroList = flatData.filter(e => e === 0); // 为0的数组
          if (zeroList.length === 0) {
            game_over('lose', game_data);
          }
        }
      }
    );
    RegisterEvent(getOperaEvent(option));
    has_init = true;
  }
};

/**
 * 随机数
 */
const get_random_data = () => {
  const randomData = [2, 0, 8, 4, 0, 16, 0, 2, 4, 8];
  const index = Math.floor(Math.random() * 10);
  if (index % 5 === 0) {
    return 0;
  } else {
    return randomData[index];
  }
};

/**
 * 初始化游戏数据
 * @param option
 */
const init_game_data = (option: GameOptionType) => {
  const { size } = option;
  const arr = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let i = 0; i < size; i++) {
      row.push(get_random_data());
    }
    arr.push(row);
  }
  option.data = arr;
};

const game_over = (type: 'win' | 'lose', option: GameOptionType) => {
  if (type === 'lose') {
    ElMessage.error('游戏结束');
    if (has_init) {
      UnRegisterEvent(getOperaEvent(option));
      has_init = false;
    }
  }
  type === 'win' && ElMessage.error('游戏通关');
};
