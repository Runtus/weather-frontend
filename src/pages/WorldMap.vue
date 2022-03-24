<script lang="ts" setup>
// @ts-ignore
import WorldMapContent from '@/components/contents/worldmap.vue';
// @ts-ignore
import WorldMap from '@/components/contents/worldmapBaidu.vue'
import { Button } from 'ant-design-vue'
import TempSvg from '@/svgs/temp.vue'
import { ref } from 'vue';

const chooseType = ref<'temp' | 'sd' | 'aqi'>('temp')
const btnOnClick = (value: 'temp' | 'sd' | 'aqi') => {
    chooseType.value = value;
}


const primary = 'primary', defalut = 'defalut';
</script>

<template>
    <div class="w-full h-auto flex relative">
        <!-- <HomeSidebar /> -->
         <WorldMap
            :type="chooseType"
          />
        <div class="rounded-xl button-box bg-gray-100 p-4 fixed top-20 right-5 flex flex-col">
            <Button 
                class="btn flex" 
                @click="btnOnClick('temp')"
                :type="chooseType === 'temp' ? 'primary' : 'default'"
            >
                <span>温度</span>
            </Button>
            <Button 
                class="btn mt-4" 
                @click="btnOnClick('sd')"
                :type="chooseType === 'sd' ? 'primary' : 'default'"
            >
                相对湿度
            </Button>
            <Button 
                class="btn mt-4" 
                @click="btnOnClick('aqi')"
                :type="chooseType === 'aqi' ? 'primary' : 'default'"
            >
                空气质量
            </Button>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.button-box {
    background-color: #001529;
}

.btn {
    border-radius: 20px !important;
}
</style>
