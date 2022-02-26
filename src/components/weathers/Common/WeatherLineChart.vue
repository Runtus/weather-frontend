<script lang="ts" setup>
// 天气折线图进行抽象
import { defineProps, onMounted, withDefaults } from 'vue';
import { EChartsCoreOption } from 'echarts/core';
import * as echarts from 'echarts/core';
import { GridComponent } from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([GridComponent, LineChart, CanvasRenderer, UniversalTransition]);

type Props = {
    selfId: string;
    options?: EChartsCoreOption;
};

const props = withDefaults(defineProps<Props>(), {
    selfId: 'defalut',
});

console.log(props.options);

// 无配置，不渲染
onMounted(() => {
    if (props.options) {
        const renderDOM = document.getElementById(props.selfId) as HTMLElement;
        const myChart = echarts.init(renderDOM);
        myChart.setOption(props.options);
    }
});
</script>

<template>
    <div :id="props.selfId" class="w-full h-full"></div>
</template>

<style lang="stylus" scoped></style>
