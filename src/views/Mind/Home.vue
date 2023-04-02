<template>
  <LeftComponent />
  <div id="container" class="container"></div>
  <RightComponent />
</template>

<script lang="ts" setup>
import { onMounted, defineAsyncComponent } from 'vue';
const LeftComponent = defineAsyncComponent(() => import('./Code.vue'));
const RightComponent = defineAsyncComponent(() => import('./Options.vue'));

import { open_view } from './utils';
onMounted(() => {
  open_view();
});
</script>
<style lang="less" scoped>
body {
  color: var(--text-color);
}
.container {
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-color);
}
</style>
