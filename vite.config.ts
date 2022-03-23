/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from 'vite';
// @ts-ignore
import * as path from 'path';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // Ant-Design 引入问题
        Components({
            resolvers: [AntDesignVueResolver()],
        }),
    ],
    resolve: {
        alias: {
            // @ts-ignore
            '@': path.resolve(__dirname, './src'),
        },
    },
});
