import request from '@/utils/request'

export function getWifiByPage(params) {
  return request({
    url: "/wifi",
    method: "GET",
    params
  });
}

export function postWifi(data) {
  return request({
    url: "/wifi",
    method: "POST",
    data
  });
}

export function deleteWifiById(id) {
  return request({
    url: "/wifi/" + id,
    method: "DELETE"
  });
}

export function putWifiById(id, data) {
  return request({
    url: "/wifi/" + id,
    method: "PUT",
    data
  });
}

export function getWifiById(id) {
  return request({
    url: "/wifi/" + id,
    method: "GET"
  });
}
