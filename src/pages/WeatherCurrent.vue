<script lang="ts" setup>
// 当前天气以及天气预报
// @ts-ignore
import CurrentWeather from '@/components/weathers/LocalCurrentWeather.vue';
// @ts-ignore
import WeatherCard from '@/components/weathers/Common/Card.vue';
// @ts-ignore
import WeatherPre from '@/components/weathers/LocalPreWeather.vue';
// @ts-ignore
import WeatherPM25 from '@/components/weathers/LocalPM25.vue';
// @ts-ignore
import PositionG from '@/components/GPSPosition.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue-demi';
import { requestCurrentWeather } from '@/axios/weatherCurrent';

const routes = useRoute();

onMounted(() => {
    const location = routes.query.location as string;
    if (location) {
        requestCurrentWeather(location).then(res => {
            if (res.data.code === '1') {
                // TODO 页面渲染为404
                console.log('无数据，404');
            } else {
                console.log(res.data.data);
            }
        });
    }
});
</script>

<template>
    <div class="positionBox w-full bg-gray-200">
        <PositionG />
    </div>
    <div class="w-full flex flex-col items-center mx-auto">
        <WeatherCard class="mt-12">
            <CurrentWeather />
        </WeatherCard>
        <WeatherCard class="mt-12">
            <!-- <WeatherPre /> -->
        </WeatherCard>
        <WeatherPM25 class="mt-12" />
    </div>
</template>

<style lang="stylus" scoped></style>
