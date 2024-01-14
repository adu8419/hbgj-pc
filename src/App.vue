<template>
  <el-config-provider :locale="zhCn">
    <router-view v-if="isRouterActive" />
  </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";

// 在App.vue中
import { provide, nextTick, ref } from "vue";
const isRouterActive = ref(true);
provide("reload", () => {
  isRouterActive.value = false;
  nextTick(() => {
    isRouterActive.value = true;
  });
});
</script>
<style>
@import "./assets/css/main.css";
@import "./assets/css/color-dark.scss";
</style>
