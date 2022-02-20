import { createApp } from 'vue';
import App from './App.vue';
// Echarts 核心模块引入
// import * as echarts from 'echarts/core'
import { router } from '@/router';
import { pinia } from './store/index';
import './global.css';
import 'qweather-icons/font/qweather-icons.css';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
