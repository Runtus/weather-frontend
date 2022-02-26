/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from 'vite';
// @ts-ignore
import * as path from 'path';
import vue from '@vitejs/plugin-vue';
import { createStyleImportPlugin } from 'vite-plugin-style-import';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        // Ant-Design 引入问题
        createStyleImportPlugin({
            libs: [
                {
                    libraryName: 'ant-design-vue',
                    esModule: true,
                    resolveStyle: name => {
                        return `ant-design-vue/es/${name}/style/css`;
                    },
                },
            ],
        }),
    ],
    resolve: {
        alias: {
            // @ts-ignore
            '@': path.resolve(__dirname, './src'),
        },
    },
});
