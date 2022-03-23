<script lang="ts" setup>
// url: https://echarts.apache.org/examples/zh/editor.html?c=line-stack
import { defineProps, withDefaults, watch, onMounted } from 'vue';
import * as echarts from 'echarts/core';
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { throttling } from '@/utils/throttling';

echarts.use([TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent, LineChart, CanvasRenderer, UniversalTransition]);

type Props = {
    selfId: string;
    options?: echarts.EChartsCoreOption;
    change?: number;
};

let eChartObject: any = null;

const props = withDefaults(defineProps<Props>(), {
    selfId: 'defalut',
    change: 0,
});

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
    const renderDOM = document.getElementById(props.selfId) as HTMLElement;
    const myChart = echarts.init(renderDOM);
    eChartObject = myChart;
    window.onresize = throttling(() => {
        eChartObject.resize();
    }, 16);
});
</script>

<template>
    <div :id="props.selfId" class="w-full h-full"></div>
</template>

<style lang="stylus" scoped></style>
