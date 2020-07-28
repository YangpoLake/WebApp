import request from '@/utils/request'

export function getDevicesModelsByPage(params) {
  return request({
    url: "/devices/models",
    method: "GET",
    params
  });
}

export function postDevicesModels(data) {
  return request({
    url: "/devices/models",
    method: "POST",
    data
  });
}

export function deleteDevicesModelsById(id) {
  return request({
    url: "/devices/models/" + id,
    method: "DELETE"
  });
}

export function putDevicesModelsById(id, data) {
  return request({
    url: "/devices/models/" + id,
    method: "PUT",
    data
  });
}

export function getDevicesModelsById(id) {
  return request({
    url: "/devices/models/" + id,
    method: "GET"
  });
}

export function getDevicesModelsAllUsers() {
  return request({
    url: "/devices/all/users",
    method: "GET"
  });
}
