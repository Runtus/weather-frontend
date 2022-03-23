import { defineStore } from 'pinia';

export const useLocationSearchResult = defineStore('locationSearch', {
    state: () => {
        return {
            location: '北京', // 默认为成都
        };
    },
    actions: {
        set(value: string) {
            this.location = value;
        },
    },
});
