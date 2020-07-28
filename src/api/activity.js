import request from '@/utils/request'

export function getActivityByPage(params) {
  return request({
    url: "/activity",
    method: "GET",
    params
  });
}

export function postActivity(data) {
  return request({
    url: "/activity",
    method: "POST",
    data
  });
}

export function deleteActivityById(id) {
  return request({
    url: "/activity/" + id,
    method: "DELETE"
  });
}

export function putActivityById(id, data) {
  return request({
    url: "/activity/" + id,
    method: "PUT",
    data
  });
}

export function getActivityById(id) {
  return request({
    url: "/activity/" + id,
    method: "GET"
  });
}
