<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { getCurrentInstance } from 'vue-demi';
import { useSidebarButtonStatus } from '@/store/sidebar';
// @ts-ignore
import Header from '@/components/Header.vue';
// @ts-ignore
import SideBar from '@/components/Sidebar.vue';
const instance = getCurrentInstance();
const buttonStatu = useSidebarButtonStatus();
</script>

<template>
    <div class="page relative flex w-full h-screen">
        <SideBar />
        <div class="flex flex-col content relative h-full">
            <Header />
            <div class="component pb-24">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

.links {
    width: 200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    margin-bottom: 100px;
}

.content {
    transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s ;
    width: 100%;
}

.component {
    overflow-y: scroll;
}
</style>
