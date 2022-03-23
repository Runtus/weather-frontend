<script lang="ts" setup>
// 仪表盘
import * as echarts from 'echarts/core';
import { GaugeChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted } from 'vue-demi';

echarts.use([GaugeChart, CanvasRenderer]);

onMounted(() => {
    var chartDom = document.getElementById('main') as unknown as HTMLElement;
    var myChart = echarts.init(chartDom);
    var option;

    option = {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 1,
                splitNumber: 8,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#58D9F9'],
                            [0.5, '#7CFFB2'],
                            [0.75, '#FDDD60'],
                            [1, '#FF6E76'],
                        ],
                    },
                },
                pointer: {
                    icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                    length: '12%',
                    width: 10,
                    offsetCenter: [0, '-60%'],
                    itemStyle: {
                        color: 'auto',
                    },
                },
                axisTick: {
                    length: 12,
                    lineStyle: {
                        color: 'auto',
                        width: 2,
                    },
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: 'auto',
                        width: 5,
                    },
                },
                axisLabel: {
                    color: '#464646',
                    fontSize: 12,
                    distance: -60,
                    formatter: function (value: number) {
                        if (value === 0.875) {
                            return '30';
                        } else if (value === 0.625) {
                            return '20';
                        } else if (value === 0.375) {
                            return '10';
                        } else if (value === 0.125) {
                            return '0';
                        }
                        return '';
                    },
                },
                title: {
                    offsetCenter: [0, '-20%'],
                    fontSize: 14,
                },
                detail: {
                    fontSize: 16,
                    offsetCenter: [0, '0%'],
                    valueAnimation: true,
                    formatter: function (value: number) {
                        return Math.round(value * 40) + -5 + '度';
                    },
                    color: 'auto',
                },
                data: [
                    {
                        value: 0.7,
                        name: '气温',
                    },
                ],
            },
        ],
    };

    option && myChart.setOption(option);
});
</script>

<template>
    <div id="main" class="w-full h-full"></div>
</template>

<style lang="stylus" scoped></style>
