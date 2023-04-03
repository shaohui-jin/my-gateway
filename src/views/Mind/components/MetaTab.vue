<template>
  <div class="meta-tab-container">
    <el-form :model="meta" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="meta.name" style="width: 90%" />
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="meta.author" style="width: 90%" />
      </el-form-item>
      <el-form-item label="作品版本">
        <el-input v-model="meta.version" style="width: 90%" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { meta } from '@/views/Mind/utils';
</script>
<style lang="less" scoped>
.meta-tab-container {
  height: 100%;
  flex: 1;
  :deep(.el-input__wrapper) {
    background-color: var(--bg-color-float);
    border: var(--text-color);
  }
}
</style>
