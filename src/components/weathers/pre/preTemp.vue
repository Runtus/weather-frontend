<script lang="ts" setup>
// 温度的折线图，两侧有tab可选
// tab主要是：时段选择 ： 3day，7day，15day，30day
import { onMounted, reactive, ref } from 'vue';
import { usePreWeatherStore } from '@/store/weather';
import { useRoute } from 'vue-router';
// @ts-ignore
import WeatherMixChart from '@/components/weathers/Common/WeatherMixChart.vue';
import { Select } from 'ant-design-vue';
import { formatTime } from '@/utils/time';
import { SelectTypes } from 'ant-design-vue/es/select';
import { fetchPreWeather, PreWeather30, PreWeather30Item } from '@/axios/weatherPre';

const routes = useRoute();
// TODO 为了方便调试，地址默认使用北京
const DEFAULT_LOCATION = '北京';

const preWeatherStore = usePreWeatherStore();

const selectValue = ref('15');
const change = ref(0);

const chartsOptions = reactive({
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
        data: ['Rain', 'MaxTemp', 'MinTemp'],
    },
    xAxis: [
        {
            type: 'category',
            data: ['0'],
            axisPointer: {
                type: 'shadow',
            },
        },
    ],
    yAxis: [
        {
            type: 'value',
            name: '相对湿度',
            min: 0,
            max: 100,
            interval: 10,
            axisLabel: {
                formatter: '{value} %',
            },
        },
        {
            type: 'value',
            name: '温度',
            min: -25,
            max: 25,
            interval: 5,
            axisLabel: {
                formatter: '{value} °C',
            },
        },
    ],
    series: [
        {
            name: '相对湿度',
            type: 'bar',
            tooltip: {
                valueFormatter: function (value: number) {
                    return value + ' %';
                },
            },
            data: [2],
        },
        {
            name: '最高温度',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
                valueFormatter: function (value: number) {
                    return value + ' °C';
                },
            },
            data: [2],
        },
        {
            name: '最低温度',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
                valueFormatter: function (value: number) {
                    return value + ' °C';
                },
            },
            data: [2],
        },
    ],
});

const options: SelectTypes['options'] = [
    {
        value: '3',
        label: '3日天气',
    },
    {
        value: '7',
        label: '7日天气',
    },
    {
        value: '15',
        label: '15日天气',
    },
    {
        value: '30',
        label: '30日天气',
    },
];

const optionsSetting = (length: number) => {
    const temp = preWeatherStore.value.slice(0, length) as PreWeather30;
    const xData: string[] = [];
    const renderDataMaxTemp: number[] = [];
    const renderDataMinTemp: number[] = [];
    const renderDataRain: number[] = [];
    temp.forEach(item => {
        const { maxTmp, minTmp, date, hum } = item;
        renderDataMaxTemp.push(Number(maxTmp) || 0);
        renderDataMinTemp.push(Number(minTmp) || 0);
        renderDataRain.push(Number(hum) || 0);
        xData.push(formatTime(new Date(date), 'xx-xx'));
    });
    chartsOptions.xAxis[0].data = xData;
    chartsOptions.series[0].data = renderDataRain;
    chartsOptions.series[1].data = renderDataMaxTemp;
    chartsOptions.series[2].data = renderDataMinTemp;
    change.value++;
};

const onChange = (value: string) => {
    optionsSetting(Number(value));
    selectValue.value = value;
};

const fetchData = (location: string) => {
    fetchPreWeather(location)
        .then(res => {
            preWeatherStore.set(res.data);
            optionsSetting(Number(selectValue.value));
        })
        .catch(err => {
            preWeatherStore.set([]);
            console.log('请求天气预报数据失败');
            console.error(err);
        });
};

onMounted(() => {
    const location = (routes.query.location as string) || DEFAULT_LOCATION;
    fetchData(location);
});
</script>

<template>
    <div class="preTemp w-full h-full">
        <div class="select-box">
            <Select class="w-36" :options="options" @change="onChange" :defaultValue="selectValue" />
        </div>
        <div class="chartBox w-full h-5/6">
            <WeatherMixChart :options="chartsOptions" :change="change" self-id="preweather" />
        </div>
    </div>
</template>

<style lang="stylus" scoped></style>
