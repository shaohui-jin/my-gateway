export interface Header {
  key: number; // 关键字
  title: string; // 标题
  onClick?: () => void; // 点击事件
}

export interface Meta {
  name: string;
  author: string;
  version: string;
}

export enum THEME {
  PRIMARY = 'primary',
  WARNING = 'warning',
  DANGER = 'danger',
  SUCCESS = 'success',
  INFO = 'info',
  GREENSEA = 'greensea',
  NEPHRITE = 'nephrite',
  BELIZEHOLE = 'belizehole',
  WISTERIA = 'wisteria',
  ASPHALT = 'asphalt',
  ORANGE = 'orange',
  PUMPKIN = 'pumpkin',
  POMEGRANATE = 'pomegranate',
  CLOUDS = 'clouds',
  ASBESTOS = 'asbestos',
}
export const ThemeOption = [
  { label: 'PRIMARY', value: THEME.PRIMARY },
  { label: 'WARNING', value: THEME.WARNING },
  { label: 'DANGER', value: THEME.DANGER },
  { label: 'SUCCESS', value: THEME.SUCCESS },
  { label: 'INFO', value: THEME.INFO },
  { label: 'GREENSEA', value: THEME.GREENSEA },
  { label: 'NEPHRITE', value: THEME.NEPHRITE },
  { label: 'BELIZEHOLE', value: THEME.BELIZEHOLE },
  { label: 'WISTERIA', value: THEME.WISTERIA },
  { label: 'ASPHALT', value: THEME.ASPHALT },
  { label: 'ORANGE', value: THEME.ORANGE },
  { label: 'PUMPKIN', value: THEME.PUMPKIN },
  { label: 'POMEGRANATE', value: THEME.POMEGRANATE },
  { label: 'CLOUDS', value: THEME.CLOUDS },
  { label: 'ASBESTOS', value: THEME.ASBESTOS },
];
export enum MODE {
  FULL = 'full', // 子节点动态分布在根节点两侧 [默认值]
  SIDE = 'side', // 子节点只分布在根节点右侧
}

export enum LOGLEVEL {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DISABLE = 'disable',
}
export interface Options {
  container: string; // [必选] 容器的ID
  editable: boolean | false; // 是否启用编辑
  theme: THEME; // 主题
  mode: MODE; // 布局模式
  support_html: boolean | true; // 是否支持节点里的HTML元素
  log_level: LOGLEVEL; // 日志级别
  view: object;
  layout: object;
  shortcut: object;
}
