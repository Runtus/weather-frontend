import { createApp } from 'vue';
import App from './App.vue';
import { router } from '@/router';
import { pinia } from './store/index';
import './global.css';
import 'qweather-icons/font/qweather-icons.css';

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
