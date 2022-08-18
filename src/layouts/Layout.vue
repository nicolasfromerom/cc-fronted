<template>
    <NavBar></NavBar>
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    name: 'LayoutComponent',
    components: {
        NavBar: defineAsyncComponent( () => import('@/components/NavBar.vue'))
    }
}
</script>

<style>

</style>