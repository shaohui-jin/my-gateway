<template>
  <Code :options="options" :meta="meta" @changeMeta="changeMeta" />
  <div id="container" class="container"></div>
  <Options :meta="meta" @changeMeta="changeMeta" />
</template>

<script lang="ts" setup>
import { onMounted, watch, reactive, ref, defineAsyncComponent, getCurrentInstance } from 'vue';
import '@/utils/init-Jsmind';
import { Meta } from '@/interface/Mind';

const Code = defineAsyncComponent(() => import('./Code.vue'));
const Options = defineAsyncComponent(() => import('./Options.vue'));
const { appContext } = getCurrentInstance();

let meta = reactive<Meta>({
  name: 'jsMind remote',
  author: 'hizzgdev@163.com',
  version: '0.2',
});
let format = ref('node_tree');
let data = reactive({
  id: 'root',
  topic: 'jsMind',
  children: [
    {
      id: 'easy',
      topic: 'Easy',
      direction: 'left',
      children: [
        { id: 'easy1', topic: 'Easy to show' },
        { id: 'easy2', topic: 'Easy to edit' },
        { id: 'easy3', topic: 'Easy to store' },
        { id: 'easy4', topic: 'Easy to embed' },
        {
          id: 'other3',
          'background-image': 'ant.png',
          width: '100',
          height: '100',
        },
      ],
    },
    {
      id: 'open',
      topic: 'Open Source',
      direction: 'right',
      children: [
        {
          id: 'open1',
          topic: 'on GitHub',
          'background-color': '#eee',
          'foreground-color': 'blue',
          'leading-line-color': '#3333ff',
        },
        {
          id: 'open2',
          topic: 'BSD License',
          'leading-line-color': '#ff33ff',
        },
      ],
    },
    {
      id: 'powerful',
      topic: 'Powerful',
      direction: 'right',
      children: [
        { id: 'powerful1', topic: 'Base on Javascript' },
        { id: 'powerful2', topic: 'Base on HTML5' },
        { id: 'powerful3', topic: 'Depends on you' },
      ],
    },
    {
      id: 'other',
      topic: 'test node',
      direction: 'left',
      children: [
        { id: 'other1', topic: "I'm from local variable" },
        { id: 'other2', topic: 'I can do everything' },
      ],
    },
  ],
});
let options = reactive({
  container: 'container', // [必选] 容器的ID
  editable: false, // 是否启用编辑
  theme: null, // 主题
  mode: 'full', // 布局模式
  support_html: true, // 是否支持节点里的HTML元素
  log_level: 'info', // 日志级别
  view: {
    engine: 'canvas', // 思维导图各节点之间线条的绘制引擎
    hmargin: 100, // 思维导图距容器外框的最小水平距离
    vmargin: 50, // 思维导图距容器外框的最小垂直距离
    line_width: 2, // 思维导图线条的粗细
    line_color: '#555', // 思维导图线条的颜色
    draggable: false, // 当容器不能完全容纳思维导图时，是否允许拖动画布代替鼠标滚动
    hide_scrollbars_when_draggable: false, // 当设置 draggable = true 时，是否隐藏滚动条
    node_overflow: 'hidden', // 节点文本过长时的样式
  },
  layout: {
    hspace: 30, // 节点之间的水平间距
    vspace: 20, // 节点之间的垂直间距
    pspace: 13, // 节点与连接线之间的水平间距（用于容纳节点收缩/展开控制器）
  },
  shortcut: {
    enable: true, // 是否启用快捷键
    handles: {}, // 命名的快捷键事件处理器
    mapping: {
      // 快捷键映射
      addchild: [45, 4096 + 13], // <Insert>, <Ctrl> + <Enter>
      addbrother: 13, // <Enter>
      editnode: 113, // <F2>
      delnode: 46, // <Delete>
      toggle: 32, // <Space>
      left: 37, // <Left>
      up: 38, // <Up>
      right: 39, // <Right>
      down: 40, // <Down>
    },
  },
});

onMounted(() => {
  let mind = { meta, data, format: format.value };
  let jm = new window.jsMind(options);
  jm.show(mind);
  watch(
    [meta, format, data, options],
    () => {
      // let mind = { meta, data, format: format.value };
      console.log(meta, format, data, options);
      // let jm = new window.jsMind(options);
      jm.show(mind);
    },
    { immediate: true, deep: true }
  );
});

const changeMeta = (value: Meta) => {
  console.log('changeMeta', value);
  appContext.config.globalProperties.$setReactive(meta, value);
};
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
}
</style>
