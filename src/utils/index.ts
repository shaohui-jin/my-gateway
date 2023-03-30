import { globalComponents } from './globalComponents';
import { formatTime, formatNumber, setReactive } from './globalFunction';
import { App } from 'vue';

export function install(app: App) {
  globalComponents(app);
  app.config.globalProperties.$formatNumber = formatNumber;
  app.config.globalProperties.$formatTime = formatTime;
  app.config.globalProperties.$setReactive = setReactive;
}
