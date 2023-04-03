export * from './common';

/**
 * 主题 THEME 枚举定义
 * @param PRIMARY primary
 * @param WARNING warning
 * @param DANGER danger
 * @param SUCCESS success
 * @param INFO info
 * @param GREENSEA greensea
 * @param NEPHRITE nephrite
 * @param BELIZEHOLE belizehole
 * @param WISTERIA wisteria
 * @param ASPHALT asphalt
 * @param ORANGE orange
 * @param PUMPKIN pumpkin
 * @param POMEGRANATE pomegranate
 * @param CLOUDS clouds
 * @param ASBESTOS asbestos
 */
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

/**
 * 布局模式 MODE 枚举定义
 * @param FULL full 子节点动态分布在根节点两侧 [默认值]
 * @param SIDE side 子节点只分布在根节点右侧
 */
export enum MODE {
  FULL = 'full',
  SIDE = 'side',
}

/**
 * 日志级别 LOGLEVEL 枚举定义
 * @param DEBUG debug
 * @param INFO info
 * @param WARN warn
 * @param ERROR error
 * @param DISABLE disable
 */
export enum LOGLEVEL {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
  DISABLE = 'disable',
}

export const LogLevelOption = [
  { label: 'DEBUG', value: LOGLEVEL.DEBUG },
  { label: 'INFO', value: LOGLEVEL.INFO },
  { label: 'WARN', value: LOGLEVEL.WARN },
  { label: 'ERROR', value: LOGLEVEL.ERROR },
  { label: 'DISABLE', value: LOGLEVEL.DISABLE },
];
/**
 * 基本信息
 * @param name {string} 名称
 * @param author {string} 姓名
 * @param version {string} 作品版本
 */
export interface Meta {
  name: string;
  author: string;
  version: string;
}

/**
 * @param container {string} 容器的ID
 * @param editable {boolean | false} 是否启用编辑
 * @param theme {@link THEME} 主题
 * @param mode {@link MODE} 布局模式
 * @param support_html {boolean | true} 是否支持节点里的HTML元素
 * @param log_level {@link LOGLEVEL} 日志级别
 */
export interface Options {
  container: string;
  editable: boolean | false;
  theme: THEME;
  mode: MODE;
  support_html: boolean | true;
  log_level: LOGLEVEL;
  view: View;
  layout: object;
  shortcut: object;
}

/**
 * 绘制引擎 ENGINE 枚举定义
 * @param CANVAS  canvas
 * @param SVG  svg
 */
export enum ENGINE {
  CANVAS = 'canvas',
  SVG = 'svg',
}

export const EngineOption = [
  { label: 'CANVAS', value: ENGINE.CANVAS },
  { label: 'SVG', value: ENGINE.SVG },
];

/**
 * 节点文本过长时的样式 NODEOVERFLOW 枚举定义
 * @param HIDDEN  hidden
 * @param WRAP  wrap
 */
export enum NODE_OVERFLOW {
  HIDDEN = 'hidden',
  WRAP = 'wrap',
}

export const NodeOverflowOption = [
  { label: 'HIDDEN', value: NODE_OVERFLOW.HIDDEN },
  { label: 'WRAP', value: NODE_OVERFLOW.WRAP },
];

/**
 * @param engine {@link ENGINE} 思维导图各节点之间线条的绘制引擎
 * @param hmargin {number} 思维导图距容器外框的最小水平距离（像素）
 * @param vmargin {number} 思维导图距容器外框的最小垂直距离（像素）
 * @param line_width {number} 思维导图线条的粗细（像素）
 * @param line_color {string} 思维导图线条的颜色（html的颜色表示方法）
 * @param draggable {boolean | true} 当容器不能完全容纳思维导图时，是否允许拖动画布代替鼠标滚动
 * @param hide_scrollbars_when_draggable {boolean | true} 当设置 draggable = true 时，是否隐藏滚动条
 * @param node_overflow {@link NODE_OVERFLOW} 节点文本过长时的样式
 */
export interface View {
  engine: ENGINE;
  hmargin: number;
  vmargin: number;
  line_width: number;
  line_color: string;
  draggable: boolean | true;
  hide_scrollbars_when_draggable: boolean | true;
  node_overflow: NODE_OVERFLOW;
}
