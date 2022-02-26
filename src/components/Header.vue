<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { router_header_map } from '@/config';

const router = useRouter();

function turn(url: string) {
    router.push(url);
}
</script>

<template>
    <header class="Header flex w-full h-14 bg-blue-300 flex justify-end">
        <div class="content w-3/4 h-full flex justify-end mr-12">
            <span class="items flex h-full cursor-pointer items-center text-sm ml-8" v-for="item in router_header_map" :key="item.name" @click="turn(item.url)">
                {{ item.title }}
            </span>
        </div>
    </header>
</template>

<style lang="stylus" scoped>
.Header {
    border: 1px solid black;
}
</style>
