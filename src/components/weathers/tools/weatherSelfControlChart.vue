<script lang="ts" setup>
import { defineProps, onMounted, reactive, withDefaults, watchEffect, watch } from 'vue';
import { useToolsDataStore, useDateRange } from '@/store/weatherTools';
import { PreWeather30 } from '@/axios/weatherPre';
import { defalutOptions, rangeSetting } from './utils/defaultValue';
import { preWeatherYData, currentWeatherYData, historicalWeather, historicalXAxias } from './utils/series';
import { rangeSettingOption } from './utils/yRange';
import * as echarts from 'echarts/core';
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { throttling } from '@/utils/throttling';
import { CurrentWeather } from '@/axios/weatherCurrent';
import { HistoricalTemp, HistoricalWeather } from '@/axios/weatherHistory';

echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer, UniversalTransition]);

type OptionSeriesItem = {
    name: string;
    type: 'line';
    data: Array<number>;
    tooltip?: {
        valueFormatter: (value: any) => string;
    };
};

let eChartObject: echarts.ECharts;

const props = withDefaults(
    defineProps<{
        selfId: string;
        weatherType: 'pre' | 'cur' | 'h-month' | 'h-date';
        postion: Array<string>;
        date: string;
        weatherAttr: string;
    }>(),
    {
        selfId: 'default',
    }
);

const render_data = useToolsDataStore();
const date_range = useDateRange();

const options = reactive({
    value: {
        title: {
            text: 'Stacked Line',
        },
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine'],
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
                restore: { show: true },
            },
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
            min: -25,
            max: 25,
        },
        series: [
            {
                name: 'Email',
                type: 'line',
                data: [0],
            },
            {
                name: 'Union Ads',
                type: 'line',
                data: [0],
            },
            {
                name: 'Video Ads',
                type: 'line',
                data: [0],
            },
            {
                name: 'Direct',
                type: 'line',
                data: [0],
            },
            {
                name: 'Search Engine',
                type: 'line',
                data: [0],
            },
        ],
    },
});

const render = () => {
    if (eChartObject) {
        console.log(options.value);
        eChartObject.setOption(options.value);
    }
};


watch(
    () => [render_data.value.length, props.date, props.weatherAttr],
    () => {
        if (render_data.value.length === 0) {
            // 重制
            options.value = defalutOptions;
            return;
        }
        let beginStorage: string = '2000-01-01', endStorage: string = '2022-12-31';
        const legend: Array<string> = [...props.postion.map(item => JSON.parse(item).name)];
        const yOptions = rangeSettingOption(props.weatherAttr);
        // weather-pre的情况 先考虑多线条的情况
        if (props.weatherType === 'pre') {
            const date = props.date.split(',');
            const begin = new Date(date[0]), end = new Date(date[1]);
            const xAxis: Array<Array<string>> = [];
            const series: Array<OptionSeriesItem> = [];
            (render_data.value as Array<{ key: string; data: PreWeather30 }>).forEach(item => {
                const name = item.key;
                const x: Array<string> = [];
                const y: OptionSeriesItem = {
                    name,
                    type: 'line',
                    data: [],
                };
                // 日历日期备份
                beginStorage = new Date().getFullYear + '-' + item.data[0].date;
                endStorage = new Date().getFullYear + '-' + item.data[item.data.length - 1].date;
                item.data.forEach(weather => {
                    const orderDate = new Date(weather.date).getTime();
                    // 在规定时间范围内才能够算
                    if(orderDate >= begin.getTime() && orderDate <= end.getTime()){
                        const dateArray = weather.date.split('-');
                        const date = `${dateArray[1]}-${dateArray[2]}`;
                        x.push(date);
                    }
                });
                y.data = [...preWeatherYData(props.weatherAttr as 'temp' | 'sd' | 'rain', item.data)];
                xAxis.push(x);
                series.push(y);
            });
            // TODO: 不存在多x轴情况，这里需要将xAxis的生成进行优化
            options.value.xAxis.data = [...xAxis[0]];
            options.value.series = [...series];
        } else if (props.weatherType === 'cur') {
            let xAxis: Array<string> = [];
            const series: Array<OptionSeriesItem> = [];
            (render_data.value as Array<{ key: string; data: CurrentWeather }>).forEach(item => {
                const x: Array<string> = [];
                const y: OptionSeriesItem = {
                    name: item.key,
                    type: 'line',
                    data: [],
                };
                item.data.observer24.forEach(item => {
                    x.push(item.hour);
                });
                y.data = [...currentWeatherYData(props.weatherAttr as 'temp' | 'sd' | 'rain' | 'aqi' , item.data)]
                xAxis = [...x];
                series.push(y);
            });
            options.value.xAxis.data = [...xAxis];
            options.value.series = [...series];
        } else if (props.weatherType === 'h-date') {
            // 气温选择
            let xAxis: Array<string> = [];
            const series: Array<OptionSeriesItem> = [];
            (render_data.value as Array<{ key: string; data: HistoricalTemp }>).forEach(item => {
                const x: Array<string> = [...item.data.legend];
                const y: OptionSeriesItem = {
                    name: item.key,
                    type: 'line',
                    data: item.data.avgTmp.map(item => Number(item)),
                };
                xAxis = [...x];
                series.push(y);
            });
            options.value.xAxis.data = [...xAxis];
            options.value.series = [...series];
        } else if (props.weatherType === 'h-month') {
            let xAxis: Array<string> = [];
            const date = props.date.split(',');
            const begin = date[0].split('-'), end = date[1].split('-');
            const beginYM = new Date(`${begin[0]}-${begin[1]}`);
            const endYM = new Date(`${end[0]}-${end[1]}`);
            const serirs: Array<OptionSeriesItem> = [];
            (render_data.value as Array<{ key: string; data: HistoricalWeather }>).forEach(item => {
                const x: Array<string> = [...historicalXAxias(props.weatherAttr as 'temp' | 'sd' | 'rain' | 'aqi', item.data, beginYM, endYM)];
                const y: OptionSeriesItem = {
                    name: item.key,
                    type: 'line',
                    data: []
                };
                beginStorage = item.data.rain.legend[0];
                endStorage = item.data.rain.legend[item.data.rain.legend.length - 1];

                y.data = [...historicalWeather(props.weatherAttr as 'temp' | 'sd' | 'rain' | 'aqi', item.data)]
                xAxis = [...x];
                serirs.push(y);
            });
            options.value.xAxis.data = [...xAxis];
            options.value.series = [...serirs];
        }

        options.value.legend.data = legend;
        options.value.yAxis = yOptions;
        // data_range Setting
        date_range.set(beginStorage, endStorage);
        render();
    }
);

onMounted(() => {
    const dom = document.getElementById(props.selfId) as HTMLElement;
    const myChart = echarts.init(dom);
    eChartObject = myChart;
    window.onresize = throttling(() => {
        myChart.resize();
    }, 16);
});
</script>

<template>
    <div class="w-full toolsChart" :id="props.selfId"></div>
</template>

<style lang="stylus" scoped>
.toolsChart {
    height: 800px;
}
</style>
