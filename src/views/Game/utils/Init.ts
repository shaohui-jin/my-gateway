import { Direction, GameDataType, GameOptionType, OperateType } from '@/views/Game/interface';
import { RegisterEvent, UnRegisterEvent } from '@/views/Game/utils/Event';
import { ElMessage } from 'element-plus';
import { watch, reactive } from 'vue';
let has_init = false;
let game_data = reactive<GameOptionType>({
  size: 4,
  data: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
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
        console.log(12312312);
        const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
        const size: number = JSON.parse(JSON.stringify(game_data.size));
        const flatData: GameDataType = data.flat();
        // 看看有多少个无数据的位置
        const zeroList = flatData.filter(e => e === 0); // 为0的数组
        if (zeroList.length === 0) {
          game_over('lose', game_data);
          return false;
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
  if (index % 3 === 0) {
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

const to_left = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.map((row: GameDataType) => {
    const merge: GameDataType = merge_row(row);
    return merge.fill(4) as any as GameDataType;
  });
  if (game_data.data.toString() !== result.toString()) {
    game_data.data = result;
    add_point(game_data);
  }
};

const to_right = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.map((row: GameDataType) => {
    const merge: GameDataType = merge_row(row.reverse());
    return merge.fill(4).reverse() as any as GameDataType;
  });
  if (game_data.data.toString() !== result.toString()) {
    game_data.data = result;
    add_point(game_data);
  }
};

const to_up = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.rowToCol().map((row: GameDataType) => {
    const merge: GameDataType = merge_row(row);
    return merge.fill(4) as any as GameDataType;
  });
  if (game_data.data.toString() !== result.rowToCol().toString()) {
    game_data.data = result.rowToCol();
    add_point(game_data);
  }
};

const to_down = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.rowToCol().map((row: GameDataType) => {
    const merge: GameDataType = merge_row(row.reverse());
    return merge.fill(4).reverse() as any as GameDataType;
  });
  if (game_data.data.toString() !== result.rowToCol().toString()) {
    game_data.data = result.rowToCol();
    add_point(game_data);
  }
};

const merge_row = (rowData: GameDataType) => {
  const fRow = rowData.filter(e => e !== 0);
  if (fRow.length === 0) {
    return [] as GameDataType;
  } else {
    const adjoinSameData = fRow.groupByAdjoinSameData();
    // 合并数据并组装, 同时用标识去判断是否合并过，合并过就需要在处理一次
    let flag = false;
    let merge: GameDataType = adjoinSameData.reduce((result, item) => {
      if (item.length !== 2) {
        result.push(...item);
      } else {
        const [first, second] = item;
        if (first === second) {
          flag = true;
          result.push((first as number) + (second as number));
        } else {
          result.push(...item);
        }
      }
      return result;
    }, []);
    if (flag) {
      merge = merge_row(merge);
    }
    return merge as GameDataType;
  }
};

/**
 * 随机生成数字
 * @param game_data
 */
const add_point = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const size: number = JSON.parse(JSON.stringify(game_data.size));
  const flatData: GameDataType = data.flat();
  // 看看有多少个无数据的位置
  const zeroList = flatData.filter(e => e === 0); // 为0的数组
  // const min: number = flatData.filter(e => e !== 0).sort((a: number, b: number) => a - b)[0];
  // const randomData = min === 2 ? [2, 4] : [min / 2, min];
  const random = Math.random() >= 0.5 ? 2 : 4; // 随机数字
  const randomIndex = Math.floor(Math.random() * zeroList.length); // 随机数下标
  const flatIndex = flatData.indexOf(0, randomIndex + 1); // 数组中的下标
  data[Math.floor(flatIndex / size)][flatIndex % size] = random;
  game_data.data = data;
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
