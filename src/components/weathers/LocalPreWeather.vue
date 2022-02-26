<script lang="ts" setup>
// 未来24小时的天气预报
import { defineProps, withDefaults, reactive, toRefs } from 'vue';
// @ts-ignore
import WeatherLineChart from '@/components/weathers/Common/WeatherLineChart.vue';

type Previews = {
    data: Array<{
        time: string;
        weather: string;
        temp: number;
    }>;
};

const props = withDefaults(defineProps<Previews>(), {});

const options = reactive({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
    },
    series: [
        {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
        },
    ],
});

setTimeout(() => {
    options.series[0].data = [144, 155, 166, 177, 188, 199, 211];
    console.log('变化了');
}, 5000);
</script>

<template>
    <div id="weatherPre24" class="weatherInfo w-full h-full">
        <WeatherLineChart self-id="pre-24" :options="options" />
    </div>
</template>

<style scoped lang="stylus">
.weatherInfo {

}
</style>
