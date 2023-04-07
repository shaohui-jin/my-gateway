<template>
  <div class="sla-line-data-container">
    <div class="sla-line-data-container_label">{{ props.label }} ：</div>
    <div class="sla-line-data-container_slot">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
const props = defineProps({
  label: {
    type: String,
  },
});
</script>

<style lang="less" scoped>
.sla-line-data-container {
  padding-bottom: 6px;
  .sla-line-data-container_label {
    padding: 6px 6px 6px 12px;
    font-size: 14px;
    color: var(--text-color);
  }
  .sla-line-data-container_slot {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
