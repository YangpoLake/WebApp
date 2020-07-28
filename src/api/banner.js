import request from '@/utils/request'

export function getBannerByPage(params) {
  return request({
    url: "/banner",
    method: "GET",
    params
  });
}

export function postBanner(data) {
  return request({
    url: "/banner",
    method: "POST",
    data
  });
}

export function deleteBannerById(id) {
  return request({
    url: "/banner/" + id,
    method: "DELETE"
  });
}

export function putBannerById(id, data) {
  return request({
    url: "/banner/" + id,
    method: "PUT",
    data
  });
}

export function getBannerById(id) {
  return request({
    url: "/banner/" + id,
    method: "GET"
  });
}
