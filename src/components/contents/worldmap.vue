<script lang="ts">
// @ts-ignore-file
import { onMounted, ref } from 'vue';
export default {
    setup() {
        onMounted(() => {
            // @ts-ignore
            const map = new AMap.Map('container', {
                mapStyle: 'amap://styles/f0b0f84ad678d03b2000fe2c3dbdf48a',
                resizeEnable: true,
            });

            // @ts-ignore
            map.on('click', ev => {
                const { pixel } = ev;
                console.log(pixel.x, pixel.y);
                console.log(ev);
            });

            // 创建 geoJSON 实例
            // @ts-ignore
            const southWest = new AMap.LngLat(116.356449, 39.859008);
            // @ts-ignore
            const northEast = new AMap.LngLat(116.417901, 39.893797);
            // @ts-ignore
            const bounds = new AMap.Bounds(southWest, northEast);
            // @ts-ignore
            var rectangle = new AMap.Rectangle({
                bounds: bounds,
                strokeColor: 'red',
                strokeWeight: 0,
                strokeOpacity: 0,
                strokeDasharray: [30, 10],
                // strokeStyle还支持 solid
                strokeStyle: 'solid',
                fillColor: 'blue',
                fillOpacity: 0.5,
                cursor: 'pointer',
                zIndex: 50,
            });

            rectangle.setMap(map);
            map.setFitView([rectangle]);
        });

        const data = ref(0);

        return {
            data,
        };
    },
};
</script>

<template>
    <div id="container" class="h-screen container"></div>
</template>

<style lang="stylus" scoped></style>
