<script lang="ts" setup>
// 扇形图抽象
import { defineProps, onMounted, withDefaults, watch, reactive } from 'vue';
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
    change: number;
};
const props = withDefaults(defineProps<Props>(), {
    id: 'defaults',
    change: 0
});

const eChartObject = reactive<{value: echarts.ECharts | null}>({
    value: null
})

const render = () => {
    if(props.options && eChartObject.value) {
        eChartObject.value.setOption(props.options)
    }
}

watch(
    () => props.change,
    () => {
        render()
    }
)

// 初始化 保持Echarts
onMounted(() => {
    const dom = document.getElementById(props.id) as HTMLElement;
    const myChart = echarts.init(dom);
    eChartObject.value = myChart;
});
</script>

<template>
    <div :id="props.id" class="FanChartBox w-full h-full" />
</template>

<style lang="stylus" scoped>
.FanChartBox {

}
</style>
