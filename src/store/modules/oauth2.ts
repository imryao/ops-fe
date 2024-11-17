import { defineStore } from 'pinia';

export const useOAuth2Store = defineStore('oauth2', {
  state: () => ({
    redirect: '',
  }),
  // getters: {
  //   getRedirect: (state) => state.redirect,
  // },
  actions: {
    setRedirect(redirect: string) {
      this.redirect = redirect;
    },
  },
  persist: {
    key: 'oauth2',
  },
});
