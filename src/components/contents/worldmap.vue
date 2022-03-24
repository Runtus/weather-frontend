<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { useCurrentWeather } from '@/store/worldmap'
import { fetchWorldMapTemps } from '@/axios/worldmap';
import { tempColorSetting, sdColorSetting, colorSetting } from './colorRange';




const props = defineProps<{
    type: 'temp' | 'sd' | 'aqi'
}>()

const current = useCurrentWeather();

const data = ref(0);

let map: any;

const render_data = (type: 'temp' | 'sd' | 'aqi') => {
    const render = current.data.map(item => {
        // @ts-ignore
        return new AMap.Circle({
                // @ts-ignore
                center: new AMap.LngLat(item.lon, item.lat), // 圆心位置
                radius: 8000, //半径
                strokeColor: '#F33', //线颜色
                strokeOpacity: 0, //线透明度
                strokeWeight: 3, //线粗细度
                fillColor: colorSetting[type](item[type]), //填充颜色
                fillOpacity: 0.8, //填充透明度
            })
    })
    return render;
}

onMounted(async () => {
    if(current.data.length === 0){
        const result = await fetchWorldMapTemps();
        current.set(result.data);
    }

    // @ts-ignore
    map = new AMap.Map('container', {
        mapStyle: 'amap://styles/f0b0f84ad678d03b2000fe2c3dbdf48a',
        resizeEnable: true,
    });

        // @ts-ignore
    map.on('click', ev => {
        const { pixel } = ev;
        console.log(pixel.x, pixel.y);
        console.log(ev);
    });

    const circles: Array<any> = render_data(props.type)
    map.add([...circles])
})


watch(() => props.type, () => {
    map.clearMap()
    const circles: Array<any> = render_data(props.type)
    map.add([...circles])
})


</script>

<template>
    <div id="container" class="h-screen container"></div>
</template>

<style lang="stylus" scoped></style>
