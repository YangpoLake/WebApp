import request from '@/utils/request'

export function getAccount() {
  return request({
    url: "/account",
    method: "GET"
  });
}

export function patchUserRole(userId, roleIds) {
  return request({
    url: "/user/" + userId + "/assignRole",
    method: "PATCH",
    data: {
      roles: roleIds
    }
  });
}

export function getUserPermission(userId) {
  return request({
    url: "/user/" + userId + "/permission",
    method: "GET"
  });
}

export function getUserRole(userId) {
  return request({
    url: "/user/" + userId + "/role",
    method: "GET"
  });
}

export function deleteUserById(userId) {
  return request({
    url: "user/" + userId,
    method: "DELETE"
  });
}

export function postAccount(data) {
  return request({
    url: "/account",
    method: "POST",
    data
  });
}

export function patchUserById(userId, data) {
  return request({
    url: "/user/" + userId,
    method: "PATCH",
    data
  });
}

export function getUserById(userId) {
  return request({
    url: "/user/" + userId,
    method: "GET"
  });
}

export function getUserByPage(params) {
  return request({
    url: "/user",
    method: "GET",
    params
  })
}

export function postUser(data) {
  return request({
    url: "/user",
    method: "POST",
    data
  });
}

export function patchUserPermission(userId, permissionIds) {
  return request({
    url: "/user/" + userId + "/assignPermission",
    method: "PATCH",
    data: {
      permissions: permissionIds
    }
  });
}
