import request from '@/utils/request'

export function getSelf(token) {
  return request({
    url: '/user/self',
    method: 'get',
    params: { token }
  })
}
