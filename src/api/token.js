import request from '@/utils/request'

export function getToken(data) {
  return request({
    url: '/token/get',
    method: 'POST',
    data
  })
}

export function destroyToken() {
  return request({
    url: '/token/destroy',
    method: 'POST'
  })
}
