import request from '@/utils/request'

export function getBrandsByPage(params) {
  return request({
    url: "/brands",
    method: "GET",
    params
  });
}

export function postBrands(data) {
  return request({
    url: "/brands",
    method: "POST",
    data
  });
}

export function deleteBrandsById(id) {
  return request({
    url: "/brands/" + id,
    method: "DELETE"
  });
}

export function putBrandsById(id, data) {
  return request({
    url: "/brands/" + id,
    method: "PUT",
    data
  });
}

export function getBrandsById(id) {
  return request({
    url: "/brands/" + id,
    method: "GET"
  });
}
