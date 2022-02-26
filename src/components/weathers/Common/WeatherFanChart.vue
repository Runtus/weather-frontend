<script lang="ts" setup>
// 扇形图抽象
import { defineProps, onMounted, withDefaults } from 'vue';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent, LegendComponent } from 'echarts/components';
import { PieChart } from 'echarts/charts';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { EChartsCoreOption } from 'echarts/core';

echarts.use([TitleComponent, TooltipComponent, LegendComponent, PieChart, CanvasRenderer, LabelLayout]);

type Props = {
    id: string;
    options: EChartsCoreOption;
};
const props = withDefaults(defineProps<Props>(), {
    id: 'defaults',
});

onMounted(() => {
    if (props.options) {
        const dom = document.getElementById(props.id) as HTMLElement;
        const myChart = echarts.init(dom);
        myChart.setOption(props.options);
    }
});
</script>

<template>
    <div :id="props.id" class="FanChartBox"></div>
</template>

<style lang="stylus" scoped>
.FanChartBox {
    width: 300px;
    height: 300px;
}
</style>
