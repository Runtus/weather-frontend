import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';

// 注意，vite已经不默认忽略.vue后缀名
const WorldMap = () => import('@/pages/WorldMap.vue');
const WeatherCurrent = () => import('@/pages/WeatherCurrent.vue');
const WeatherPre = () => import('@/pages/WeatherPre.vue');
const WeatherHistory = () => import('@/pages/WeatherHistory.vue');

// const RealTime = () => import('@/')

const routes: RouteRecordRaw[] = [
    { path: '/', component: WorldMap },
    { path: '/weather', component: WeatherCurrent },
    { path: '/weather-pre', component: WeatherPre },
    { path: '/weather-history', component: WeatherHistory },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
