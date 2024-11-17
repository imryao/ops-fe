export interface OAuth2CallbackResult {
  token: string;
  exp: string;
}

export interface UserInfoResult {
  email: string;
  username: string;
  name: string;
  nickname: string;
  picture: string;
}
