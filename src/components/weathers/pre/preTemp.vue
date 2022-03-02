<script lang="ts" setup>
// 温度的折线图，两侧有tab可选
// tab主要是：时段选择 ： 3day，7day，15day，30day
// @ts-ignore
import WeatherLineChart from '@/components/weathers/Common/WeatherLineChart.vue'
import { Select } from 'ant-design-vue'
import { SelectTypes } from 'ant-design-vue/es/select'

// TODO 为了方便调试，地址默认使用北京
const defalut = '北京'

const options: SelectTypes['options'] = [
    {
        value: '3',
        label: '3日天气预报'
    },
    {
        value: '7',
        label: '7日天气预报'
    },
    {
        value: '15',
        label: '15日天气预报'
    },
    {
        value: '30',
        label: '30日天气预报'
    }
]

function onChange(value: string){
    console.log(value)
}

</script>

<template>
    <div class="preTemp">
        <div class="select-box">
            <Select
                class="w-36"
                :options="options"
                @change="onChange"
             />
        </div>
    </div>    
</template>

<style lang="stylus" scoped>

</style>
