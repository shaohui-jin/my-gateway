<template>
  <div class="sla-progress-container">
    <el-progress :percentage="50" />
    <el-progress :percentage="percentage" :color="customColors" />
    <el-progress :percentage="100" status="success" />
    <el-progress :percentage="100" status="warning" />
    <el-progress :percentage="50" status="exception" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Minus, Plus } from '@element-plus/icons-vue';
import { defineProps } from 'vue';

const percentage = ref(20);
const customColor = ref('#409eff');

const customColors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
];

const customColorMethod = (percentage: number) => {
  if (percentage < 30) {
    return '#909399';
  }
  if (percentage < 70) {
    return '#e6a23c';
  }
  return '#67c23a';
};
const increase = () => {
  percentage.value += 10;
  if (percentage.value > 100) {
    percentage.value = 100;
  }
};
const decrease = () => {
  percentage.value -= 10;
  if (percentage.value < 0) {
    percentage.value = 0;
  }
};
const props = defineProps({
  percentage: {
    type: Number,
    default: 20,
  }
});
</script>

<style lang="less" scoped>
.sla-progress-container {
  height: 50px;
  &.el-progress--line {
    margin-bottom: 15px;
    width: 350px;
  }
}
</style>
