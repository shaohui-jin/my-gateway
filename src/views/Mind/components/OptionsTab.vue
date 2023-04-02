<template>
  <div class="options-tab-container">
    <el-form :model="options" label-width="80px">
      <el-form-item label="容器标识">
        <el-input v-model="options.container" style="width: 90%" disabled />
      </el-form-item>
      <el-form-item label="编辑">
        <el-switch v-model="options.editable" @change="changeEdit" />
      </el-form-item>
      <el-form-item label="主题">
        <el-select v-model="options.theme" style="width: 90%" @change="changeTheme">
          <el-option v-for="(oItem, oIndex) in ThemeOption" :key="oIndex" :label="oItem.label" :value="oItem.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ThemeOption, THEME } from '@/interface/Mind';
import { handle_editable, set_theme, options } from '@/views/Mind/utils';

const changeTheme = (theme: THEME) => set_theme(theme);
const changeEdit = (bool: boolean) => handle_editable(bool);
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
