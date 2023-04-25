// 初始化配置
export interface GameOptionType {
  size: number; // 尺寸
  data: GameDataType[]; // 游戏数据
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
