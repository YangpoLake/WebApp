import request from '@/utils/request'

export function getLightDevicesByPage(params) {
  return request({
    url: "/lights",
    method: "GET",
    params
  });
}

export function postLightDevices(data) {
  return request({
    url: "/lights",
    method: "POST",
    data
  });
}

export function deleteLightDevicesById(id) {
  return request({
    url: "/lights/" + id,
    method: "DELETE"
  });
}

export function putLightDevicesById(id, data) {
  return request({
    url: "/lights/" + id,
    method: "PUT",
    data
  });
}

export function getLightDevicesById(id) {
  return request({
    url: "/lights/" + id,
    method: "GET"
  });
}
