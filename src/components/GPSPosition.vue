<script setup lang="ts">
// @ts-ignore
import CitySearch from '@/components/CitySearch.vue';
import { getWeatherByGaode, getCityInfoByLocation } from '@/axios/GaoDeApi';

let locaCityInfo: string = '';

function onClick() {
    navigator.geolocation.getCurrentPosition(
        async res => {
            // latitude -> 纬度 longitude -> 经度
            const location = `${res.coords.longitude.toFixed(2)},${res.coords.latitude.toFixed(2)}`;
            const city = await getCityInfoByLocation(location);
            if (city) {
                const { adcode, city: cityName, province, country } = city.regeocode.addressComponent;
                locaCityInfo = `${country} - ${province} - ${cityName}`;
                const weather = await getWeatherByGaode(adcode);
                if (weather) {
                    console.log(weather);
                }
            }
        },
        err => {
            if (err) {
                console.error('获取用户地址失败');
                console.error(err);
            }
        }
    );
}
</script>

<template>
    <div class="w-8/12 mx-auto h-12 flex items-center justify-between">
        <div class="search w-36">
            <CitySearch />
        </div>
        <div class="local-weather flex w-2/3 justify-end">
            <span class="where mr-12">中国 - 四川 - 西昌</span>
            <div class="weather mr-12">
                <span class="temp">6°</span>
                <span class="status ml-2">阴</span>
            </div>
            <div class="time">
                <span>2022-xx-xx |</span>
                <span>星期四</span>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.local-weather {

}
</style>
