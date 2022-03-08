<script lang="ts" setup>
import { defineProps, withDefaults, reactive, watch, ref } from 'vue';
// @ts-ignore
import TempLineChart from './charts/tempLineChart.vue';

type Props = {
    monthTemp: {
        legend: Array<string>;
        minTmp: Array<number>;
        maxTmp: Array<number>;
        avgTmp: Array<number>;
    };
};

const props = withDefaults(defineProps<Props>(), {
    monthTemp: () => ({
        legend: [],
        minTmp: [],
        maxTmp: [],
        avgTmp: [],
    }),
});

const change = ref(0);

const options = reactive({
        title: {
        text: '历史一年月度气温统计表',
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: ['maxTemp', 'minTemp', 'avgTemp'],
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    toolbox: {
        feature: {
            saveAsImage: {},
        },
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        name: '日期',
        data: ['0'],
    },
    yAxis: {
        type: 'value',
        min: -25,
        max: 25,
    },
    series: [
        {
            name: '最高温度',
            type: 'line',
            data: [0],
        },
        {
            name: '最低温度',
            type: 'line',
            data: [0],
        },
        {
            name: '平均温度',
            type: 'line',
            data: [0],
        },
    ],
});

watch(
    () => props.monthTemp,
    () => {
        // console.log(Math.max(...props.monthTemp.maxTmp))
        options.xAxis.data = props.monthTemp.legend;
        options.yAxis.max = Math.max(...props.monthTemp.maxTmp) + 5;
        options.yAxis.min = Math.min(...props.monthTemp.minTmp) - 5;
        options.series[0].data = props.monthTemp.maxTmp;
        options.series[1].data = props.monthTemp.avgTmp;
        options.series[2].data = props.monthTemp.minTmp;
        change.value++;
    }
);
</script>

<template>
    <div class="tempMonthChartBox w-full h-full">
        <TempLineChart self-id="Historical-month-temp" :options="options" :change="change" />
    </div>
</template>

<style lang="stylus" scoped></style>