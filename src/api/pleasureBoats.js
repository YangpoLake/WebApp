import request from '@/utils/request'

export function getPleasureBoatsByPage(params) {
  return request({
    url: "/pleasure/boats",
    method: "GET",
    params
  });
}

export function postPleasureBoats(data) {
  return request({
    url: "/pleasure/boats",
    method: "POST",
    data
  });
}

export function deletePleasureBoatsById(id) {
  return request({
    url: "/pleasure/boats/" + id,
    method: "DELETE"
  });
}

export function putPleasureBoatsById(id, data) {
  return request({
    url: "/pleasure/boats/" + id,
    method: "PUT",
    data
  });
}

export function getPleasureBoatsById(id) {
  return request({
    url: "/pleasure/boats/" + id,
    method: "GET"
  });
}
