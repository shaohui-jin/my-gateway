import { Direction, OperateType } from '../interface';

let startX: number, startY: number; // 初始位置
const precision = 10; // 最低偏移量

const KeyDownEvent = (event: KeyboardEvent, layer: OperateType) => {
  const { keyCode } = event;
  const directions = [Direction.LEFT, Direction.UP, Direction.RIGHT, Direction.DOWN];
  const direction = directions[keyCode - 37];
  if (direction) {
    // 自定义触发事件
    // layer.dispatchEvent('step', { direction }, true, true);
    layer[direction]();
  }
};
const TouchStartEvent = (event: TouchEvent) => {
  startX = event.targetTouches[0].clientX;
  startY = event.targetTouches[0].clientY;
};
const TouchEndEvent = (event: TouchEvent, layer: OperateType) => {
  const { clientX: endX, clientY: endY } = event.changedTouches[0];
  const deltaX: number = Math.abs(endX - startX);
  const deltaY: number = Math.abs(endY - startY);
  let direction;
  if (deltaX > deltaY && deltaX > precision) {
    direction = endX > startX ? Direction.RIGHT : Direction.LEFT;
  }
  if (deltaY > deltaX && deltaY > precision) {
    direction = endY > startY ? Direction.DOWN : Direction.UP;
  }
  if (direction) {
    // layer.dispatchEvent('step', { direction }, true, true);
    layer[direction]();
  }
};

export const RegisterEvent = (layer: OperateType) => {
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('keydown', (event: KeyboardEvent) => KeyDownEvent(event, layer));

    document.addEventListener('touchstart', (event: TouchEvent) => TouchStartEvent(event));
    document.addEventListener('touchend', (event: TouchEvent) => TouchEndEvent(event, layer));
    document.documentElement.addEventListener('touchmove', (event: TouchEvent) => event.preventDefault(), { passive: false });
  }
};

export const UnRegisterEvent = (layer: OperateType) => {
  if (typeof document !== 'undefined' && document.removeEventListener) {
    console.log('jinlaile');
    document.removeEventListener('keydown', (event: KeyboardEvent) => KeyDownEvent(event, layer));
    document.removeEventListener('touchstart', (event: TouchEvent) => TouchStartEvent(event));
    document.removeEventListener('touchend', (event: TouchEvent) => TouchEndEvent(event, layer));
    document.documentElement.removeEventListener('touchmove', (event: TouchEvent) => event.preventDefault());
  }
};
