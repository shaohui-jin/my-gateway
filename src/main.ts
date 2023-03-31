import { createApp } from 'vue';
import ElementPlus from 'element-plus';
import App from './App.vue';
import router from './router';
import store from './store';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { install } from '@/utils';
import 'element-plus/dist/index.css';
import '@/assets/css/common.css';

createApp(App).use(store).use(router).use(ElementPlus, { locale: zhCn }).use(install).mount('#app');
