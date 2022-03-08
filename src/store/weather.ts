import { defineStore } from 'pinia';
import { PreWeather30 } from '@/axios/weatherPre';

export const usePreWeatherStore = defineStore('preWeather', {
    state: () => {
        return {
            value: [{}],
        };
    },
    actions: {
        set(preWeather: PreWeather30) {
            this.value = preWeather;
        },
    },
});
