<template>
  <!--  <LeftComponent />-->
  <ToolBox />
  <RightComponent v-show="!has_setting" />
</template>

<script lang="ts" setup>
import { onMounted, defineAsyncComponent } from 'vue';
const LeftComponent = defineAsyncComponent(() => import('./Code.vue'));
const RightComponent = defineAsyncComponent(() => import('./Options.vue'));
const ToolBox = defineAsyncComponent(() => import('./component/ToolBox.vue'));
import { has_setting } from '@/views/Mind/utils';
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
