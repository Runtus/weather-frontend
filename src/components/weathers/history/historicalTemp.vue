<script lang="ts" setup>
import { onMounted, reactive, ref, defineProps, withDefaults, watch } from 'vue';
import { Select } from 'ant-design-vue';
import { SelectTypes } from 'ant-design-vue/es/select';
import { fetchHistorical } from '@/axios/weatherHistory';
import { useLocationSearchResult } from '@/store/search';
// @ts-ignore
import TempLineChart from './charts/tempLineChart.vue';

const citySearch = useLocationSearchResult();

// options设置
let options: SelectTypes['options'] = reactive([]);
const date = new Date();
let year = date.getFullYear();
// 提前两个月的月份
let month = date.getMonth() - 1;
for (let i = 12; i > 0; i--) {
    if (month <= 0) {
        year = year - 1;
        month = month + 12;
    }
    options.push({
        value: `${year},${month < 10 ? `0${month}` : month + ''}`,
        label: `${year}-${month < 10 ? `0${month}` : month + ''}`,
    });
    month--;
}

// Echarts Options
const echartsOptions = reactive({
    title: {
        text: `${citySearch.location}市历史一年月度气温统计表`,
    },
    tooltip: {
        trigger: 'axis',
    },
    legend: {
        data: ['最高温度', '最低温度', '平均温度'],
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

const change = ref(0);

const fetchHistoricalInfo = (data: { location: string; year?: string; month?: string }) => {
    const { location, year, month } = data;
    return fetchHistorical(location, year, month).then(res => {
        if (res.code === '0') {
            return res.data;
        } else {
            console.log('请求历史天气温度数据失败');
            return null;
        }
    });
};

const onChange = async (value: string) => {
    const temp = value.split(',');
    const year = temp[0],
        month = temp[1];
    const data = await fetchHistoricalInfo({
        location: '北京',
        year,
        month,
    });
    if (data) {
        echartsOptions.yAxis.max = Math.max(...data.maxTmp) + 5;
        echartsOptions.yAxis.min = Math.min(...data.minTmp) - 5;
        echartsOptions.series[0].data = data.maxTmp;
        echartsOptions.series[1].data = data.minTmp;
        echartsOptions.series[2].data = data.avgTmp.map(item => Number(item));
        echartsOptions.xAxis.data = data.legend;
        echartsOptions.title.text = `${citySearch.location}市历史一年月度气温统计表`;
        change.value++;
    } else {
        // TODO 提示，请求失败无数据
    }
};
onMounted(() => {
    onChange('2022,01');
});
</script>

<template>
    <div class="w-full h-full flex justify-between">
        <div class="chartsBox w-4/5 h-full bg-gray-100 rounded-xl">
            <TempLineChart self-id="historical-temp" :options="echartsOptions" :change="change" />
        </div>
        <div class="selectBox h-1/6 flex flex-col items-center rounded-xl bg-gray-100">
            <p class="text-xl">区间选择</p>
            <Select class="w-40" :options="options" @change="onChange" default-value="2022,01" />
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.chartsBox {
    padding: 24px;
}

.selectBox {
    padding: 20px;
}
</style>
