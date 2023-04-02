<template>
  <div class="code-container">
    <!--        <el-input v-mode="JSON.stringify(meta, '', 4)" @input="changeMeta" :rows="20" type="textarea" />-->
    <!--        <el-input :value="JSON.stringify(meta, '', 4)" @input="changeMeta" :rows="20" type="textarea" />-->
    {{ meta }}
    <hr />
    {{ options }}
  </div>
</template>

<script lang="ts" setup>
import { meta, options } from '@/views/Mind/utils';
</script>

<style scoped>
.code-container {
  z-index: 1000;
  position: absolute;
  top: 10vh;
  left: 20px;
  height: 80vh;
  width: 300px;
  background-color: rosybrown;
  border-radius: 10px;
}
</style>
