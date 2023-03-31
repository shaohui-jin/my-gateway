<template>
  <div class="option-item-container">
    <el-form :model="props.option" label-width="80px">
      <el-form-item v-for="o in props.formData" :key="o.key" :label="o.label">
        <el-input v-if="o.type === 'input'" v-model="option[o.key]" />
        <el-select v-else-if="o.type === 'select'" v-model="option[o.key]">
          <el-option v-for="oItem in o.options" :key="oItem.value" :label="oItem.label" :value="oItem.value" />
        </el-select>
        <el-switch v-else-if="o.type === 'switch'" v-model="option[o.key]" />
        {{ o.option }}
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存信息</el-button>
        <el-button @click="cancel">取消修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, reactive, watch } from 'vue';

const props = defineProps({
  option: {
    type: Object,
    require: true,
  },
  formData: {
    type: Object,
    require: true,
  },
});
const emit = defineEmits(['changeOption']);
const option = reactive(JSON.parse(JSON.stringify(props.option)));
console.log(props.option, props.formData, option);

const onSubmit = () => emit('changeOption', option);
const cancel = () => emit('changeOption', option);
</script>

<style scoped>
.option-item-container {
  height: 100%;
}
</style>
