import request from '@/utils/request'

export function getRolePermission(id) {
  return request({
    url: "/role/" + id + "/permission",
    method: "GET"
  });
}

export function PutRolePermission(roleId, permissionIds) {
  return request({
    url: "/role/" + roleId + "/assignPermission",
    method: "PUT",
    data: {
      permissions: permissionIds
    }
  });
}

export function getRoleByPage(params) {
  return request({
    url: "/role",
    method: "GET",
    params
  });
}

export function postRole(data) {
  return request({
    url: "/role",
    method: "POST",
    data
  });
}

export function deleteRoleById(id) {
  return request({
    url: "/role/" + id,
    method: "DELETE"
  });
}

export function putRoleById(id, data) {
  return request({
    url: "/role/" + id,
    method: "PUT",
    data
  });
}

export function getRoleById(id) {
  return request({
    url: "/role/" + id,
    method: "GET"
  });
}
