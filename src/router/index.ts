import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router';

// 注意，vite已经不默认忽略.vue后缀名
const WorldMap = () => import('@/pages/WorldMap.vue');
const WeatherCurrent = () => import('@/pages/WeatherCurrent.vue');
const WeatherPre = () => import('@/pages/WeatherPre.vue');
const WeatherHistory = () => import('@/pages/WeatherHistory.vue');
const WeatherTools = () => import('@/pages/WeatherTools.vue');

// const RealTime = () => import('@/')

const routes: RouteRecordRaw[] = [
    {
        path: '/worldMap',
        component: WorldMap,
    },
    {
        path: '/current',
        component: WeatherCurrent,
    },
    {
        path: '/pre',
        component: WeatherPre,
    },
    {
        path: '/historical',
        component: WeatherHistory,
    },
    {
        path: '/tools',
        component: WeatherTools,
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
