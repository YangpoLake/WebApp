import request from '@/utils/request'

export function getDevicesDocsByPage(params) {
  return request({
    url: "/devices/docs",
    method: "GET",
    params
  });
}

export function postDevicesDocs(data) {
  return request({
    url: "/devices/docs",
    method: "POST",
    data
  });
}

export function deleteDevicesDocsById(id) {
  return request({
    url: "/devices/docs/" + id,
    method: "DELETE"
  });
}

export function putDevicesDocsById(id, data) {
  return request({
    url: "/devices/docs/" + id,
    method: "PUT",
    data
  });
}

export function getDevicesDocsById(id) {
  return request({
    url: "/devices/docs/" + id,
    method: "GET"
  });
}
