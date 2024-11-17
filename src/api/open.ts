import { OAuth2CallbackResult, UserInfoResult } from '@/api/model/openModel';
import { request } from '@/utils/request';

const Api = {
  OAuth2Callback: '/oauth2/callback',
};

export function oauth2Callback(code: string, state: string) {
  return request.post<OAuth2CallbackResult>({
    url: Api.OAuth2Callback,
    data: {
      code,
      state,
    },
  });
}

export function getUserinfo() {
  return request.get<UserInfoResult>({
    url: '/user',
  });
}
