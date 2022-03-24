import { defineStore } from 'pinia';
import { renderTempItem } from '@/axios/worldmap';

export const useCurrentWeather = defineStore<
    string,
    {
        data: renderTempItem[];
    },
    any,
    {
        set: (data: renderTempItem[]) => void;
    }
>('worldCurrentWeather', {
    state: () => {
        return {
            data: [],
        };
    },
    actions: {
        set(data) {
            this.data = data;
        },
    },
});
