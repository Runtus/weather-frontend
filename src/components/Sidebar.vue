<script lang="ts" setup>
// 路由在这里控制
import { defineProps, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { Menu, MenuItem } from 'ant-design-vue';
import { CalendarOutlined, EnvironmentOutlined, CloudOutlined, HistoryOutlined, LineChartOutlined } from '@ant-design/icons-vue';
import { useSidebarButtonStatus } from '@/store/sidebar';

const buttonStatus = useSidebarButtonStatus();
const router = useRouter();

const onSelect = (obj: { key: string }) => {
    if (obj.key) {
        router.push(`/${obj.key}`);
    }
};
</script>

<template>
    <div class="MenuBox h-full" :class="buttonStatus.isCollapsed ? 'collapsed' : 'uncollapsed'">
        <div class="title w-full flex items-center justify-center">TODO 某张图片占据</div>
        <Menu mode="inline" theme="dark" class="menu" @select="onSelect" :inline-collapsed="buttonStatus.isCollapsed">
            <MenuItem key="worldMap">
                <template #icon>
                    <EnvironmentOutlined />
                </template>
                <span>世界地图工具</span>
            </MenuItem>
            <MenuItem key="current">
                <template #icon>
                    <CloudOutlined />
                </template>
                <span>实时天气查看</span>
            </MenuItem>
            <MenuItem key="pre">
                <template #icon>
                    <CalendarOutlined />
                </template>
                <span>天气预报</span>
            </MenuItem>
            <MenuItem key="historical">
                <template #icon>
                    <HistoryOutlined />
                </template>
                <span>历史天气图表统计</span>
            </MenuItem>
            <MenuItem key="tools">
                <template #icon>
                    <LineChartOutlined />
                </template>
                <span>图表自定义工具</span>
            </MenuItem>
        </Menu>
    </div>
</template>

<style lang="stylus" scoped>


.MenuBox {
    transition: width 0.3s cubic-bezier(0.2, 0, 0, 1) 0s ;


    .title {
        color: #fff;
        background: #001529;
        height: 100px;
    }

    .menu {
        height: calc(100% - 100px);
    }
}

.collapsed {
    width: 80px;
}

.uncollapsed {
    width: 16rem;
}
</style>
