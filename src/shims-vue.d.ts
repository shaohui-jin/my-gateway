/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface Window {
  jsMind: any;
}

interface Array {
  groupBy(size: number): number[][];
  groupByAdjoinSameData(): number[][];
  fill(size: number): number[][];
  rowToCol(): number[][];
  findIndexOf(key: number, num: number): number;
}