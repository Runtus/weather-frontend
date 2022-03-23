import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router';
import { pinia } from './store/index';
import './global.css';
// ant-design按需引入插件
// TODO 能否在vite.config中设置同时引入
import 'ant-design-vue/dist/antd.css';
import 'qweather-icons/font/qweather-icons.css';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
