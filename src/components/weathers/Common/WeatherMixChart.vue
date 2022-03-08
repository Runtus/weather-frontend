<script lang="ts" setup>
// 混合图 url: https://echarts.apache.org/examples/zh/editor.html?c=mix-line-bar
import { defineProps, withDefaults, watch, reactive, onMounted } from 'vue';
import * as echarts from 'echarts/core';
import { ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { throttling } from '@/utils/throttling';

echarts.use([ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, LineChart, CanvasRenderer, UniversalTransition]);

type Props = {
    id: string;
    options: echarts.EChartsCoreOption;
    change: number;
};

const props = withDefaults(defineProps<Props>(), {
    id: 'default',
    change: 0,
});

let eChartObject: echarts.ECharts;

const render = () => {
    if (props.options && eChartObject) {
        eChartObject.setOption(props.options);
    }
};

watch(
    () => props.change,
    () => {
        render();
    }
);

onMounted(() => {
    const dom = document.getElementById(props.id) as HTMLElement;
    const myChart = echarts.init(dom);
    eChartObject = myChart;
    window.onresize = throttling(() => {
        eChartObject.resize();
    }, 16);
});
</script>

<template>
    <div :id="props.id" class="mixCharts w-full h-full"></div>
</template>

<style lang="stylus" scoped></style>
