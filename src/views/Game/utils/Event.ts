import { Direction, OperateType } from '../interface';

const delegateEvent = (layer: OperateType) => {
  if (typeof document !== 'undefined' && document.addEventListener) {
    document.addEventListener('keydown', (event: KeyboardEvent) => {
      const { keyCode } = event;
      const directions = [Direction.LEFT, Direction.UP, Direction.RIGHT, Direction.DOWN];
      const direction = directions[keyCode - 37];
      console.log(direction);
      if (direction) {
        // 自定义触发事件
        // layer.dispatchEvent('step', { direction }, true, true);
        layer[direction]();
      }
    });
    let startX: number, startY: number; // 初始位置
    const precision = 10; // 最低偏移量
    // 移动端的手势
    document.addEventListener('touchstart', (event: TouchEvent) => {
      startX = event.targetTouches[0].clientX;
      startY = event.targetTouches[0].clientY;
    });
    document.addEventListener('touchend', (event: TouchEvent) => {
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
    });
    document.documentElement.addEventListener('touchmove', (event: TouchEvent) => event.preventDefault(), { passive: false });
  }
};

export default delegateEvent;
