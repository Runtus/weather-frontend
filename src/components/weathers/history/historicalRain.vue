<script lang="ts" setup>
import { defineProps, withDefaults, reactive, ref, watch } from 'vue';
import { useLocationSearchResult } from '@/store/search';
// @ts-ignore
import WeatherMixChart from '@/components/weathers/Common/WeatherMixChart.vue';

const citySearch = useLocationSearchResult();

const change = ref(0);
type Props = {
    rain: {
        legend: string[];
        rain_days: number[];
        pcpn: number[];
    };
};

// 复杂类型声明
const props = withDefaults(defineProps<Props>(), {
    rain: () => ({
        legend: [],
        rain_days: [],
        pcpn: [],
    }),
    change: 0,
});

const options = reactive({
    title: {
        text: `${citySearch.location}市年度降水量统计`,
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999',
            },
        },
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true },
        },
    },
    legend: {
        data: ['降雨量', '降雨天数'],
    },
    xAxis: [
        {
            type: 'category',
            data: [''],
            axisPointer: {
                type: 'shadow',
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
            name: '降雨量',
            min: 0,
            max: 6000,
            interval: 2000,
            axisLabel: {
                formatter: '+{value} mm',
            },
        },
        {
            type: 'value',
            name: '降雨天数',
            min: 0,
            max: 40,
            interval: 10,
            axisLabel: {
                formatter: '{value} 天',
            },
        },
    ],
    series: [
        {
            name: '降雨量',
            type: 'line',
            tooltip: {
                valueFormatter: function (value: number) {
                    return value + ' mm';
                },
            },
            data: [0],
        },
        {
            name: '降雨天数',
            type: 'bar',
            yAxisIndex: 1,
            tooltip: {
                valueFormatter: function (value: number) {
                    return value + ' 天';
                },
            },
            data: [0],
        },
    ],
});

watch(
    () => props.rain,
    () => {
        options.xAxis[0].data = props.rain.legend;
        options.series[0].data = props.rain.pcpn;
        options.series[1].data = props.rain.rain_days;
        options.title.text = `${citySearch.location}市年度降水量统计`;
        change.value++;
    }
);
</script>

<template>
    <div class="rainChartBox w-full h-full bg-gray-100 rounded-xl">
        <WeatherMixChart self-id="historical-rains" :options="options" :change="change" />
    </div>
</template>

<style lang="stylus" scoped>
.rainChartBox {
    padding: 24px;
}
</style>
