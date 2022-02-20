<script lang="ts" setup>
// 当前天气以及天气预报
// @ts-ignore
import CurrentWeather from '@/components/weathers/LocalCurrentWeather.vue'
// @ts-ignore
import WeatherCard from '@/components/weathers/Common/Card.vue'
// @ts-ignore
import WeatherPre from '@/components/weathers/LocalPreWeather.vue'

</script>

<template>
    <div class="w-10/12">
        <WeatherCard>
            <CurrentWeather />
        </WeatherCard>
        <WeatherCard>
            <WeatherPre />
        </WeatherCard>
    </div>
</template>

<style lang="stylus" scoped>

</style>
