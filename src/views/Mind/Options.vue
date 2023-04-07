<template>
  <div class="options-container">
    <div class="options-container_body">
      <sla-collapse
        :title="collapseOptions['meta'].title"
        v-model:visible="collapseOptions['meta'].visible"
        @handle-tab="bool => handleVisible('meta', bool)"
      >
        <MetaTab />
      </sla-collapse>
      <sla-collapse
        :title="collapseOptions['options'].title"
        v-model:visible="collapseOptions['options'].visible"
        @handle-tab="bool => handleVisible('options', bool)"
      >
        <OptionsTab />
      </sla-collapse>
      <sla-collapse
        :title="collapseOptions['view'].title"
        v-model:visible="collapseOptions['view'].visible"
        @handle-tab="bool => handleVisible('view', bool)"
      >
        <ViewTab />
      </sla-collapse>
    </div>
    <div class="options-container_footer">
      <el-button @click="save_setting">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { CollapseOptionKey, Collapse } from '@/interface/Mind';
import { save_setting } from '@/views/Mind/utils';
import { defineAsyncComponent, reactive, getCurrentInstance } from 'vue';
const MetaTab = defineAsyncComponent(() => import('./page/MetaTab.vue'));
const OptionsTab = defineAsyncComponent(() => import('./page/OptionsTab.vue'));
const ViewTab = defineAsyncComponent(() => import('./page/ViewTab.vue'));
const appContext: any = getCurrentInstance()?.appContext;

const collapseOptions = reactive<Collapse>({
  meta: { title: '元数据', visible: true },
  options: { title: '配置信息', visible: false },
  view: { title: '视图信息', visible: false },
});
const handleVisible = (type: CollapseOptionKey, bool: boolean) => {
  const options: Collapse = JSON.parse(JSON.stringify(collapseOptions));
  // 打开的时候关闭其他，防止关闭时打开其他
  if (bool) {
    (Object.keys(options) as CollapseOptionKey[]).forEach((key: CollapseOptionKey) => {
      if (key !== type) {
        options[key].visible = !bool;
      }
    });
    appContext.config.globalProperties.$setReactive(collapseOptions, options);
  }
};
</script>

<style lang="less" scoped>
.options-container {
  z-index: 1100;
  position: absolute;
  top: 10vh;
  left: 50%;
  transform: translateX(-50%);
  height: 80vh;
  min-width: 300px;
  border-radius: 10px;
  background: var(--bg-color-float);
  box-shadow: 0 1px 3px 1px var(--card-shadow);
  //display: flex;
  //flex-direction: column;
  //overflow: hidden;
  .options-container_body {
    //height: 75vh;
    height: calc(100% - 50px);
    //overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .options-container_footer {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-top: 2px solid var(--border-color);
    .el-button {
      color: var(--text-color);
      background-color: var(--bg-color-float);
      &:hover {
        color: var(--text-hover-color);
        border-color: var(--border-hover-color);
      }
    }
  }
}
</style>
