<template>
  <div class="meta-container">
    <el-form :model="meta" label-width="80px">
      <el-form-item label="作品名称">
        <el-input v-model="meta.name" />
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="meta.author" />
      </el-form-item>
      <el-form-item label="作品版本">
        <el-input v-model="meta.version" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存信息</el-button>
        <el-button @click="cancel">取消修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, reactive } from 'vue';

const props = defineProps({
  meta: {
    type: Object,
    require: true,
  },
});

const emit = defineEmits(['changeMeta']);
const meta = reactive(JSON.parse(JSON.stringify(props.meta)));
const onSubmit = () => emit('changeMeta', meta);
const cancel = () => emit('changeMeta', meta);
</script>

<style scoped>
.meta-container {
  height: 100%;
}
</style>
