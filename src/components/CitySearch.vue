<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Input } from 'ant-design-vue';

const router = useRouter();
const routes = useRoute();

const search_city = ref('');

onMounted(() => {
    console.log('刷新了');
});

function citySearch() {
    const value = search_city.value;
    if (!value) {
        router.push(`${routes.path}`);
    } else {
        router.push(`${routes.path}?location=${value}`);
    }
}
</script>

<template>
    <Input placeholder="地区搜索" v-model:value="search_city" @pressEnter="citySearch" />
</template>

<style lang="stylus" scoped></style>
