/**
 * 数组分组
 * @param size
 */
Array.prototype.groupBy = function (size: number) {
  const result: number[][] = [];
  // const length = this.length; // 当前数组长度
  this.forEach((item: any, index) => {
    const rIndex = Math.floor(index / size); // 填充句句的数组下标
    const isFull = index % size === 0; // 等于零的话 代表前面分组装满了 或者是刚初始化
    if (isFull) {
      result.push([]);
    }
    result[rIndex].push(item);
  });
  return result;
};

/**
 * 相邻数据分组
 */
Array.prototype.groupByAdjoinSameData = function () {
  let reduceIndex = 0;
  const resultArray: number[][] = this.reduce((result, item, index, array) => {
    const nextIndex = index + 1;
    // 每次处理都会调整reduceIndex，防止重复处理数据
    if (index === reduceIndex) {
      // 防止最后两位合并后 reduceIndex 大于数组长度
      if (nextIndex <= array.length && item === array[nextIndex]) {
        result.push([item, array[nextIndex]]);
        reduceIndex += 2;
      } else {
        result.push([item]);
        reduceIndex += 1;
      }
    }
    return result;
  }, []);
  return resultArray;
};

/**
 * 数组填充
 * @param size
 */
Array.prototype.fill = function (size: number) {
  const data = JSON.parse(JSON.stringify(this));
  const length = this.length;
  for (let i = 0; i < size; i++) {
    if (i >= length) {
      data.push(0);
    }
  }
  return data;
};

/**
 * 数组横纵翻转
 */
Array.prototype.rowToCol = function () {
  const result: number[][] = [];
  this.forEach((r: number[]) => {
    r.forEach((c, cI) => {
      if (cI === result.length) {
        result.push([]);
      }
      result[cI].push(c);
    });
  });
  return result;
};

/**
 * 数组 findIndex 拓展
 */
Array.prototype.findIndexOf = function (key: number, num: number) {
  // 判断num是否数组越界
  const filterData = this.filter((e: number) => e === key);
  if (num > filterData.length) {
    throw new Error(`the array has not ${num} ${key}`);
  }
  const index = this.join('-')
    .split(`${key}`)
    .slice(0, num)
    .reduce((result, item) => {
      const itemLength = item.split('-').filter(e => e !== '').length;
      result += itemLength;
      return result;
    }, 0);
  return index + (num - 1);
};
