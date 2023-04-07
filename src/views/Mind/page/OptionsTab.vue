<template>
  <div class="options-tab-container">
    <sla-line-data label="容器标识">
      <el-input v-model="options.container" style="width: 90%" disabled />
    </sla-line-data>
    <sla-line-data label="编辑">
      <el-switch v-model="options.editable" @change="handle_editable" />
    </sla-line-data>
    <sla-line-data label="主题">
      <el-select v-model="options.theme" style="width: 90%" @change="set_theme">
        <el-option v-for="(oItem, oIndex) in ThemeOption" :key="oIndex" :label="oItem.label" :value="oItem.value"></el-option>
      </el-select>
    </sla-line-data>
    <sla-line-data label="支持HTML">
      <el-switch v-model="options.support_html" @change="handle_support_html" />
    </sla-line-data>
    <sla-line-data label="日志级别">
      <el-select v-model="options.log_level" style="width: 90%" @change="set_log_level">
        <el-option v-for="(oItem, oIndex) in LogLevelOption" :key="oIndex" :label="oItem.label" :value="oItem.value"></el-option>
      </el-select>
    </sla-line-data>
  </div>
</template>

<script lang="ts" setup>
import { ThemeOption, LogLevelOption } from '@/interface/Mind';
import { handle_editable, handle_support_html, set_theme, set_log_level, options } from '@/views/Mind/utils';
</script>
<style lang="less" scoped>
.options-tab-container {
  height: 100%;
  font-size: 14px;
  :deep(.el-input__wrapper) {
    background-color: var(--bg-color-float);
    border: var(--text-color);
  }
}
</style>
