import request from '@/utils/request'

export function getProductByPage(params) {
  return request({
    url: "/product",
    method: "GET",
    params
  });
}

export function postProduct(data) {
  return request({
    url: "/product",
    method: "POST",
    data
  });
}

export function deleteProductById(id) {
  return request({
    url: "/product/" + id,
    method: "DELETE"
  });
}

export function putProductById(id, data) {
  return request({
    url: "/product/" + id,
    method: "PUT",
    data
  });
}

export function getProductById(id) {
  return request({
    url: "/product/" + id,
    method: "GET"
  });
}
