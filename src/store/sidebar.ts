import { defineStore } from 'pinia';

export const useSidebarButtonStatus = defineStore('sidebarButton', {
    state: () => {
        return {
            isCollapsed: false,
        };
    },
    actions: {
        toggle() {
            this.isCollapsed = !this.isCollapsed;
        },
    },
});
