import { reactive, ref } from 'vue';
import { Direction, GameDataType, GameOptionType, OperateType } from '@/views/Game/interface';
import delegateEvent from '@/views/Game/utils/Event';

/**
 * 提供上下左右的操作
 */

let game_data: GameOptionType = {
  size: 4,
  data: [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};
let has_init = false;

/**
 * 初始化游戏
 */
export const start_game = (option: GameOptionType) => {
  game_data = option;
  // 初始化数据渲染表格
  init_game_data(option);
  // 注册监听
  if (!has_init) {
    const operaEvent: OperateType = reactive<OperateType>({
      left: () => toLeft(option),
      up: () => toUp(option),
      down: () => toDown(option),
      right: () => toRight(option),
    });
    delegateEvent(operaEvent);
    has_init = true;
  }
};

/**
 * 随机数
 */
const getRandomData = () => {
  const randomData = [2, 0, 8, 4, 0, 16, 0, 2, 4, 8];
  const index = Math.floor(Math.random() * 10);
  if (index % 3 === 0) {
    return 0;
  } else {
    return randomData[index];
  }
};

const init_game_data = (option: GameOptionType) => {
  const { size } = option;
  const arr = [];
  for (let i = 0; i < size; i++) {
    const row = [];
    for (let i = 0; i < size; i++) {
      row.push(getRandomData());
    }
    arr.push(row);
  }
  option.data = arr;
};

const toLeft = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.map((row: GameDataType) => {
    const merge: GameDataType = mergeRow(row);
    return merge.fill(4) as any as GameDataType;
  });
  game_data.data = result;
  addPoint(game_data);
};

const toRight = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.map((row: GameDataType) => {
    const merge: GameDataType = mergeRow(row.reverse());
    return merge.fill(4).reverse() as any as GameDataType;
  });
  game_data.data = result;
  addPoint(game_data);
};

const toUp = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.rowToCol().map((row: GameDataType) => {
    const merge: GameDataType = mergeRow(row);
    return merge.fill(4) as any as GameDataType;
  });
  game_data.data = result.rowToCol();
  addPoint(game_data);
};

const toDown = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.rowToCol().map((row: GameDataType) => {
    const merge: GameDataType = mergeRow(row.reverse());
    return merge.fill(4).reverse() as any as GameDataType;
  });
  game_data.data = result.rowToCol();
  addPoint(game_data);
};

const mergeRow = (rowData: GameDataType) => {
  const fRow = rowData.filter(e => e !== 0);
  if (fRow.length === 0) {
    return [] as GameDataType;
  } else {
    const groupRow = fRow.groupBy(2);
    // 合并数据并组装, 同时用标识去判断是否合并过，合并过就需要在处理一次
    let flag = false;
    let merge: GameDataType = groupRow.reduce((result, item) => {
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
      merge = mergeRow(merge);
    }
    return merge as GameDataType;
  }
};

const addPoint = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const flatData: GameDataType = data.flat();
  // 随机数字
  const min: number = flatData.filter(e => e !== 0).sort((a: number, b: number) => a - b)[0];
  let randomData = [min / 2, min];
  if (min === 2) {
    randomData = [2, 4];
  }
  // let random = Math.random() >= 0.5 ? randomData[0] : randomData[1];
  // 看看有多少个无数据的位置
};

const findIndex = (arr) => {
  // const length =
  // a.join('-').split('1').slice(0, 3).join('').replaceAll('-', '').length + 2
};