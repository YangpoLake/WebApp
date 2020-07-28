import request from '@/utils/request'

export function getCustomerByPage(params) {
  return request({
    url: "/customer",
    method: "GET",
    params
  });
}

export function getCustomerById(id) {
  return request({
    url: "/customer/" + id,
    method: "GET"
  });
}