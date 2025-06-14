import { globalComponents } from '@/utils/global/components';
import { globalPrototypes } from '@/utils/global/prototypes';
import { formatTime, formatNumber, setReactive } from './global/function';
import service from '../service';
import { App } from 'vue';

export function install(app: App) {
  globalComponents(app);
  globalPrototypes();
  app.config.globalProperties.$get = service.get;
  app.config.globalProperties.$post = service.post;
  app.config.globalProperties.$formatNumber = formatNumber;
  app.config.globalProperties.$formatTime = formatTime;
  app.config.globalProperties.$setReactive = setReactive;
}
