<template>
  <div class="options-container">
    <div class="options-container_header">
      <template v-for="(h, hI) in header" :key="h.key">
        <span class="options-container_header-title" @click="h.onClick()">{{ h.title }}</span>
        <el-divider v-if="hI !== header.length - 1" direction="vertical" />
      </template>
    </div>
    <OptionsMeta v-if="optionType = meta" :meta="props.meta" @changeMeta="changeMeta" />
    <div class="options-container_footer">
      <el-progress :percentage="50" />
      <el-progress :percentage="100" :format="format" />
      <el-progress :percentage="100" status="success" />
      <el-progress :percentage="100" status="warning" />
      <el-progress :percentage="50" status="exception" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, defineAsyncComponent, reactive } from 'vue';
const OptionsMeta = defineAsyncComponent(() => import('./components/OptionsMeta.vue'));
import { Meta, Header } from '@/interface/Mind';
const props = defineProps({
  meta: {
    type: Object,
    require: true,
  },
});

const emit = defineEmits(['changeMeta']);
const changeMeta = (meta: Meta) => emit('changeMeta', meta);
let optionType = ref('');
const header = reactive<Header[]>([
  { title: '基本信息', key: 1, onClick: () => (optionType.value = 'meta') },
  { title: '基本信息1', key: 2, onClick: () => (optionType.value = 'meta') },
  { title: '基本信息2', key: 3, onClick: () => (optionType.value = 'meta') },
])
</script>

<style lang="less" scoped>
.options-container {
  z-index: 99999;
  position: absolute;
  top: 10vh;
  right: 20px;
  height: 80vh;
  width: 350px;
  background-color: rosybrown;
  border-radius: 10px;
  border: 1px solid #1c8bf8;
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
    }
  }
  .options-container_footer {
    height: 50px;
  }
}
</style>
