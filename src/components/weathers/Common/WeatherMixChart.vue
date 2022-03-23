<script lang="ts" setup>
// 混合图 url: https://echarts.apache.org/examples/zh/editor.html?c=mix-line-bar
import { defineProps, withDefaults, watch, reactive, onMounted } from 'vue';
import * as echarts from 'echarts/core';
import { ToolboxComponent, TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { BarChart, LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { throttling } from '@/utils/throttling';

echarts.use([ToolboxComponent, TitleComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, LineChart, CanvasRenderer, UniversalTransition]);

type Props = {
    selfId: string;
    options: echarts.EChartsCoreOption | null;
    change: number;
    click?: (params: any) => void;
};

const props = withDefaults(defineProps<Props>(), {
    selfId: 'default',
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
    const dom = document.getElementById(props.selfId) as HTMLElement;
    const myChart = echarts.init(dom);
    eChartObject = myChart;
    window.onresize = throttling(() => {
        eChartObject.resize();
    }, 16);

    if (props.click) {
        myChart.on('click', props.click);
    }
});
</script>

<template>
    <div :id="props.selfId" class="mixCharts w-full h-full"></div>
</template>

<style lang="stylus" scoped></style>
