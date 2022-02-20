<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
const props = withDefaults(defineProps<{weather: string}>(),{ weather: '阴'})

</script>

<template>
<!-- 通过props.weather的情况来决定背景颜色以及图片url -->
    <div class="card w-10/12 rounded-2xl bg-gray-200 relative">
        <slot class="h-full"></slot>
    </div>
</template>

<style lang="stylus" scoped>
.card {
    background-image: url(https://lao-lan-go.oss-cn-beijing.aliyuncs.com/weather/cloudy--day.png)
    background-repeat: no-repeat;
    background-position: right top;
    height: 350px;
    min-height: 300px;
}
</style>