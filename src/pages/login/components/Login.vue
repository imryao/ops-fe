<template>
  <t-form ref="form" :class="['item-container', `login-password`]" label-width="0" @submit="onSubmit">
    <!--    <template v-if="type == 'password'">-->
    <!--      <t-form-item name="account">-->
    <!--        <t-input v-model="formData.account" size="large" :placeholder="`${t('pages.login.input.account')}：admin`">-->
    <!--          <template #prefix-icon>-->
    <!--            <t-icon name="user" />-->
    <!--          </template>-->
    <!--        </t-input>-->
    <!--      </t-form-item>-->

    <!--      <t-form-item name="password">-->
    <!--        <t-input-->
    <!--          v-model="formData.password"-->
    <!--          size="large"-->
    <!--          :type="showPsw ? 'text' : 'password'"-->
    <!--          clearable-->
    <!--          :placeholder="`${t('pages.login.input.password')}：admin`"-->
    <!--        >-->
    <!--          <template #prefix-icon>-->
    <!--            <t-icon name="lock-on" />-->
    <!--          </template>-->
    <!--          <template #suffix-icon>-->
    <!--            <t-icon :name="showPsw ? 'browse' : 'browse-off'" @click="showPsw = !showPsw" />-->
    <!--          </template>-->
    <!--        </t-input>-->
    <!--      </t-form-item>-->

    <!--      <div class="check-container remember-pwd">-->
    <!--        <t-checkbox>{{ t('pages.login.remember') }}</t-checkbox>-->
    <!--        <span class="tip">{{ t('pages.login.forget') }}</span>-->
    <!--      </div>-->
    <!--    </template>-->

    <!-- 扫码登录 -->
    <!--    <template v-else-if="type == 'qrcode'">-->
    <!--      <div class="tip-container">-->
    <!--        <span class="tip">{{ t('pages.login.wechatLogin') }}</span>-->
    <!--        <span class="refresh">{{ t('pages.login.refresh') }} <t-icon name="refresh" /> </span>-->
    <!--      </div>-->
    <!--      <qrcode-vue value="" :size="160" level="H" />-->
    <!--    </template>-->

    <!-- 手机号登录 -->
    <!--    <template v-else>-->
    <!--      <t-form-item name="phone">-->
    <!--        <t-input v-model="formData.phone" size="large" :placeholder="t('pages.login.input.phone')">-->
    <!--          <template #prefix-icon>-->
    <!--            <t-icon name="mobile" />-->
    <!--          </template>-->
    <!--        </t-input>-->
    <!--      </t-form-item>-->

    <!--      <t-form-item class="verification-code" name="verifyCode">-->
    <!--        <t-input v-model="formData.verifyCode" size="large" :placeholder="t('pages.login.input.verification')" />-->
    <!--        <t-button size="large" variant="outline" :disabled="countDown > 0" @click="sendCode">-->
    <!--          {{ countDown == 0 ? t('pages.login.sendVerification') : `${countDown}秒后可重发` }}-->
    <!--        </t-button>-->
    <!--      </t-form-item>-->
    <!--    </template>-->

    <t-form-item class="btn-container">
      <t-button block size="large" type="submit"> {{ t('pages.login.signIn') }} </t-button>
    </t-form-item>

    <!--    <div class="switch-container">-->
    <!--      <span v-if="type !== 'password'" class="tip" @click="switchType('password')">{{-->
    <!--        t('pages.login.accountLogin')-->
    <!--      }}</span>-->
    <!--      <span v-if="type !== 'qrcode'" class="tip" @click="switchType('qrcode')">{{ t('pages.login.wechatLogin') }}</span>-->
    <!--      <span v-if="type !== 'phone'" class="tip" @click="switchType('phone')">{{ t('pages.login.phoneLogin') }}</span>-->
    <!--    </div>-->
  </t-form>
</template>

<script setup lang="ts">
// import QrcodeVue from 'qrcode.vue';
import type { FormInstanceFunctions } from 'tdesign-vue-next';
import { MessagePlugin } from 'tdesign-vue-next';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

// import { useCounter } from '@/hooks';
import { t } from '@/locales';
import { useOAuth2Store } from '@/store/modules/oauth2';
// import { useUserStore } from '@/store';

// const userStore = useUserStore();
const oauth2Store = useOAuth2Store();

// const INITIAL_DATA = {
//   phone: '',
//   account: 'admin',
//   password: 'admin',
//   verifyCode: '',
//   checked: false,
// };

// const FORM_RULES: Record<string, FormRule[]> = {
//   phone: [{ required: true, message: t('pages.login.required.phone'), type: 'error' }],
//   account: [{ required: true, message: t('pages.login.required.account'), type: 'error' }],
//   password: [{ required: true, message: t('pages.login.required.password'), type: 'error' }],
//   verifyCode: [{ required: true, message: t('pages.login.required.verification'), type: 'error' }],
// };

// const type = ref('password');

const form = ref<FormInstanceFunctions>();
// const formData = ref({ ...INITIAL_DATA });
// const showPsw = ref(false);

// const [countDown, handleCounter] = useCounter();

// const switchType = (val: string) => {
//   type.value = val;
// };

// const router = useRouter();
const route = useRoute();

const { VITE_OAUTH2_CLIENT_ID, VITE_OAUTH2_REDIRECT_URI } = import.meta.env;

/**
 * 发送验证码
 */
// const sendCode = () => {
//   form.value.validate({ fields: ['phone'] }).then((e) => {
//     if (e === true) {
//       handleCounter();
//     }
//   });
// };

const onSubmit = async () => {
  // if (ctx.validateResult === true) {
  try {
    // await userStore.login(formData.value);

    MessagePlugin.loading('正在登录');
    const redirect = route.query.redirect as string;
    const redirectUrl = redirect ? decodeURIComponent(redirect) : '/dashboard';
    // router.push(redirectUrl);
    oauth2Store.setRedirect(redirectUrl);
    // todo: optimize authorization logic
    window.location.href = `https://open.cs.ac.cn/oauth2/authorize?response_type=code&client_id=${VITE_OAUTH2_CLIENT_ID}&redirect_uri=${encodeURIComponent(VITE_OAUTH2_REDIRECT_URI)}&scope=scope&state=state`;
  } catch (e) {
    console.error(e);
    MessagePlugin.error(e.message);
  }
  // }
};
</script>

<style lang="less" scoped>
@import '../index.less';
</style>
