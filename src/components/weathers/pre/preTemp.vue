<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { usePreWeatherStore } from '@/store/weather';
import { useLocationSearchResult } from '@/store/search';
import { useRoute } from 'vue-router';
// @ts-ignore
import WeatherMixChart from '@/components/weathers/Common/WeatherMixChart.vue';
// @ts-ignore
import HoverCard from './cards/hoverCard.vue';
import { Select } from 'ant-design-vue';
import { formatTime } from '@/utils/time';
import { SelectTypes } from 'ant-design-vue/es/select';
import { fetchPreWeather, PreWeather30, PreWeather30Item } from '@/axios/weatherPre';

// TODO 增加一个气温展示模块，hover到图表的某一列时，在展示模块里会显示

const locationSearch = useLocationSearchResult();
const preWeatherStore = usePreWeatherStore();

const selectValue = ref('15');
const change = ref(0);

const chooseWeather = reactive({
    date: '',
    text: '',
    code: '',
});

const chartsOptions = reactive({
    title: {
        text: `${locationSearch.location}市未来气温湿度预测`,
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
        data: ['相对湿度', '最高温度', '最低温度'],
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
            min: -10,
            max: 40,
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

const onChartClick = (params: any) => {
    const target = preWeatherStore.value[params.dataIndex] as PreWeather30Item;
    if (target) {
        chooseWeather.code = target.code;
        chooseWeather.date = `${target.date.split('-')[1]}-${target.date.split('-')[2]}`;
        chooseWeather.text = target.text;
    }
};

const fetchData = async () => {
    const location = locationSearch.location;
    fetchPreWeather(location)
        .then(res => {
            preWeatherStore.set(res.data);
            optionsSetting(Number(selectValue.value));
            onChartClick({ dataIndex: 0 });
        })
        .catch(err => {
            preWeatherStore.set([]);
            console.log('请求天气预报数据失败');
            console.error(err);
        });
};

watch(
    () => locationSearch.location,
    async () => {
        await fetchData();
        chartsOptions.title.text = `${locationSearch.location}市未来气温湿度预测`;
    }
);

onMounted(() => {
    fetchData();
});
</script>

<template>
    <div class="w-full h-full flex justify-between">
        <div class="chartBox bg-gray-100 w-3/4 h-full rounded-xl">
            <WeatherMixChart :options="chartsOptions" :change="change" self-id="preweather" :click="onChartClick" />
        </div>
        <div class="toolBox w-1/6 h-full flex flex-col">
            <div class="select-box flex flex-col h-1/6 w-full bg-gray-100 rounded-xl">
                <span class="text-lg font-medium mb-2">日期范围选择</span>
                <Select class="w-36" :options="options" @change="onChange" :defaultValue="selectValue" />
            </div>
            <div class="displayCard mt-16">
                <HoverCard :weather-pre="chooseWeather" />
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.preTemp,.chartBox{
  padding: 20px;
}

.select-box {
    padding-top: 12px;
    padding-left: 12px;
}
</style>
