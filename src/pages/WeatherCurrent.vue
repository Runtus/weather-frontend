<script lang="ts" setup>
// 当前天气以及天气预报
import { reactive, watch, ref } from 'vue';
// TODO vscode插件bug，在setup语法糖中使用hook会导致插件识别export失败
// @ts-ignore
import WeatherCurrentCard from '@/components/weathers/Common/WeatherCityCards.vue';
// @ts-ignore
import WeatherCard from '@/components/weathers/Common/Card.vue';
// @ts-ignore
import WeatherPre from '@/components/weathers/current/LocalPreWeather.vue';
// @ts-ignore
import WeatherPM25 from '@/components/weathers/current/LocalPM25.vue';
// @ts-ignore
import LocationSearch from '@/components/GPSPosition.vue';
import { useLocationSearchResult } from '@/store/search';
import { useRoute, useRouter } from 'vue-router';
import { onMounted } from 'vue-demi';
import { requestCurrentWeather, CurrentWeather as CWeather } from '@/axios/weatherCurrent';

const routes = useRoute();
const router = useRouter();

const locationSearch = useLocationSearchResult();

const isLoading = ref(false);

const data = reactive<{
    current: CWeather['current'];
    observer24: Array<{
        time: string;
        weather: string;
        temp: string;
    }>;
    air: CWeather['air'];
}>({
    current: {
        obsTime: '', // 数据观测时间
        temp: '', // 温度 -> 摄氏度
        feelsLike: '', // 体感温度 -> 摄氏度
        icon: '',
        text: '', // 天气状况文字描述
        wind360: '', // 风向360角度
        windDir: '', // 风向
        windScale: '', // 风向等级
        windSpeed: '', // 风速
        humidity: '', // 相对湿度
        precip: '', // 小时累计降水量 -> 毫米
        pressure: '', //  大气压强 -> 百帕
        vis: '', // 能见度
        dew: '', // 露点温度
        cloud: '', // 露点温度
    },
    observer24: [],
    air: {
        pubTime: '', // 发布时间
        aqi: '', // 空气质量指数
        level: '', // 空气质量指数等级s
        primary: '', // 空气主要污染物
        pm10: '',
        pm2p5: '',
        no2: '',
        so2: '',
        co: '',
        o3: '',
    },
});

function request() {
    isLoading.value = true;
    const location = locationSearch.location;
    if (location) {
        requestCurrentWeather(location)
            .then(res => {
                if (res.code === '1') {
                    // TODO 页面渲染为404
                    console.log('无数据，404');
                } else {
                    const response = res.data;
                    data.current = response.current;
                    data.observer24 = response.observer24.map(item => ({
                        time: item.hour,
                        weather: item.rain,
                        temp: item.temp,
                    }));
                    data.air = response.air;
                }
            })
            .finally(() => {
                isLoading.value = false;
            });
    }
}

watch(
    () => locationSearch.location,
    () => {
        request();
    }
);

onMounted(() => {
    request();
});
</script>

<template>
    <div class="WeatherCurrent w-3/4 flex flex-col mx-auto pb-12">
        <div class="currentCardBox mt-4 w-full flex items-center justify-between">
            <WeatherCurrentCard />
            <WeatherPM25 :air="data.air" />
        </div>
        <div class="currentChartBox w-full mt-4">
            <WeatherPre :data="data.observer24" />
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.WeatherCurrent {

    .currentChartBox {
        height: 500px;
        min-width: 1140px
    }

    .currentCardBox {
        height: 500px;
        min-width: 1140px;
    }
}
</style>
