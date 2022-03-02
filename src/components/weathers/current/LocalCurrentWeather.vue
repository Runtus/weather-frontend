<script lang="ts" setup>
// 实时天气展示板块
import { defineProps, withDefaults } from 'vue';
import { current } from '@/utils/time';
import { WeatherKeys } from '@/types/weather';

// 如果外部引入类型会有bug，issue_url:[https://github.com/vuejs/core/issues/4294]
type NowWeather = {
    wind: string;
    sd: string; // 相对湿度
    temp: string;
    water: string; // 降水量
    weather: string; // 后续有增加在这里增加
    comment: string; // 当地天气评价
};


const props = withDefaults(defineProps<NowWeather>(), {
    wind: '14级北风',
    sd: '50%',
    temp: '2',
    water: '0',
    weather: '晴',
    comment: '今天白天阴，夜晚有小雨，温度和昨天差不多，现在6°，有风，空气不错。',
});

// 需要渲染的天气属性
const Weather_attrs: Array<{
    key: WeatherKeys;
    name: string;
}> = [
    {
        key: 'sd',
        name: '相对湿度',
    },
    {
        key: 'temp',
        name: '体感温度',
    },
    {
        key: 'water',
        name: '降水量',
    },
];

const current_time = current('min');
</script>

<template>
    <div class="current-weather-box h-full flex flex-col justify-end">
        <div class="current-total flex flex-col justify-around h-1/2 px-12">
            <div class="current-live flex justify-center">
                <!-- TODO 先mock -->
                <i class="qi-overcast"></i>
                <span class="temp ml-4 font-medium">{{ props.temp }}°</span>
            </div>
            <p class="weather-desc">{{ props.comment }}</p>
        </div>
        <div class="current-detail flex items-center justify-around h-1/3 px-12">
            <div class="w-full h-2/3 w-2/3 flex justify-around items-center bg-gray-300 bg-opacity-50 rounded-xl">
                <div class="item h-full flex flex-col justify-center" v-for="attr in Weather_attrs" :key="attr.key">
                    <span>
                        {{ props[attr.key] }}
                    </span>
                    <span>
                        {{ attr.name }}
                    </span>
                </div>
            </div>
        </div>
    </div>
    <p class="absolute time font-xs text-gray-400">
        {{ current_time }}
    </p>
</template>

<style lang="stylus" scoped>
.current-weather-box {

}

// TODO 后续会删除
.current-total {
    .current-live {
        font-size: 40px;
    }
}

.time {
    top: 1rem;
    right: 1rem;;
}
</style>
