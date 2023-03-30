<template>
  <div class="code-container">
    <!--    <el-input :value="JSON.stringify(props.meta, '', 4)" @input="changeMeta" :rows="20" type="textarea" />-->
    <!--    <el-input :value="JSON.stringify(props.meta, '', 4)" @input="changeMeta" :rows="20" type="textarea" />-->
    {{ props.meta }}
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue';
import { Meta } from '@/interface/Mind';

const props = defineProps({
  meta: {
    type: Object,
    require: true,
  },
});

const emit = defineEmits(['changeMeta']);
const changeMeta = (val: string) => {
  console.log('changeValue', val);
  emit('changeMeta', JSON.parse(val));
};
</script>

<style scoped>
.code-container {
  z-index: 99999;
  position: absolute;
  top: 10vh;
  left: 20px;
  height: 80vh;
  width: 300px;
  background-color: rosybrown;
  border-radius: 10px;
}
</style>
