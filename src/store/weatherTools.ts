import { defineStore } from 'pinia';
import { PreWeather30 } from '@/axios/weatherPre';
import { HistoricalTemp, HistoricalWeather } from '@/axios/weatherHistory';
import { CurrentWeather } from '@/axios/weatherCurrent';

export const useToolsDataStore = defineStore<
    string,
    {
        value: Array<{
            key: string;
            data: PreWeather30 | HistoricalTemp | HistoricalWeather | CurrentWeather;
        }>;
    },
    any,
    {
        set: (location: string, data: PreWeather30 | HistoricalTemp | HistoricalWeather | CurrentWeather) => void;
        delete: (location: string) => void;
        refresh: (location: string, data: PreWeather30 | HistoricalTemp | HistoricalWeather | CurrentWeather) => void;
        remake: () => void;
    }
>('preTools', {
    state: () => {
        return {
            value: [],
        };
    },
    actions: {
        set(location, data) {
            this.value.push({
                key: location,
                data,
            });
            console.log('Actions中进行了set', this.value);
        },
        delete(location) {
            const index = this.value.findIndex(item => item.key === location);
            this.value.splice(index, 1);
        },
        refresh(location, data) {
            this.value = this.value.filter(item => item.key !== location);
            this.set(location, data);
        },
        remake() {
            this.value = [];
        },
    },
});
