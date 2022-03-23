<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useLocationSearchResult } from '@/store/search';
// @ts-ignore
import HistoricalTemp from '@/components/weathers/history/historicalTemp.vue';
// @ts-ignore
import HistoricalRain from '@/components/weathers/history/historicalRain.vue';
// @ts-ignore
import HistoricalMonthTemp from '@/components/weathers/history/historicalMonthTemp.vue';
// @ts-ignore
import HistoricalSD from '@/components/weathers/history/historicalSD.vue';
import { fetchHistoricalTotalWeather, HistoricalWeather } from '@/axios/weatherHistory';

const locationSearch = useLocationSearchResult();
const change = ref(0);
const route = useRoute();
const weather = reactive<{
    value: HistoricalWeather;
}>({
    value: {
        temp: {
            legend: [],
            maxTmp: [],
            minTmp: [],
            avgTmp: [],
        },
        rain: {
            legend: [],
            rain_days: [],
            pcpn: [],
        },
        sd: {
            legend: [],
            value: [],
        },
        aqi: [],
    },
});

const getHistoricalInfo = async () => {
    const res = await fetchHistoricalTotalWeather(locationSearch.location);
    if (res.code === '0') {
        weather.value = res.data;
        change.value++;
    } else {
    }
};

watch(
    () => locationSearch.location,
    () => {
        getHistoricalInfo();
    }
);

onMounted(() => {
    getHistoricalInfo();
});
</script>

<template>
    <div class="HistoricalBox w-full flex flex-col items-center">
        <div class="chartBox tempChartBox w-3/4">
            <HistoricalTemp />
        </div>
        <div class="chartBox rainChartBox w-3/4">
            <HistoricalRain :rain="weather.value.rain" />
        </div>
        <div class="chartBox monthTempChartBox w-3/4">
            <HistoricalMonthTemp :month-temp="weather.value.temp" />
        </div>
        <div class="chartBox SDChartBox w-3/4">
            <HistoricalSD :sd="weather.value.sd" :change="change" />
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.tempChartBox, .rainChartBox,.monthTempChartBox, .SDChartBox {
    height: 700px;
}

.chartBox {
    margin-top: 40px;
}
</style>
