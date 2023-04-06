<template>
  <div class="code-container">
    <!--        <el-input v-mode="JSON.stringify(meta, '', 4)" @input="changeMeta" :rows="20" type="textarea" />-->
    <!--        <el-input :value="JSON.stringify(meta, '', 4)" @input="changeMeta" :rows="20" type="textarea" />-->
    {{ data }}
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import { data_type, emptyData, defaultData } from '@/views/Mind/utils';
const data = reactive(data_type.value === 'empty' ? emptyData : defaultData);
</script>

<style scoped>
.code-container {
  z-index: 1000;
  position: absolute;
  top: 10vh;
  left: 20px;
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
