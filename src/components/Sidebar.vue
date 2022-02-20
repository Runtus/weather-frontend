<script lang="ts" setup>
// @ts-ignore
import WeatherCard from '@/components/weathers/Common/Card.vue'
// @ts-ignore
import LocalPreWeather from '@/components/weathers/LocalPreWeather.vue'
// @ts-ignore
import LocalCurrentWeather from '@/components/weathers/LocalCurrentWeather.vue'

</script>

<template>
    <div class="Sidebar flex flex-col h-screen w-1/3">
        <div class="worldMap">
            WorldMap
        </div>
        <WeatherCard class="local-real-weather">
            <LocalRealWeather />
        </WeatherCard>
        <WeatherCard class="local-preview-weather">
            <LocalCurrentWeather  />
        </WeatherCard>
    </div>
</template>

<style lang="stylus" scoped>
.Sidebar {
    border: 1px solid black;
    min-width: 8rem;
}
</style>