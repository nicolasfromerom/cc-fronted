<template>
  <LayoutComponent></LayoutComponent>
  <div class="container mt-4">
  
        <div class="row">
            <div class="col-10 offset-1">
                <router-view></router-view>
            </div>
        </div>
    </div>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav> -->
  
</template>

<script>
import { defineAsyncComponent } from 'vue';

export default {
    components: {
      LayoutComponent: defineAsyncComponent( () => import('@/layouts/Layout.vue'))
    }
}

</script>

