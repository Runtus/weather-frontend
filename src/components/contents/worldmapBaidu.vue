<script lang="ts" setup>
import { useCurrentWeather } from '@/store/worldmap';
import { onMounted, reactive, watch } from 'vue';
import { throttling } from '@/utils/throttling';
import { renderTempItem } from '@/axios/worldmap';
import { colorSetting } from './colorRange';
import { fetchWorldMapTemps } from '@/axios/worldmap';
import * as echarts from 'echarts/core';
import { TitleComponent, TooltipComponent } from 'echarts/components';
import { ScatterChart, EffectScatterChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';


echarts.use([TitleComponent, TooltipComponent, ScatterChart, EffectScatterChart, CanvasRenderer, UniversalTransition]);

const current = useCurrentWeather();

let chart: any = null;

const props = defineProps<{
    type: 'temp' | 'sd' | 'aqi';
}>();

const convertData = function (data: renderTempItem[], type: 'temp' | 'sd' | 'aqi') {
    const res = data.map(item => {
        return {
            name: item.name,
            value: [item.lon, item.lat, Number(item[type])],
        };
    });
    return res;
};

const options = reactive({
    value: {
        title: {
            text: '全国主要城市空气质量 - 百度地图',
            subtext: 'data from PM25.in',
            sublink: 'http://www.pm25.in',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        bmap: {
            center: [104.114129, 37.550339],
            zoom: 5,
            roam: true,
            mapStyle: {
                styleJson: [
                    {
                        featureType: 'water',
                        elementType: 'all',
                        stylers: {
                            color: '#d1d1d1',
                        },
                    },
                    {
                        featureType: 'land',
                        elementType: 'all',
                        stylers: {
                            color: '#f3f3f3',
                        },
                    },
                    {
                        featureType: 'railway',
                        elementType: 'all',
                        stylers: {
                            visibility: 'off',
                        },
                    },
                    {
                        featureType: 'highway',
                        elementType: 'all',
                        stylers: {
                            color: '#fdfdfd',
                        },
                    },
                    {
                        featureType: 'highway',
                        elementType: 'labels',
                        stylers: {
                            visibility: 'off',
                        },
                    },
                    {
                        featureType: 'arterial',
                        elementType: 'geometry',
                        stylers: {
                            color: '#fefefe',
                        },
                    },
                    {
                        featureType: 'arterial',
                        elementType: 'geometry.fill',
                        stylers: {
                            color: '#fefefe',
                        },
                    },
                    {
                        featureType: 'poi',
                        elementType: 'all',
                        stylers: {
                            visibility: 'off',
                        },
                    },
                    {
                        featureType: 'green',
                        elementType: 'all',
                        stylers: {
                            visibility: 'off',
                        },
                    },
                    {
                        featureType: 'subway',
                        elementType: 'all',
                        stylers: {
                            visibility: 'off',
                        },
                    },
                    {
                        featureType: 'manmade',
                        elementType: 'all',
                        stylers: {
                            color: '#d1d1d1',
                        },
                    },
                    {
                        featureType: 'local',
                        elementType: 'all',
                        stylers: {
                            color: '#d1d1d1',
                        },
                    },
                    {
                        featureType: 'arterial',
                        elementType: 'labels',
                        stylers: {
                            visibility: 'off',
                        },
                    },
                    {
                        featureType: 'boundary',
                        elementType: 'all',
                        stylers: {
                            color: '#fefefe',
                        },
                    },
                    {
                        featureType: 'building',
                        elementType: 'all',
                        stylers: {
                            color: '#d1d1d1',
                        },
                    },
                    {
                        featureType: 'label',
                        elementType: 'labels.text.fill',
                        stylers: {
                            color: '#999999',
                        },
                    },
                ],
            },
        },
        series: [
            {
                name: 'pm2.5',
                type: 'scatter',
                coordinateSystem: 'bmap',
                data: convertData(current.data, props.type),
                // @ts-ignore
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                encode: {
                    value: 2,
                },
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: false,
                },
                emphasis: {
                    label: {
                        show: true,
                    },
                },
            },
            {
                name: 'Top 5',
                type: 'effectScatter',
                coordinateSystem: 'bmap',
                data: convertData(
                    current.data
                        .sort(function (a, b) {
                            const type = props.type;
                            return Number(a[type]) - Number(b[type]);
                        })
                        .slice(0, 6),
                    props.type
                ),
                // @ts-ignore
                symbolSize: function (val) {
                    return val[2] / 10;
                },
                encode: {
                    value: 2,
                },
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke',
                },
                label: {
                    formatter: '{b}',
                    position: 'right',
                    show: true,
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowColor: '#333',
                },
                emphasis: {
                    scale: true,
                },
                zlevel: 1,
            },
        ],
    },
});

const render = () => {
    if (chart) {
        chart.setOption(options.value);
        console.log(options)
    }
};

onMounted(async () => {
    if (current.data.length === 0) {
        const result = await fetchWorldMapTemps();
        current.set(result.data);
    }

    const chartDom = document.getElementById('map') as HTMLElement;
    const myChart = echarts.init(chartDom);
    chart = myChart;

    window.onresize = throttling(() => {
        myChart.resize();
    });

    render()
});

watch(
    () => props.type,
    () => {
        render();
    }
);
</script>

<template>
    <div id="map" class="w-full h-screen"></div>
</template>

<style lang="stylus" scoped>
#map {
    border: 1px solid red;
}
</style>