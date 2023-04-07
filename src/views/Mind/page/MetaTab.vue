<template>
  <div class="meta-tab-container">
    <sla-line-data label="名称">
      <el-input v-model="meta.name" style="width: 90%" />
    </sla-line-data>
    <sla-line-data label="姓名">
      <el-input v-model="meta.author" style="width: 90%" />
    </sla-line-data>
    <sla-line-data label="作品版本">
      <el-input v-model="meta.version" style="width: 90%" />
    </sla-line-data>
  </div>
</template>

<script lang="ts" setup>
import { meta } from '@/views/Mind/utils';
</script>
<style lang="less" scoped>
.meta-tab-container {
  height: 100%;
  :deep(.el-input__wrapper) {
    background-color: var(--bg-color-float);
    border: var(--text-color);
  }
}
</style>
