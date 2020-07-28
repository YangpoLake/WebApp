import request from '@/utils/request'

export function getPermissionByPage(params) {
  return request({
    url: "/permission",
    method: "GET",
    params
  });
}

export function postPermission(data) {
  return request({
    url: "/permission",
    method: "POST",
    data
  });
}

export function deletePermissionById(id) {
  return request({
    url: "/permission/" + id,
    method: "DELETE"
  });
}

export function putPermissionById(id, data) {
  return request({
    url: "/permission/" + id,
    method: "PUT",
    data
  });
}

export function getPermissionById(id) {
  return request({
    url: "/permission/" + id,
    method: "GET"
  });
}
