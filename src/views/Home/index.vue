<template>
  <div class="main-body">
    <!-- Wrapper -->
    <div class="main-container">
      <!-- Header -->
      <header class="main-container_header">
        <div class="icon">
          <img src="@/assets/logo.jpg" alt="个人引导页" title="个人引导页" class="logo" />
        </div>
        <div class="content">
          <div class="inner">
            <h1>个人引导页</h1>
            <p>她只是途经我留下了星火&nbsp;而我却任凭它焚烧了我整个荒原</p>
          </div>
        </div>
        <nav>
          <ul>
            <li><a target="_blank" href="https://gitee.com/jin-shaohui">Gitee✨</a></li>
            <li><a target="_blank" href="https://github.com/shaohui-jin">Github✨</a></li>
            <li><a target="_blank" href="https://shaohui-jin.github.io/my-blog/">博客✨</a></li>
            <li><a target="_blank" href="https://shaohui-jin.github.io/my-netease-cloud/">网易云✨</a></li>
            <li><a target="_blank" href="https://shaohui-jin.github.io/my-css-library/">CSS库✨</a></li>
            <li><a target="_blank" href="https://shaohui-jin.github.io/my-tsx-cli/">Tsx模版✨</a></li>
            <li><a target="_blank" style="cursor: pointer" @click="$router.push({ path: '/mind' })">思维导图✨</a></li>
            <li><a target="_blank" style="cursor: pointer" @click="$router.push({ path: '/game' })">2048✨</a></li>
            <!--<li><a href="#elements">Elements</a></li>-->
          </ul>
        </nav>
      </header>
      <!-- Footer -->
      <footer class="main-container_footer">
        <p class="copyright">您的IP： {{ ip }}</p>
        <p class="copyright">Copyright &copy; 2021-{{ new Date().getFullYear() }} 石怜安_SLA</p>
        <p class="copyright">All Rights Reserved</p>
        <p class="copyright">繁华中自律，落魄中自愈 谋生的路上不抛弃良知，谋爱的路上不丢失尊严</p>
      </footer>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const ip = ref<string>(document.location.hostname);
</script>

<style lang="less" scoped>
@import './css/main.css';
</style>
