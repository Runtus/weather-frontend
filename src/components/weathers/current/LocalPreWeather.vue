<script lang="ts" setup>
// 未来24小时的天气预报
import { defineProps, withDefaults, reactive, onMounted, ref, watch } from 'vue';
// @ts-ignore
import WeatherLineChart from '@/components/weathers/Common/WeatherLineChart.vue';

type Previews = {
    data: Array<{
        time: string;
        weather: string;
        temp: string;
    }>;
};

const props = withDefaults(defineProps<Previews>(), {});
const changeKey = ref(1);

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

const chartsDataSet = () => {
    const xAxis: Array<string> = [];
    const yAxis: Array<number> = [];
    for (let i = 0; i < props.data.length; i += 3) {
        xAxis.push(props.data[i].time);
        yAxis.push(Number(props.data[i].temp));
    }

    options.xAxis.data = xAxis;
    options.series[0].data = yAxis;
    changeKey.value++;
};

watch(
    () => props.data,
    () => {
        chartsDataSet();
    }
);
</script>

<template>
    <div id="weatherPre24" class="weatherInfo w-full h-full">
        <WeatherLineChart self-id="pre-24" :options="options" :change="changeKey" />
    </div>
</template>

<style scoped lang="stylus">
.weatherInfo {

}
</style>
