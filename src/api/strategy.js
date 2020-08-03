import request from '@/utils/request'

export function getStrategyByPage(params) {
  return request({
    url: "/strategy",
    method: "GET",
    params
  });
}

export function postStrategy(data) {
  return request({
    url: "/strategy",
    method: "POST",
    data
  });
}

export function deleteStrategyById(id) {
  return request({
    url: "/strategy/" + id,
    method: "DELETE"
  });
}

export function putStrategyById(id, data) {
  return request({
    url: "/strategy/" + id,
    method: "PUT",
    data
  });
}

export function getStrategyById(id) {
  return request({
    url: "/strategy/" + id,
    method: "GET"
  });
}
