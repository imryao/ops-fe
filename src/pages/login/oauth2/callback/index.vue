<template>
  <div class="login-wrapper">
    <login-header />

    <div class="login-container">
      <tdesign-setting />
    </div>

    <t-footer class="copyright">
      Copyright © {{ new Date().getFullYear() }} Suanli Lab. All Rights Reserved.
      <t-link class="beian" href="https://beian.miit.gov.cn" target="_blank">京ICP备2022017521号-2</t-link>
    </t-footer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'OAuth2Callback',
};
</script>

<script setup lang="ts">
import { MessagePlugin } from 'tdesign-vue-next';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

import { oauth2Callback } from '@/api/open';
import TdesignSetting from '@/layouts/setting.vue';
import LoginHeader from '@/pages/login/components/Header.vue';
import router from '@/router';
import { useUserStore } from '@/store';
import { useOAuth2Store } from '@/store/modules/oauth2';

const userStore = useUserStore();
const oauth2Store = useOAuth2Store();
const route = useRoute();
const code = route.query.code as string;
const state = route.query.state as string;

onMounted(async () => {
  const loading = MessagePlugin.loading('正在登录');
  const { token, exp } = await oauth2Callback(code, state);
  userStore.token = token;
  userStore.exp = new Date(exp);
  // const { email, username, nickname, picture } = await getUserinfo();
  // userStore.userInfo.email = email;
  // userStore.userInfo.username = username;
  // userStore.userInfo.name = nickname;
  // userStore.userInfo.picture = picture;
  await router.push(oauth2Store.redirect);
  MessagePlugin.close(loading);
});
</script>

<style scoped lang="less">
@import '../../index.less';
</style>
