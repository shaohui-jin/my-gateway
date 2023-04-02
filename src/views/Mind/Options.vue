<template>
  <div class="options-container">
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
  </div>
</template>

<script lang="ts" setup>
import type { CollapseOptionKey, Collapse } from '@/interface/Mind';
import { defineAsyncComponent, reactive, getCurrentInstance } from 'vue';
const MetaTab = defineAsyncComponent(() => import('./components/MetaTab.vue'));
const OptionsTab = defineAsyncComponent(() => import('./components/OptionsTab.vue'));
const appContext = getCurrentInstance()?.appContext;

const collapseOptions = reactive<Collapse>({
  meta: { title: '基本信息', visible: true },
  options: { title: '配置信息', visible: false },
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
  z-index: 1000;
  position: absolute;
  top: 10vh;
  right: 20px;
  height: 80vh;
  width: 350px;
  border-radius: 10px;
  background: var(--bg-color-float);
  box-shadow: 0 1px 3px 1px var(--card-shadow);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
</style>
