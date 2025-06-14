import { GameDataType, GameOptionType } from '@/views/Game/2048/interface';

/**
 * 向左
 * @param game_data
 */
export const to_left = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.map((row: GameDataType) => {
    const merge: GameDataType = merge_row(row, game_data);
    return merge.fill(game_data.size) as any as GameDataType;
  });
  if (game_data.data.toString() !== result.toString()) {
    game_data.data = result;
    add_point(game_data);
  } else {
    game_data.watchEffect = true;
  }
};

/**
 * 向右
 * @param game_data
 */
export const to_right = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.map((row: GameDataType) => {
    const merge: GameDataType = merge_row(row.reverse(), game_data);
    return merge.fill(game_data.size).reverse() as any as GameDataType;
  });
  if (game_data.data.toString() !== result.toString()) {
    game_data.data = result;
    add_point(game_data);
  } else {
    game_data.watchEffect = true;
  }
};

/**
 * 向上
 * @param game_data
 */
export const to_up = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.rowToCol().map((row: GameDataType) => {
    const merge: GameDataType = merge_row(row, game_data);
    return merge.fill(game_data.size) as any as GameDataType;
  });
  if (game_data.data.toString() !== result.rowToCol().toString()) {
    game_data.data = result.rowToCol();
    add_point(game_data);
  } else {
    game_data.watchEffect = true;
  }
};

/**
 * 向下
 * @param game_data
 */
export const to_down = (game_data: GameOptionType) => {
  const data: GameDataType[] = JSON.parse(JSON.stringify(game_data.data));
  const result: GameDataType[] = data.rowToCol().map((row: GameDataType) => {
    const merge: GameDataType = merge_row(row.reverse(), game_data);
    return merge.fill(game_data.size).reverse() as any as GameDataType;
  });
  if (game_data.data.toString() !== result.rowToCol().toString()) {
    game_data.data = result.rowToCol();
    add_point(game_data);
  } else {
    game_data.watchEffect = true;
  }
};

/**
 * 合并
 * @param game_data
 */
const merge_row = (rowData: GameDataType, game_data: GameOptionType) => {
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
          game_data.score = game_data.score + (first as number) + (second as number);
          result.push((first as number) + (second as number));
        } else {
          result.push(...item);
        }
      }
      return result;
    }, []);
    if (flag) {
      merge = merge_row(merge, game_data);
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
  const flatIndex = flatData.findIndexOf(0, randomIndex + 1); // 数组中的下标
  data[Math.floor(flatIndex / size)][flatIndex % size] = random;
  game_data.data = data;
};