<script lang="ts" setup>
// 天气折线图进行抽象
import { defineProps, withDefaults, watch, reactive, onMounted } from 'vue';
import { EChartsCoreOption } from 'echarts/core';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { throttling } from '@/utils/throttling';
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type Props = {
    selfId: string;
    change?: number; // 更改此属性能重新渲染图表（当options又变更时使用）
    options?: EChartsCoreOption;
};

let eChartObject: any = null;
// TODO vue3 如果对echarts对象进行响应式包装 会导致后续的resize方法报错 因为其底层无法读取proxy背后的属性
// const eChartObject = reactive<{value: echarts.ECharts | null}>({
//     value: null
// })

const props = withDefaults(defineProps<Props>(), {
    selfId: 'defalut',
    change: 0,
});

// 图表渲染函数
const render = () => {
    if (props.options && eChartObject) {
        eChartObject.setOption(props.options);
    }
};

// 监听props变化
watch(
    () => props.change,
    () => {
        console.log('我变化了');
        render();
    }
);

// 初始化
onMounted(() => {
    const renderDOM = document.getElementById(props.selfId) as HTMLElement;
    console.log(props.selfId);

    const myChart = echarts.init(renderDOM);
    eChartObject = myChart;

    window.onresize = throttling(() => {
        myChart.resize();
    }, 16);
});
</script>

<template>
    <div :id="props.selfId" class="w-full h-full"></div>
</template>

<style lang="stylus" scoped></style>
