<template>
  <div id="app">
    <!-- <main-header></main-header> -->
    <main-content></main-content>
  </div>
</template>

<script>
// 引入组件
import content from './components/common/MainContent'

export default {
  name: "App",
  // 注册组件
  components: {
    "main-content": content
  },
};
</script>

<style>
@import "./assets/css/base.css";

</style>
