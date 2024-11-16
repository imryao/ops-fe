<template>
  <div :class="prefix + '-footer'">
    Copyright © {{ new Date().getFullYear() }} Suanli Lab. All Rights Reserved.
    <t-link :class="prefix + '-footer'" href="https://beian.miit.gov.cn" target="_blank">京ICP备2022017521号-2</t-link>
  </div>
</template>

<script setup lang="ts">
import { prefix } from '@/config/global';
</script>

<style lang="less" scoped>
.@{starter-prefix}-footer {
  color: var(--td-text-color-placeholder);
  line-height: 20px;
  text-align: center;
}
</style>
