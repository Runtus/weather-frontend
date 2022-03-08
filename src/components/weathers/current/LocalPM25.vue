<script lang="ts" setup>
// @ts-ignore
import FanChart from '@/components/weathers/Common/WeatherFanChart.vue';
import { defineProps, withDefaults, watch, reactive, ref } from 'vue';
import { CurrentWeather } from '@/axios/weatherCurrent';

// Options设置
const options = reactive({
    title: {
        text: '空气质量',
        subtext: 'Fake Data',
        left: 'center',
    },
    tooltip: {
        trigger: 'item',
    },
    legend: {
        orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: 'Access From',
            type: 'pie',
            radius: '50%',
            data: [
                { value: 1048, name: 'Search Engine' },
                { value: 735, name: 'Direct' },
                { value: 580, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
            ],
            emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
    ],
});

// 空气质量属性
const air_attrs = ['pm10', 'pm2p5', 'no2', 'so2', 'co', 'o3'];
const change = ref(0);

type Props = {
    air: CurrentWeather['air'];
};

const props = withDefaults(defineProps<Props>(), {});

// 监听更改options
watch(
    () => props.air,
    () => {
        const render_data: Array<{ value: number; name: string }> = [];
        air_attrs.map(item => {
            render_data.push({
                name: item === 'pm2p5' ? 'pm2.5' : item,
                // @ts-ignore -> air_attrs已经和props.air一一匹配
                value: Number(props.air[item]) || 0, // NaN会影响渲染
            });
        });
        options.series[0].data = render_data;
        change.value++;
    }
);
</script>

<template>
    <div class="fanChartBox">
        <FanChart id="current_air_quality" :options="options" :change="change" />
    </div>
</template>

<style lang="stylus" scoped>
.fanChartBox {
    width: 600px;
    height: 300px;
}
</style>
