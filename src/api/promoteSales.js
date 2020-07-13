import request from '@/utils/request'

export function getPage() {
  return request({
    url: '/promote/sales',
    method: 'get'
  })
}

export function updata(id, data) {
  data.id = id;
  return request({
    url: '/promote/sales',
    method: 'put',
    data
  })
}
export function deleter(id) {
  return request({
    url: '/promote/sales',
    method: 'delete',
    data: {
      id
    }
  })
}

export function getDetail(id) {
  return request({
    url: '/promote/sales/detail',
    method: 'get',
    params: {
      id
    }
  })
}