/**
 * @description 处理时间
 * @param {Date | number} times 时间
 * @return 年-月-日 时:分:秒
 */
export function formatTime(times: Date | number) {
  const date = new Date(times);
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // 月份
  const day = date.getDate(); // 日
  const hour = () => (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());

  const minute = () => (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
  const second = () => (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
  return year + '-' + month + '-' + day + ' ' + hour() + ':' + minute() + ':' + second();
}

/**
 * @description 数字处理
 * @param {number} val 数值
 * @return {string} 处理后的文本
 */
export function formatNumber(val: number) {
  let num: string;
  if (val > 99999999) {
    num = Math.round(Math.floor(val / 100000000)) + '亿';
  } else if (val > 9999) {
    num = Math.round(Math.floor(val / 10000)) + '万';
  } else {
    num = val.toString();
  }
  return num;
}

/**
 * @description reactive的赋值
 * @param {object} target 目标数据
 * @param {object} data 数据源
 * @param {string[]} arr 修改的字段
 */
export function setReactive(target: any, data: any, arr: string[] = []) {
  const keys = arr.length === 0 ? Object.keys(data) : arr;
  keys.forEach((key: string) => {
    target[key] = data[key];
  });
}