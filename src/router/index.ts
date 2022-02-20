import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';

// 注意，vite已经不默认忽略.vue后缀名
const WorldMap = () => import('@/pages/WorldMap.vue');
const Weather = () => import('@/pages/WeatherPre.vue');

// const RealTime = () => import('@/')

const routes: RouteRecordRaw[] = [
    { path: '/', component: WorldMap },
    { path: '/weather', component: Weather },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
