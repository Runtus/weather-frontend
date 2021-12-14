<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store/counter';

defineProps<{ msg?: string }>();

const store = useStore();

const count = ref(0);
</script>

<template>
    <div>
        hello
    </div>
</template>

<style scoped>

</style>
