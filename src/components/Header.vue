<script lang="ts" setup>
import { useSidebarButtonStatus } from '@/store/sidebar';
import { useLocationSearchResult } from '@/store/search';
import { Button, InputSearch } from 'ant-design-vue';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

const buttonStatus = useSidebarButtonStatus();
const locationSearch = useLocationSearchResult();

const onButtonClick = () => {
    buttonStatus.toggle();
};

const onInputChange = (value: string) => {
    locationSearch.set(value);
};
</script>

<template>
    <header class="Header shadow w-full flex bg-white items-center justify-between">
        <div class="sidebar-button ml-4">
            <Button @click="onButtonClick" class="h-8">
                <menu-fold-outlined v-if="!buttonStatus.isCollapsed" />
                <menu-unfold-outlined v-else />
            </Button>
        </div>
        <div class="tools flex mr-12">
            <div class="inputBox mr-4">
                <InputSearch class="w-24" @search="onInputChange" />
            </div>
            <div class="avatar w-8 h-8">
                <img
                    class="w-full h-full rounded-full cursor-pointer"
                    src="https://lao-lan-go.oss-cn-beijing.aliyuncs.com/runtu_blog/12D325B000A90B46474FF88EC0970B67.jpg"
                    alt="头像"
                />
            </div>
        </div>
        <!-- <div class="content w-3/4 h-full flex justify-end mr-12">
            <span class="items flex h-full cursor-pointer items-center text-sm ml-8" v-for="item in router_header_map" :key="item.name" @click="turn(item.url)">
                {{ item.title }}
            </span>
        </div> -->
    </header>
</template>

<style lang="stylus" scoped>
.Header {
    // border: 1px solid black;
    padding: 10px;
}
</style>
