<template>
  <div class="options-tab-container">
    <el-form :model="options" label-width="120px">
      <el-form-item label="容器标识">
        <el-input v-model="options.container" style="width: 90%" disabled />
      </el-form-item>
      <el-form-item label="编辑">
        <el-switch v-model="options.editable" @change="handle_editable" />
      </el-form-item>
      <el-form-item label="主题">
        <el-select v-model="options.theme" style="width: 90%" @change="set_theme">
          <el-option v-for="(oItem, oIndex) in ThemeOption" :key="oIndex" :label="oItem.label" :value="oItem.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="支持HTML">
        <el-switch v-model="options.support_html" @change="handle_support_html" />
      </el-form-item>
      <el-form-item label="日志级别">
        <el-select v-model="options.log_level" style="width: 90%" @change="set_log_level">
          <el-option v-for="(oItem, oIndex) in LogLevelOption" :key="oIndex" :label="oItem.label" :value="oItem.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ThemeOption, LogLevelOption } from '@/interface/Mind';
import { handle_editable, handle_support_html, set_theme, set_log_level, options } from '@/views/Mind/utils';
</script>
<style lang="less" scoped>
.options-tab-container {
  //height: 100%;
  flex: 1;
  font-size: 14px;
  :deep(.el-input__wrapper) {
    background-color: var(--bg-color-float);
    border: var(--text-color);
  }
}
</style>
