<template>
  <div class="tool-box-container">
    <el-popover :visible="visible" :width="150">
      <template #reference>
        <el-icon :size="30" v-if="!has_init" @click="visible = !visible"><Plus /></el-icon>
      </template>
      <template #default>
        <div class="tool-body">
          <span class="tool-box_line" @click="open_view('empty'), (visible = false)">
            <el-icon :size="30" label="new"><Folder /></el-icon>
            <span>新建空模版</span>
          </span>
          <span class="tool-box_line" @click="open_view('default'), (visible = false)">
            <el-icon :size="30"><FolderAdd /></el-icon>
            <span>新建模版数据</span>
          </span>
        </div>
      </template>
    </el-popover>
    <el-icon :size="30" v-if="has_init" @click="handleInit(false)"><Minus /></el-icon>
    <el-icon :size="30" v-if="has_init" @click="copyData"><CopyDocument /></el-icon>
    <el-icon :size="30" v-if="has_init" @click="screen_shot"><Camera /></el-icon>
    <el-icon :size="30" v-if="has_init" @click="has_setting = !has_setting"><Setting /></el-icon>
    <!--    <el-icon :size="30" v-if="has_init"><More /></el-icon>-->
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Plus, CopyDocument, Setting, Camera, More, Folder, FolderAdd, Minus } from '@element-plus/icons-vue';
import { has_init, has_setting, handleInit, copyData, open_view, screen_shot } from '@/views/Mind/utils';

const visible = ref<boolean>(false);
</script>

<style lang="less" scoped>
.tool-box-container {
  z-index: 10001;
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 250px;
  display: flex;
  justify-content: space-around;
  .el-icon {
    cursor: pointer;
    color: var(--text-color);
    &:hover {
      color: var(--border-hover-color);
    }
  }
}
.tool-body {
  display: flex;
  flex-direction: column;
  width: 100%;
  .tool-box_line {
    display: flex;
    flex-direction: row;
    align-items: center;
    span {
      margin-left: 5px;
    }
    &:hover {
      cursor: pointer;
      color: var(--border-hover-color);
    }
  }
}
</style>
