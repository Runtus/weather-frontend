<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router'
// @ts-ignore
import HistoricalTemp from '@/components/weathers/history/historicalTemp.vue'
// @ts-ignore
import HistoricalRain from '@/components/weathers/history/historicalRain.vue'
// @ts-ignore
import HistoricalMonthTemp from '@/components/weathers/history/historicalMonthTemp.vue'
// @ts-ignore
import HistoricalSD from '@/components/weathers/history/historicalSD.vue'
import { fetchHistoricalTotalWeather, HistoricalWeather } from '@/axios/weatherHistory'

const defalut = '成都';
const change = ref(0)
const route = useRoute();
const weather = reactive<{
    value: HistoricalWeather
}>({
    value: {
        temp: {
            legend: [],
            maxTmp: [],
            minTmp: [],
            avgTmp: []
        },
        rain: {
            legend: [],
            rain_days: [],
            pcpn: []
        },
        sd: {
            legend: [],
            value: []
        },
        aqi: []
    }
})

const getHistoricalInfo = async () => {
    const res = await fetchHistoricalTotalWeather((route.query.location as string) || defalut)
    if(res.code === '0'){
        weather.value = res.data;
        change.value++;
    } else {

    }
}

onMounted(() => {
    getHistoricalInfo()
})
</script>

<template>
    <div class="HistoricalBox w-full">
        <div class="tempChartBox w-full">
            <HistoricalTemp />
        </div>
        <div class="rainChartBox w-full">
            <HistoricalRain
                :rain="weather.value.rain"
             />
        </div>
        <div class="monthTempChartBox w-full">
            <HistoricalMonthTemp
                :month-temp="weather.value.temp"
             />
        </div>
        <div class="SDChartBox w-full">
            <HistoricalSD
                :sd="weather.value.sd"
                :change="change"
             />
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.tempChartBox, .rainChartBox,.monthTempChartBox, .SDChartBox {
    height: 700px;
}

</style>
