import request from '@/utils/request'

export function getPage(params) {
  return request({
    url: '/goods/list',
    method: 'get',
    params
  })
}
export function updata(id, data) {
  data.id = id;
  return request({
    url: '/goods/goods',
    method: 'put',
    data
  })
}
export function deleter(id) {
  return request({
    url: '/commodity/' + id,
    method: 'delete'
  })
}

export function create(data) {
  return request({
    url: '/goods/goods',
    method: 'post',
    data
  })
}

export function getTypePage(params) {
  return request({
    url: '/goods/type/list',
    method: 'get',
    params
  })
}

export function getDetail(id){
  return request({
    url: "/goods/detail",
    method: 'get',
    params: {
      id: id
    }
  });
}