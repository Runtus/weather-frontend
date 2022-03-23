<script lang="ts" setup>
/**
 * TODO: 代码完事后，删除这部分的代码
 * 1. 某地的24h/ 7day 温度情况 -> switch和Echarts同步变化
 * 2. 某地的7day/30day 降水情况
 * 3. 某地空气质量情况 7day
 *
 *
 */
// @ts-ignore
import LocationSearch from '@/components/GPSPosition.vue';
// @ts-ignore
import PreWeatherTemp from '@/components/weathers/pre/preTemp.vue';
</script>

<template>
    <div class="content w-full flex items-center justify-center pt-12">
        <div class="preWeatherBox w-3/4">
            <PreWeatherTemp />
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.content {


    .preWeatherBox {
        height: 800px;
    }
}
</style>
