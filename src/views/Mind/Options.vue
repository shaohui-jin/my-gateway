<template>
  <div class="options-container">
    <sla-collaspe>
      <OptionItem
        key="options-container_meta"
        v-if="optionType === 'meta'"
        :option="props.meta"
        :formData="metaFormData"
        @changeOption="changeMeta"
      />
    </sla-collaspe>
    <OptionItem key="options-container_options" v-if="optionType === 'options'" :option="props.options" :formData="optionFormData" @changeOption="changeOptions" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, defineAsyncComponent, reactive } from 'vue';
const OptionItem = defineAsyncComponent(() => import('./components/OptionItem.vue'));
import type { Meta, Options, Header } from '@/interface/Mind';
import { ThemeOption } from '@/interface/Mind';
import { BaseOptionItem } from '@/interface/Option';
const props = defineProps({
  meta: {
    type: Object,
    require: true,
  },
  options: {
    type: Object,
    require: true,
  },
});

const metaFormData: BaseOptionItem[] = [
  { label: '名称', key: 'name', type: 'input' },
  { label: '作者', key: 'author', type: 'input' },
  { label: '作品版本', key: 'version', type: 'input' },
];
const optionFormData: BaseOptionItem[] = [
  { label: '容器标识', key: 'container', type: 'input', disabled: true },
  { label: '编辑权限', key: 'editable', type: 'switch' },
  { label: '主题', key: 'theme', type: 'select', options: ThemeOption },
];

let optionType = ref<string>('meta');
const header = reactive<Header[]>([
  { title: '基本信息', key: 1, onClick: () => (optionType.value = 'meta') },
  { title: '配置信息', key: 2, onClick: () => (optionType.value = 'options') },
  { title: '基本信息2', key: 3, onClick: () => (optionType.value = 'meta') },
]);

const emit = defineEmits(['changeMeta', 'changeOptions']);
const changeMeta = (meta: Meta) => emit('changeMeta', meta);
const changeOptions = (options: Options) => emit('changeOptions', options);
</script>

<style lang="less" scoped>
.options-container {
  z-index: 99999;
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
  .options-container_header {
    width: 100%;
    height: 48px;
    padding: 0 16px;
    line-height: 48px;
    .options-container_header-title {
      cursor: pointer;
      font-weight: 600;
      color: var(--text-color);
    }
  }
}
</style>
