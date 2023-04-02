<template>
  <div class="sla-collapse-container">
    <div class="sla-collapse-container_header" @click="changeVisible">
      <div class="header_title">{{ props.title }}</div>
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
  .sla-collapse-container_header {
    height: 48px;
    padding: 0 16px;
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: space-between;
    .header_title {
      font-weight: 600;
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
    overflow: hidden;
    height: 0;
    &.visible {
      transition: all 0.5s ease-in-out;
      height: 100%;
    }
  }
}
</style>
