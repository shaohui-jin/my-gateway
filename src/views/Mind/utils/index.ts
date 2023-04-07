import { reactive, ref, getCurrentInstance } from 'vue';
import { ElMessage } from 'element-plus';
import { LOGLEVEL, Meta, MODE, Options, THEME, ENGINE, NODE_OVERFLOW } from '@/interface/Mind';
import copy from 'copy-to-clipboard';
import '@/utils/init-Jsmind';
import 'jsmind/js/jsmind.draggable-node.js'; // 基于 window.jsMind
import 'jsmind/js/jsmind.screenshot.js'; // 基于 window.jsMind

export const meta: Meta = reactive<Meta>({
  name: 'jsMind-demo',
  author: 'demo@163.com',
  version: '0.0.1',
});
export const format = ref('node_tree');
export const defaultData = reactive({
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
export const emptyData = reactive({
  id: 'root',
  topic: 'jsMind',
});
export const options: Options = reactive<Options>({
  container: 'container',
  editable: true,
  theme: THEME.BELIZEHOLE,
  mode: MODE.FULL,
  support_html: true,
  log_level: LOGLEVEL.INFO,
  view: {
    engine: ENGINE.SVG,
    hmargin: 100,
    vmargin: 50,
    line_width: 2,
    line_color: '#555',
    draggable: true,
    hide_scrollbars_when_draggable: true,
    node_overflow: NODE_OVERFLOW.HIDDEN,
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
export let _jm: any = null;
export const data_type = ref<'default' | 'empty'>('empty');
export const has_init = ref<boolean>(false);
export const has_setting = ref<boolean>(true);

/**
 * 拷贝数据
 */
export const copyData = () => {
  const mind = {
    meta,
    data: data_type.value === 'empty' ? emptyData : defaultData,
    format: format.value,
  };
  copy(JSON.stringify(mind));
  ElMessage.success('复制成功');
};

/**
 * 初始化配置表格
 */
export const open_setting_view = (type: 'default' | 'empty' = 'empty') => {
  data_type.value = type;
  has_setting.value = false;
};

/**
 * 保存配置信息
 */
export const save_setting = () => {
  has_setting.value = true;
  init(true);
  init_mind();
};

/**
 * 初始化容器
 * @param bool
 */
export const init = (bool: boolean) => (bool ? init_container() : destroy_container());

/**
 * 渲染容器
 */
const init_container = () => {
  const app: HTMLElement = document.getElementById('app') || new HTMLElement();
  const div = document.createElement('div');
  div.id = `${options.container}`;
  div.className = 'container';
  div.style.width = '100vw';
  div.style.height = '100vh';
  div.style.backgroundColor = `var(--bg-color)`;
  app.appendChild(div);
  has_init.value = true;
};

/**
 * 销毁容器
 */
const destroy_container = () => {
  const app: HTMLElement = document.getElementById('app') || new HTMLElement();
  app.removeChild(document.getElementsByClassName('container')[0] as HTMLElement);
  has_init.value = false;
};

/**
 * 渲染mind
 */
const init_mind = () => {
  const mind = {
    meta,
    data: data_type.value === 'empty' ? emptyData : defaultData,
    format: format.value,
  };
  _jm = new window.jsMind(options);
  _jm.show(mind);
};

/**
 * 设置主题
 * @param theme_name
 */
export const set_theme = (theme_name: THEME) => _jm.set_theme(theme_name);

/**
 * 设置 是否启用编辑
 * @param bool
 */
export const handle_editable = (bool: boolean) => {
  if (bool) {
    _jm.enable_edit();
    ElMessage.success('当前思维导图状态：可操作');
  } else {
    _jm.disable_edit();
    ElMessage.warning('当前思维导图状态：不可操作');
  }
};

/**
 * 设置 是否支持节点里的HTML元素
 * @param bool
 */
export const handle_support_html = (bool: boolean) => {
  // todo 这里没实际相应
  if (bool) {
    ElMessage.success('当前思维导图状态：支持节点里的HTML元素');
  } else {
    ElMessage.warning('当前思维导图状态：不支持节点里的HTML元素');
  }
};

/**
 * 设置 日志级别
 * @param log_level
 */
export const set_log_level = (log_level: LOGLEVEL) => {
  // todo 这里没实际相应
  ElMessage.success(`当前思维导图日志级别：${log_level}`);
};

/**
 * 截图下载
 */
export const screen_shot = () => {
  _jm.screenshot.shootDownload();
};

export const reload = () => {
  // _jm._reset();
  // const mind = { meta, data, format: format.value };
  // _jm.show(mind);
  // todo 这里没实际相应
  // _jm.init();
};
// // this method change size of container, perpare for adjusting jsmind
// function change_container() {
//   const c = document.getElementById('jsmind_container');
//   c.style.width = '800px';
//   c.style.height = '500px';
// }
//
export const resize_jsmind = () => {
  _jm.resize();
};

// function open_json() {
//   const mind = {
//     meta: {
//       name: 'jsMind remote',
//       author: 'hizzgdev@163.com',
//       version: '0.2',
//     },
//     format: 'node_tree',
//     data: {
//       id: 'root',
//       topic: 'jsMind',
//       children: [
//         {
//           id: 'easy',
//           topic: 'Easy',
//           direction: 'left',
//           children: [
//             { id: 'easy1', topic: 'Easy to show' },
//             { id: 'easy2', topic: 'Easy to edit' },
//             { id: 'easy3', topic: 'Easy to store' },
//             { id: 'easy4', topic: 'Easy to embed' },
//             {
//               id: 'other3',
//               'background-image': 'ant.png',
//               width: '100',
//               height: '100',
//             },
//           ],
//         },
//         {
//           id: 'open',
//           topic: 'Open Source',
//           direction: 'right',
//           children: [
//             {
//               id: 'open1',
//               topic: 'on GitHub',
//               'background-color': '#eee',
//               'foreground-color': 'blue',
//               'leading-line-color': '#3333ff',
//             },
//             {
//               id: 'open2',
//               topic: 'BSD License',
//               'leading-line-color': '#ff33ff',
//             },
//           ],
//         },
//         {
//           id: 'powerful',
//           topic: 'Powerful',
//           direction: 'right',
//           children: [
//             { id: 'powerful1', topic: 'Base on Javascript' },
//             { id: 'powerful2', topic: 'Base on HTML5' },
//             { id: 'powerful3', topic: 'Depends on you' },
//           ],
//         },
//         {
//           id: 'other',
//           topic: 'test node',
//           direction: 'left',
//           children: [
//             { id: 'other1', topic: "I'm from local variable" },
//             { id: 'other2', topic: 'I can do everything' },
//           ],
//         },
//       ],
//     },
//   };
//   _jm.show(mind);
// }
//
// function open_ajax() {
//   const mind_url = 'data_example.json';
//   window.jsMind.util.ajax.get(mind_url, function (mind) {
//     _jm.show(mind);
//   });
// }
//
// function screen_shot() {
//   _jm.screenshot.shootDownload();
// }
//
// function show_data() {
//   const mind_data = _jm.get_data();
//   const mind_string = window.jsMind.util.json.json2string(mind_data);
//   prompt_info(mind_string);
// }
//
// function save_file() {
//   const mind_data = _jm.get_data();
//   const mind_name = mind_data.meta.name;
//   const mind_str = window.jsMind.util.json.json2string(mind_data);
//   window.jsMind.util.file.save(mind_str, 'text/jsmind', mind_name + '.jm');
// }
//
// function open_file() {
//   const file_input = document.getElementById('file_input');
//   const files = file_input.files;
//   if (files.length > 0) {
//     const file_data = files[0];
//     window.jsMind.util.file.read(file_data, function (jsmind_data, jsmind_name) {
//       const mind = window.jsMind.util.json.string2json(jsmind_data);
//       if (mind) {
//         _jm.show(mind);
//       } else {
//         prompt_info('can not open this file as mindmap');
//       }
//     });
//   } else {
//     prompt_info('please choose a file first');
//   }
// }
//
// function select_node() {
//   const nodeid = 'other';
//   _jm.select_node(nodeid);
// }
//
// function show_selected() {
//   const selected_node = _jm.get_selected_node();
//   if (selected_node) {
//     prompt_info(selected_node.topic);
//   } else {
//     prompt_info('nothing');
//   }
// }
//
// function get_selected_nodeid() {
//   const selected_node = _jm.get_selected_node();
//   if (selected_node) {
//     return selected_node.id;
//   } else {
//     return null;
//   }
// }
//
// function add_node() {
//   const selected_node = _jm.get_selected_node(); // as parent of new node
//   if (!selected_node) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   const nodeid = window.jsMind.util.uuid.newid();
//   const topic = '* Node_' + nodeid.substr(nodeid.length - 6) + ' *';
//   const node = _jm.add_node(selected_node, nodeid, topic);
// }
//
// const imageChooser = document.getElementById('image-chooser');
//
// imageChooser.addEventListener(
//   'change',
//   function (event) {
//     // Read file here.
//     const reader = new FileReader();
//     reader.onloadend = function () {
//       const selected_node = _jm.get_selected_node();
//       const nodeid = window.jsMind.util.uuid.newid();
//       const topic = undefined;
//       const data = {
//         'background-image': reader.result,
//         width: '100',
//         height: '100',
//       };
//       const node = _jm.add_node(selected_node, nodeid, topic, data);
//       //var node = _jm.add_image_node(selected_node, nodeid, reader.result, 100, 100);
//       //add_image_node:function(parent_node, nodeid, image, width, height, data, idx, direction, expanded){
//     };
//
//     const file = imageChooser.files[0];
//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   },
//   false
// );
//
// function add_image_node() {
//   const selected_node = _jm.get_selected_node(); // as parent of new node
//   if (!selected_node) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   imageChooser.focus();
//   imageChooser.click();
// }
//
// function modify_node() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   // modify the topic
//   _jm.update_node(selected_id, '--- modified ---');
// }
//
// function move_to_first() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   _jm.move_node(selected_id, '_first_');
// }
//
// function move_to_last() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   _jm.move_node(selected_id, '_last_');
// }
//
// function move_node() {
//   // move a node before another
//   _jm.move_node('other', 'open');
// }
//
// function remove_node() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   _jm.remove_node(selected_id);
// }
//
// function change_text_font() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   _jm.set_node_font_style(selected_id, 28);
// }
//
// function change_text_color() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   _jm.set_node_color(selected_id, null, '#000');
// }
//
// function change_background_color() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   _jm.set_node_color(selected_id, '#eee', null);
// }
//
// function change_background_image() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   _jm.set_node_background_image(selected_id, 'ant.png', 100, 100);
// }
//

//
// const zoomInButton = document.getElementById('zoom-in-button');
// const zoomOutButton = document.getElementById('zoom-out-button');
//
// function zoomIn() {
//   if (_jm.view.zoomIn()) {
//     zoomOutButton.disabled = false;
//   } else {
//     zoomInButton.disabled = true;
//   }
// }
//
// function zoomOut() {
//   if (_jm.view.zoomOut()) {
//     zoomInButton.disabled = false;
//   } else {
//     zoomOutButton.disabled = true;
//   }
// }
//

//

//
// function expand() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   _jm.expand_node(selected_id);
// }
//
// function collapse() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   _jm.collapse_node(selected_id);
// }
//
// function toggle() {
//   const selected_id = get_selected_nodeid();
//   if (!selected_id) {
//     prompt_info('please select a node first.');
//     return;
//   }
//
//   _jm.toggle_node(selected_id);
// }
//
// function expand_all() {
//   _jm.expand_all();
// }
//
// function expand_to_level2() {
//   _jm.expand_to_depth(2);
// }
//
// function expand_to_level3() {
//   _jm.expand_to_depth(3);
// }
//
// function collapse_all() {
//   _jm.collapse_all();
// }
//
// function get_nodearray_data() {
//   const mind_data = _jm.get_data('node_array');
//   const mind_string = window.jsMind.util.json.json2string(mind_data);
//   prompt_info(mind_string);
// }
//
// function save_nodearray_file() {
//   const mind_data = _jm.get_data('node_array');
//   const mind_name = mind_data.meta.name;
//   const mind_str = window.jsMind.util.json.json2string(mind_data);
//   window.jsMind.util.file.save(mind_str, 'text/jsmind', mind_name + '.jm');
// }
//
// function open_nodearray() {
//   const file_input = document.getElementById('file_input_nodearray');
//   const files = file_input.files;
//   if (files.length > 0) {
//     const file_data = files[0];
//     window.jsMind.util.file.read(file_data, function (jsmind_data, jsmind_name) {
//       const mind = window.jsMind.util.json.string2json(jsmind_data);
//       if (mind) {
//         _jm.show(mind);
//       } else {
//         prompt_info('can not open this file as mindmap');
//       }
//     });
//   } else {
//     prompt_info('please choose a file first');
//   }
// }
//
// function get_freemind_data() {
//   const mind_data = _jm.get_data('freemind');
//   const mind_string = window.jsMind.util.json.json2string(mind_data);
//   alert(mind_string);
// }
//
// function save_freemind_file() {
//   const mind_data = _jm.get_data('freemind');
//   const mind_name = mind_data.meta.name || 'freemind';
//   const mind_str = mind_data.data;
//   window.jsMind.util.file.save(mind_str, 'text/xml', mind_name + '.mm');
// }
//
// function open_freemind() {
//   const file_input = document.getElementById('file_input_freemind');
//   const files = file_input.files;
//   if (files.length > 0) {
//     const file_data = files[0];
//     window.jsMind.util.file.read(file_data, function (freemind_data, freemind_name) {
//       if (freemind_data) {
//         let mind_name = freemind_name;
//         if (/.*\.mm$/.test(mind_name)) {
//           mind_name = freemind_name.substring(0, freemind_name.length - 3);
//         }
//         const mind = {
//           meta: {
//             name: mind_name,
//             author: 'hizzgdev@163.com',
//             version: '1.0.1',
//           },
//           format: 'freemind',
//           data: freemind_data,
//         };
//         _jm.show(mind);
//       } else {
//         prompt_info('can not open this file as mindmap');
//       }
//     });
//   } else {
//     prompt_info('please choose a file first');
//   }
// }
//
// function get_text_data() {
//   const mind_data = _jm.get_data('text');
//   const mind_string = window.jsMind.util.json.json2string(mind_data);
//   prompt_info(mind_string);
// }
//
// function save_text_file() {
//   const mind_data = _jm.get_data('text');
//   const mind_name = mind_data.meta.name;
//   const mind_str = window.jsMind.util.json.json2string(mind_data);
//   window.jsMind.util.file.save(mind_str, 'text/jsmind', mind_name + '.jm');
// }
//
// function open_text() {
//   const file_input = document.getElementById('file_input_text');
//   const files = file_input.files;
//   if (files.length > 0) {
//     const file_data = files[0];
//     window.jsMind.util.file.read(file_data, function (jsmind_data, jsmind_name) {
//       const mind = window.jsMind.util.json.string2json(jsmind_data);
//       if (mind) {
//         _jm.show(mind);
//       } else {
//         prompt_info('can not open this file as mindmap');
//       }
//     });
//   } else {
//     prompt_info('please choose a file first');
//   }
// }
//
// function prompt_info(msg) {
//   alert(msg);
// }
//
// open_empty();
