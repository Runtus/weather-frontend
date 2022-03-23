<script lang="ts" setup>
// 实时天气展示板块
import { ref, reactive, onMounted, watch } from 'vue';
import {} from '@/store/weather';
import { current } from '@/utils/time';
import { fetchCurrentCardData, CurrentWeather } from '@/axios/weatherCurrent';
import { useLocationSearchResult } from '@/store/search';
import { WeatherKeys } from '@/types/weather';

const searchCity = useLocationSearchResult();
const weather = reactive<{
    value: CurrentWeather['current'];
}>({
    // @ts-ignore
    value: {},
});

const backgroundStyle = ref('');
// 如果外部引入类型会有bug，issue_url:[https://github.com/vuejs/core/issues/4294]
type NowWeather = {
    wind: string;
    sd: string; // 相对湿度
    temp: string;
    water: string; // 降水量
    weather: string; // 后续有增加在这里增加
    comment: string; // 当地天气评价
};

const background_setting: {
    [key: string]: {
        backgroundUrl: string;
    };
} = {
    晴天: {
        backgroundUrl: 'linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb)',
    },
    other: {
        backgroundUrl: 'url(https://lao-lan-go.oss-cn-beijing.aliyuncs.com/weather/cloudy--day.png)',
    },
};

// 需要渲染的天气属性
const Weather_attrs: Array<{
    key: WeatherKeys;
    name: string;
    icon: number;
    symbol: string;
    background: string;
}> = [
    {
        key: 'precip',
        name: '降水',
        icon: 305,
        symbol: 'mm',
        background: 'linear-gradient(225deg, #BCF1FF, #BCD6FF 55%, #DDBCFF)',
    },
    {
        key: 'cloud',
        name: '云层',
        icon: 151,
        symbol: 'm',
        background: 'linear-gradient(225deg, #EFEFEF, #EFEFEF 55%, #D8D8D8)',
    },
];

const current_time = current('min');

const requestWeather = async () => {
    const request_weather = await fetchCurrentCardData(searchCity.location);
    if (request_weather.code === '0' && request_weather.data) {
        weather.value = request_weather.data;
        console.log(weather.value);

        if (weather.value.text === '晴') {
            backgroundStyle.value = background_setting['晴天'].backgroundUrl;
        } else {
            backgroundStyle.value = background_setting['other'].backgroundUrl;
        }
    }
};

watch(
    () => searchCity.location,
    () => {
        requestWeather();
    }
);

onMounted(() => {
    requestWeather();
});
</script>

<template>
    <div class="cityCards bg-gray-100 rounded-xl flex w-full flex-wrap justify-between" v-if="Object.keys(weather.value).length">
        <div :style="{ backgroundImage: backgroundStyle }" class="h-48 bg-gray-200 current-weather-box flex flex-col relative justify-center rounded-xl">
            <div class="text-2xl location flex justify-center">
                {{ searchCity.location }}
            </div>
            <div class="current-total flex flex-col justify-around px-12 mt-4">
                <div class="current-live flex justify-center items-center">
                    <!-- TODO 先mock -->
                    <i class="text-5xl" :class="'qi-' + weather.value.icon"></i>
                    <div class="ml-1 flex flex-col">
                        <span class="temp text-3xl">{{ weather.value.temp }}°</span>
                        <span class="weather-desc text-2xl">{{ weather.value.text }}</span>
                    </div>
                </div>
            </div>
            <p class="absolute time font-xs text-gray-400">
                {{ current_time }}
            </p>
        </div>
        <div
            class="rounded-xl weather-attrs flex flex-col items-center justify-center mt-6"
            v-for="item in Weather_attrs"
            :style="{ backgroundImage: item.background }"
            :key="item.key"
        >
            <div class="text-2xl">
                <i :class="'qi-' + item.icon"></i>
                <span class="weather-desc">
                    {{ item.name }}
                </span>
            </div>
            <div class="value mt-8 text-base">
                {{
                    // @ts-ignore
                    weather.value[item.key] + ' ' + item.symbol
                }}
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.cityCards {
    padding: 30px;
    width: 500px;
}

.current-weather-box {
    min-height: 200px;
    min-width: 440px;
    background-repeat: no-repeat;
    background-position: right top;
}

.weather-attrs {
    min-height: 200px;
    min-width: 200px;
}
// TODO 后续会删除
.current-total {

}

.time {
  top: 0.5rem;
  right: 0.5rem;
}
</style>
