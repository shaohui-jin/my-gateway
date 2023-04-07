<template>
  <div class="view-tab-container">
    <sla-line-data label="绘制引擎">
      <el-select v-model="options.view.engine" style="width: 90%">
        <el-option v-for="(oItem, oIndex) in EngineOption" :key="oIndex" :label="oItem.label" :value="oItem.value"></el-option>
      </el-select>
    </sla-line-data>
    <sla-line-data label="容器外框的最小水平距离">
      <el-input v-model.number="options.view.hmargin" style="width: 90%" />
    </sla-line-data>
    <sla-line-data label="容器外框的最小垂直距离">
      <el-input v-model.number="options.view.vmargin" style="width: 90%" />
    </sla-line-data>
    <sla-line-data label="线条的粗细">
      <el-input v-model.number="options.view.line_width" style="width: 90%" />
    </sla-line-data>
    <sla-line-data label="线条的颜色">
      <el-input type="color" v-model="options.view.line_color" style="width: 90%" />
    </sla-line-data>
    <sla-line-data label="是否拖动">
      <el-switch v-model="options.view.draggable" />
    </sla-line-data>
    <sla-line-data v-if="options.view.draggable" label="是否显示滚动条">
      <el-switch v-model="options.view.hide_scrollbars_when_draggable" />
    </sla-line-data>
    <sla-line-data label="节点过长样式">
      <el-select v-model="options.view.node_overflow" style="width: 90%" @change="set_theme">
        <el-option v-for="(oItem, oIndex) in NodeOverflowOption" :key="oIndex" :label="oItem.label" :value="oItem.value"></el-option>
      </el-select>
    </sla-line-data>
  </div>
</template>

<script lang="ts" setup>
import { EngineOption, NodeOverflowOption } from '@/interface/Mind';
import { set_theme, reload, options } from '@/views/Mind/utils';
</script>
<style lang="less" scoped>
.view-tab-container {
  height: 100%;
  font-size: 14px;
  :deep(.el-input__wrapper) {
    background-color: var(--bg-color-float);
    border: var(--text-color);
  }
}
</style>
