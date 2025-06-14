import Collapse from '@/components/Collapse/index.vue';
import LineData from '@/components/LineData/index.vue';
import { App } from 'vue';

export function globalComponents(app: App) {
  // app.component('CoverPicture', coverPicture);
  // app.component('Cover', cover);
  // app.component('CoverBox', coverBox);
  // app.component('TitleTop', titleTop);
  // app.component('Radio', radio);
  // app.component('SearchCover', searchCover);
  // app.component('Skeleton1', skeleton1);
  app.component('sla-collapse', Collapse);
  app.component('sla-line-data', LineData);
}
