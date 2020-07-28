import request from '@/utils/request'

export function getOrderByPage(params) {
  return request({
    url: "/order",
    method: "GET",
    params
  });
}

export function getOrderById(id) {
  return request({
    url: "/order/" + id,
    method: "GET"
  });
}
