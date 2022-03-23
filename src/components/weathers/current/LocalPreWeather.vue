<script lang="ts" setup>
// 未来24小时的天气预报
import { defineProps, withDefaults, reactive, onMounted, ref, watch } from 'vue';
// @ts-ignore
import WeatherLineChart from './charts/tempLineChart.vue';

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
    title: {
        text: '温度日变化趋势',
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {},
    toolbox: {
        show: true,
        feature: {
            restore: {},
            saveAsImage: {},
        },
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '时分',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} °C',
        },
    },
    series: [
        {
            name: '温度',
            type: 'line',
            data: [10, 11, 13, 11, 12, 12, 9],
            tooltip: {
                valueFormatter: function (value: number) {
                    return `${value} °C`;
                },
            },
            //   markPoint: {
            //     data: [
            //       { type: 'max', name: 'Max' },
            //       { type: 'min', name: 'Min' }
            //     ]
            //   },
            markLine: {
                data: [{ type: 'average', name: 'Avg' }],
            },
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
    <div class="bg-gray-100 weatherInfo w-full h-full p-4 rounded-xl">
        <WeatherLineChart self-id="pre-24" :options="options" :change="changeKey" />
    </div>
</template>

<style scoped lang="stylus">
.weatherInfo {

}
</style>
