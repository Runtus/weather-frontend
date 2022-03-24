<script lang="ts" setup>
/**
 * 可选的维度：
 * 1. 地区（线颜色区分)
 * 2. 时间选择 -> x轴
 * 3. 天气属性选择（y轴） -> 温度，湿度，降水，aqi（最多选择两个）
 *
 *
 */
// @ts-ignore
import ToolsChart from '@/components/weathers/tools/weatherSelfControlChart.vue';
import { reactive, watch, ref, onMounted } from 'vue';
import moment, { Moment } from 'moment'
import { TreeSelect, Select, DatePicker, MonthPicker, RangePicker } from 'ant-design-vue';
import { fetchPreWeather } from '@/axios/weatherPre';
import { requestCurrentWeather } from '@/axios/weatherCurrent';
import { fetchHistoricalTotalWeather, fetchHistorical, HistoricalTemp } from '@/axios/weatherHistory';
import { useToolsDataStore, useDateRange } from '@/store/weatherTools';
import { debounce } from '@/utils/debouce';
import { fetchSearchCitys } from '@/axios/weatherTools';
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
import { throttle } from 'echarts/core';

const DEFAULT_DATE = '2000-01-01,2022-12-31';
const DEFAULT_WEATHER_ATTR = 'temp';

const form = reactive<{
    weatherType: 'pre' | 'cur' | 'h-month' | 'h-date';
    position: Array<string>;
    date: string;
    weatherAttr: string;
}>({
    weatherType: 'pre',
    position: [], // 地区选择
    date: DEFAULT_DATE,
    weatherAttr: '',
});

// stores
const dataStore = useToolsDataStore();
const dateRange = useDateRange();

// 预对比天气类型
const onWeatherTypeSelect = (value: 'pre' | 'cur' | 'h-month' | 'h-date') => {
    form.weatherType = value;
    form.position = [];
    form.date = DEFAULT_DATE;
    form.weatherAttr = '';
};

const weatherTypeSelectOptions = [
    {
        title: '历史天气',
        value: 'history',
        key: 'history',
        children: [
            {
                title: '月份历史天气',
                value: 'h-month',
                key: 'month',
            },
            {
                title: '每日历史天气',
                value: 'h-date',
                key: 'date',
            },
        ],
    },
    {
        title: '当前天气',
        value: 'cur',
        key: 'cur',
    },
    {
        title: '预测天气',
        value: 'pre',
        key: 'pre',
    },
];

// 地区Select
const citysSelectOptions = reactive<{
    data: Array<{
        value: string;
        key: string;
    }>;
}>({
    data: [],
});

const onSearch = debounce(async (value: string) => {
    if (value) {
        const result = await fetchSearchCitys(value);
        const format = result.data.map(item => ({
            key: item.location_id,
            label: `${item.name} - ${item.province}`,
            value: JSON.stringify(item),
        }));
        citysSelectOptions.data = format;
    } else {
        citysSelectOptions.data = [];
    }
}, 500);

const onSelectPosition = async (value: string) => {
    // 防止存入相同position
    if (!form.position.includes(value)) {
        form.position.push(value);
        await refreshData();
    }
};

const onDeSelectPosition = (value: string) => {
    const removeIndex = form.position.indexOf(value);
    dataStore.delete(value);
    form.position.splice(removeIndex, 1);
};

// 时间Select
const onSelectDate = (value: any, moment: string) => {
    form.date = moment;
};


const onRangeSelectDate = (value: any, dateString: [string, string]) => {
    console.log(dateString)
    form.date = dateString.join(',');
}

// 天气属性Select
const weatherAttrsOptions = [
    {
        value: 'temp',
        label: '温度',
    },
    {
        value: 'sd',
        label: '湿度',
    },
    {
        value: 'rain',
        label: '降水',
    },
    {
        value: 'aqi',
        label: '空气质量',
    },
];

const onSelectWeatherAttrs = (value: string) => {
    form.weatherAttr = value || DEFAULT_WEATHER_ATTR;
};

const refreshData = async () => {
    let city: string;
    try {
        const format = JSON.parse(form.position[form.position.length - 1]);
        city = format.name;
    } catch (err) {
        console.error('解析City时出现问题');
        city = '';
    }

    if (form.weatherType === 'cur') {
        const response = await requestCurrentWeather(city);
        dataStore.set(city, response.data);
    } else if (form.weatherType === 'pre') {
        const response = await fetchPreWeather(city);
        dataStore.set(city, response.data);
    } else if (form.weatherType === 'h-month') {
        const response = await fetchHistoricalTotalWeather(city);
        dataStore.set(city, response.data);
    } else if (form.weatherType === 'h-date') {
        const year = form.date.split('-')[0],
            month = form.date.split('-')[1];
        const response = await fetchHistorical(city, year, month);
        dataStore.set(city, response.data);
    }
};

watch(
    () => form.weatherType,
    async () => {
        // weatherType更改，重制store
        dataStore.remake();
        if (form.position.length) {
            await refreshData();
        }
    }
);

// h-date 日期变化时需要重新请求数据
watch(
    () => form.date,
    async () => {
        if (form.weatherType === 'h-date' && form.date) {
            const year = form.date.split('-')[0],
                month = form.date.split('-')[1];
            let promises: Promise<HistoricalTemp>[] = [];
            // date变化需要更新所有的data
            dataStore.value.forEach(item => {
                promises.push(fetchHistorical(item.key, year, month).then(res => res.data));
            });
            const result = await Promise.all(promises);
            const position = dataStore.value.map(item => item.key);
            position.forEach((item, index) => {
                // 由于Promise.all的顺序不变，所以可以通过index来确定location和data的映射问题
                dataStore.refresh(item, result[index]);
            });
        }
    }
);




const disabledDate = reactive({
        func: (current: Moment) => {
        const begin = moment(dateRange.begin).format('x'), end = moment(dateRange.end).format('x')
        const choose = current.format('x');
        return begin > choose || choose > end;
    }
})


const screenHeight = ref(0);
onMounted(() => {
    screenHeight.value = document.body.clientHeight;
    console.log(screenHeight.value)
    window.onresize = throttle(() => {
        screenHeight.value = document.body.clientHeight;
    }, 250)
})

</script>

<template>
    <div :style="{height: `${ screenHeight - 52}px`}" class="weather-tools-box w-full flex justify-between">
        <div class="chartBox flex justify-center p-4 h-full bg-gray-100">
            <ToolsChart self-id="toolsChartBox" :weather-type="form.weatherType" :postion="form.position" :date="form.date" :weather-attr="form.weatherAttr" />
        </div>
        <div class="tools-citys-time-box flex flex-col w-60 p-4 h-full">
            <!-- 希望比较的类型：实时，历史，预测 -->
            <div class="compare-type flex flex-col">
                <span class="title">
                    大致时间范围选择
                </span>
                <TreeSelect :default-value="form.weatherType" class="w-52" :tree-data="weatherTypeSelectOptions" @change="onWeatherTypeSelect" />
            </div>
            <div class="position flex flex-col mt-6">
                <span class="title">地区选择</span>
                <Select
                    class="w-52"
                    mode="multiple"
                    auto-clear-search-value
                    show-search
                    :options="citysSelectOptions.data"
                    @search="onSearch"
                    @select="onSelectPosition"
                    @deselect="onDeSelectPosition"
                    placeholder="城市搜索"
                />
            </div>
            <div class="time-picker-box flex flex-col mt-6">
                <span class="title">时间范围选择</span>
                <MonthPicker 
                    class="w-52"
                    @change="onSelectDate" 
                    format="YYYY-MM" 
                    v-if="form.weatherType === 'h-date'" 
                    :locale="locale" 
                />
                <RangePicker 
                    class="w-52"
                    :locale="locale" 
                    @change="onRangeSelectDate" 
                    format="YYYY-MM-DD" 
                    :disabled-date="disabledDate.func"
                    :disabled="form.weatherType === 'cur'" 
                    v-else 
                />
            </div>
            <div class="weather-attrs flex flex-col mt-6">
                <span class="title">天气属性选择</span>
                <Select class="w-52" :options="weatherAttrsOptions" @select="onSelectWeatherAttrs" />
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.chartBox {
    width: calc(100% - 15rem);
    min-width: 500px;
}


.tools-citys-time-box {
    height: 600px;

    .title {
        font-size: 16px;
    }
}
</style>
