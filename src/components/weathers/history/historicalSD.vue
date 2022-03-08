<script lang="ts" setup>
import { defineProps, withDefaults, reactive, ref, watch } from 'vue';
// @ts-ignore
import SDLineChart from './charts/tempLineChart.vue';

type Props = {
    sd: {
        legend: Array<string>;
        value: Array<number>;
    };
    change: number;
};

const change = ref(0);

const props = withDefaults(defineProps<Props>(), {
    sd: () => ({
        legend: [],
        value: [],
    }),
    change: 0,
});

const options = reactive({
    title: {
        text: '湿度变化',
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: ['sd'],
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
        min: 0,
        max: 100,
    },
    series: [
        {
            name: '湿度',
            type: 'line',
            data: [0],
            smooth: true,
            tooltip: {
                 valueFormatter: function (value: number) {
                    return value + ' %';
                },
            }
        }
    ],
});

watch(
    () => props.change,
    () => {
        console.log(123);
        options.xAxis.data = props.sd.legend;
        options.series[0].data = props.sd.value;
        change.value++;
    }
);
</script>

<template>
    <div class="SDChartBox w-full h-full">
        <SDLineChart self-id="historical-SD" :change="change" :options="options" />
    </div>
</template>

<style lang="stylus" scoped></style>