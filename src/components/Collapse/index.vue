<template>
  <div class="sla-collapse-container" :class="[visible ? 'show' : 'close']">
    <div class="sla-collapse-container_header" @click="changeVisible">
      <div class="header_title" :class="{ selected: visible }">{{ props.title }}</div>
      <el-icon :class="{ 'arrow-up': visible }"><ArrowUp /></el-icon>
    </div>
    <div class="sla-collapse-container_body" :class="{ visible: props.visible }">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue';
import { ArrowUp } from '@element-plus/icons-vue';
const props = defineProps({
  title: {
    type: String,
  },
  visible: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:visible', 'handle-tab']);
const changeVisible = () => {
  emit('update:visible', !props.visible);
  emit('handle-tab', !props.visible);
};
</script>

<style lang="less" scoped>
.sla-collapse-container {
  &.show {
    flex: 1;
  }
  &.close {
    height: 38px;
  }
  display: flex;
  flex-direction: column;
  .sla-collapse-container_header {
    height: 38px;
    padding: 0 12px;
    font-size: 14px;
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header_title {
      font-weight: 500;
      &.selected {
        color: var(--text-hover-color);
      }
    }
    &:hover {
      cursor: pointer;
    }
    .el-icon {
      transition: all 0.5s;
      &.arrow-up {
        transform: rotate(180deg);
      }
    }
  }
  .sla-collapse-container_body {
    height: 0;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
    &.visible {
      transition: all 0.5s ease-in-out;
      flex: 1 1 0;
      border-top: 1px solid var(--text-hover-color);
    }
  }
}
</style>
