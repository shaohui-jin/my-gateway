// import coverPicture from '@/components/common/coverPicture.vue';
// import cover from '@/components/common/cover.vue';
// import coverBox from '@/components/common/coverBox.vue';
// import titleTop from '@/components/common/titleTop.vue';
// import radio from '@/components/common/radio.vue';
// import searchCover from '@/components/common/searchCover.vue';
// import skeleton1 from '@/components/skeleton1.vue';
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
