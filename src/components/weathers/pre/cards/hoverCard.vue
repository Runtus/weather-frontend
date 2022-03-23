<script lang="ts" setup>
import { defineProps, withDefaults, watch, ref, onMounted } from 'vue';
// @ts-ignore
import GaugeTemp from './components/GaugeTemp.vue';

type Props = {
    weatherPre: {
        date: string;
        text: string; // 描述天气情况 -> 晴天 / 雨天 / 大雾等等
        code: string; // 用于天气状态码
    };
};

const props = withDefaults(defineProps<Props>(), {
    weatherPre: () => ({
        date: '',
        text: '',
        code: '',
    }),
});

const styleRef = ref('');

// TODO 只是测试用
watch(
    () => props.weatherPre.date,
    () => {
        if (props.weatherPre.text === '晴') {
            styleRef.value = 'linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb)';
        } else {
            styleRef.value = 'url(https://lao-lan-go.oss-cn-beijing.aliyuncs.com/weather/cloudy--day.png)';
        }
    }
);

onMounted(() => {
    if (props.weatherPre.text === '晴') {
        styleRef.value = 'linear-gradient(225deg, #fee5ca, #e9f0ff 55%, #dce3fb)';
    } else {
        styleRef.value = 'url(https://lao-lan-go.oss-cn-beijing.aliyuncs.com/weather/cloudy--day.png)';
    }
});
</script>

<template>
    <div :style="{ backgroundImage: styleRef }" class="card h-full w-full flex flex-col items-center bg-gray-100 rounded-xl">
        <p class="date text-2xl font-medium">
            {{ props.weatherPre.date }}
        </p>
        <div class="weather-attrs">
            <div class="weather-desc flex items-center">
                <i class="text-3xl" :class="'qi-' + weatherPre.code"></i>
                <span class="desc text-3xl flex items-center">{{ weatherPre.text }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.card {
    padding: 24px;
    min-height: 150px;

    .weather-desc {

    }
}
</style>
