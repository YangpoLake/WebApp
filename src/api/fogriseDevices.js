import request from '@/utils/request'

export function getFogriseDevicesByPage(params) {
  return request({
    url: "/fog/rises",
    method: "GET",
    params
  });
}

export function postFogriseDevices(data) {
  return request({
    url: "/fog/rises",
    method: "POST",
    data
  });
}

export function deleteFogriseDevicesById(id) {
  return request({
    url: "/fog/rises/" + id,
    method: "DELETE"
  });
}

export function putFogriseDevicesById(id, data) {
  return request({
    url: "/fog/rises/" + id,
    method: "PUT",
    data
  });
}

export function getFogriseDevicesById(id) {
  return request({
    url: "/fog/rises/" + id,
    method: "GET"
  });
}
