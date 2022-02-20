<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { useStore } from '@/store/counter';
import { getCurrentInstance } from 'vue-demi';
import Header from '@/components/Header.vue'

const instance = getCurrentInstance()

const store = useStore();

</script>

<template>
    <div class="content flex flex-col w-full">
        <Header />
        <router-view></router-view>
    </div>
</template>

<style lang="stylus">
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
</style>
