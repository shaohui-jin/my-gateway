import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/common.css';
import { install } from '@/utils';
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import 'element-plus/dist/index.css';

createApp(App).use(store).use(router).use(ElementPlus, { locale: zhCn }).use(install).mount('#app');
