import request from '@/utils/request'

export function getSmallTrainsByPage(params) {
  return request({
    url: "/small/trains",
    method: "GET",
    params
  });
}

export function postSmallTrains(data) {
  return request({
    url: "/small/trains",
    method: "POST",
    data
  });
}

export function deleteSmallTrainsById(id) {
  return request({
    url: "/small/trains/" + id,
    method: "DELETE"
  });
}

export function putSmallTrainsById(id, data) {
  return request({
    url: "/small/trains/" + id,
    method: "PUT",
    data
  });
}

export function getSmallTrainsById(id) {
  return request({
    url: "/small/trains/" + id,
    method: "GET"
  });
}
