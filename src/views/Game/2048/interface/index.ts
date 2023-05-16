// 初始化配置
export interface GameOptionType {
  size: number; // 尺寸
  score: number; // 分数
  data: GameDataType[]; // 游戏数据
  watchEffect: boolean; // 检查数据是否游戏结束
}
// 游戏数据类型
export type GameData = number;
export type GameDataType = GameData[];
// 颜色数据类型
export type ColorDataType = Record<number | string, string[]>;

export type OperateType = Record<Direction, () => void>;
export enum Direction {
  LEFT = 'left',
  UP = 'up',
  RIGHT = 'right',
  DOWN = 'down',
}
