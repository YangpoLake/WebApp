import { authRequest } from '../utils/request';

// 获取token登陆
export function login(data) {
  return authRequest({
    url: '/token/get',
    method: 'post',
    data,
  })
}

// 周期性间隔刷新token
export function apiRefreshToken(token) {
  return authRequest({
    url: '/token/refresh',
    method: 'post',
    data: {
      'token': token
    }
  })
}

// 查看本token用户详情
export function apiGetSelfUser() {
  return authRequest({
    url: 'users/self',
    method: 'get'
  }).catch(err => {
    this.$message.warning("请求失败");
  });
}

//登出
export function logout() {
  return authRequest({
    url: '/logout',
    method: 'get'
  })
}
