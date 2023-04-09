<template>
  <div class="home-container">
    <div class="home-container_header">
      <span class="header-title">SLA 奇奇怪怪的实验室</span>
    </div>
    <div class="home-container_body">
      <div class="body_item" v-for="card in viewList" :key="card.url">
        <el-card shadow="hover" :body-style="{ padding: '0px' }">
          <template #header>
            <div class="card-header">
              <div>{{ card.title }}</div>
              <el-button class="button" text @click="toUrl(card.url)">GO TO</el-button>
            </div>
          </template>
          <iframe :src="card.url" class="iframe" />
        </el-card>
      </div>
    </div>
    <div class="home-container_body">
      <div class="body_item" v-for="card in codeList" :key="card.url">
        <el-descriptions :title="card.title" direction="vertical" :column="4" :size="'28px'" border>
          <template #extra>
            <el-button class="button" text @click="toUrl(card.url)">GO TO</el-button>
          </template>
          <el-descriptions-item label="Author" :span="1">SLA</el-descriptions-item>
          <el-descriptions-item label="Address" :span="3">{{ card.url }}</el-descriptions-item>
          <el-descriptions-item label="Remarks">
            {{ card.remark }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, reactive } from 'vue';
const { appContext } = getCurrentInstance();
const isOnload: boolean = document.location.host === 'jin-shaohui.gitee.io';
const toUrl = (url: string) => {
  // isOnload ? (document.location.href = url) : appContext.config.globalProperties.$message.warning('运行时限制跳转');
  isOnload ? window.open(`${url}`) : appContext.config.globalProperties.$message.warning('运行时限制跳转');
};
const viewList = reactive([
  { title: 'SLA 博客', url: 'https://jin-shaohui.gitee.io' },
  { title: 'SLA 网易云', url: 'https://jin-shaohui.gitee.io/vue3-webpack-music/#/' },
  { title: 'SLA 通用中后台', url: 'https://jin-shaohui.gitee.io/vue3-vite-work' },
]);

const codeList = reactive([
  { title: 'SLA webpack', url: 'https://gitee.com/jin-shaohui/simple-webpack', remark: 'Eval实现简易版webpack✨' },
  { title: 'SLA webpack-demo', url: 'https://gitee.com/jin-shaohui/webpack-demo', remark: '手写webpack编译流程✨' },
  { title: 'SLA vue', url: 'https://gitee.com/jin-shaohui/simple-vue', remark: 'vue数据劫持✨' },
  { title: 'SLA promise', url: 'https://gitee.com/jin-shaohui/simple-promise', remark: '简单实现promise✨' },
]);
</script>

<style lang="less" scoped>
.home-container {
  width: 100vw;
  min-height: 100vh;
  background-image: url('@/assets/home.png');

  .home-container_header {
    height: 30vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    .header-title {
      font-size: 40px;
      height: 60px;
      line-height: 60px;
      font-family: 'Agency FB', serif;
    }
  }
  .home-container_body {
    padding: 0 0 20px 0;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-self: center;

    .body_item {
      width: 100%;
      height: 216px;
      display: flex;
      justify-content: center;
      .iframe {
        transform: scale(0.2);
        width: 1920px;
        height: 1080px;
        transform-origin: left top;
      }
      .el-descriptions {
        width: 384px;
        height: 216px;
        background-color: white;
        /deep/.el-descriptions__header {
          padding: 0 12px;
          margin-bottom: 0;
          height: 50px;
          line-height: 50px;
        }
      }
      .el-card {
        width: 384px;
        height: 216px;
        /deep/.el-card__header {
          padding: 0 12px;
          .card-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            line-height: 50px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: 800px) {
  .home-container {
    .home-container_body {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

@media screen and (max-width: 1200px) and (min-width: 801px) {
  .home-container {
    .home-container_body {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}

@media screen and (max-width: 1600px) and (min-width: 1201px) {
  .home-container {
    .home-container_body {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
