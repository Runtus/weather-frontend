<script lang="ts" setup>
// @ts-ignore
import WorldMap from '@/components/contents/worldmapBaidu.vue'
import { Button, Switch } from 'ant-design-vue'
import { ref } from 'vue';

const chooseType = ref<'temp' | 'sd' | 'aqi'>('temp')
const btnOnClick = (value: 'temp' | 'sd' | 'aqi') => {
    chooseType.value = value;
}

const isTop10 = ref(false)


const primary = 'primary', defalut = 'defalut';
</script>

<template>
    <div class="w-full h-auto flex relative">
        <!-- <HomeSidebar /> -->
         <WorldMap
            :type="chooseType"
            :is-top="isTop10"
          />
        <div class="w-40 rounded-xl button-box p-4 fixed top-20 right-5 flex flex-col">
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
        <div class="switch-box rounded-xl w-40 p-4 flex justify-around switch-top10 fixed top-64 right-5">
            <Switch 
                v-model:checked="isTop10"
            />
            <span class="white">All/top30</span>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.button-box, .switch-box {
    background-color: rgba(255,255,255,0.7);
}

.btn {
    border-radius: 20px !important;
}
</style>
