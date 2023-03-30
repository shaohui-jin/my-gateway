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
