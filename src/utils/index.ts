import { globalComponents } from './globalComponents';
import { formatTime, formatNumber, setReactive } from './globalFunction';
import service from '../service';
import { App } from 'vue';

export function install(app: App) {
  globalComponents(app);
  app.config.globalProperties.$get = service.get;
  app.config.globalProperties.$post = service.post;
  app.config.globalProperties.$formatNumber = formatNumber;
  app.config.globalProperties.$formatTime = formatTime;
  app.config.globalProperties.$setReactive = setReactive;
}
