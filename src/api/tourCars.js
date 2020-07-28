import request from '@/utils/request'

export function getTourCarsByPage(params) {
  return request({
    url: "/tour/cars",
    method: "GET",
    params
  });
}

export function postTourCars(data) {
  return request({
    url: "/tour/cars",
    method: "POST",
    data
  });
}

export function deleteTourCarsById(id) {
  return request({
    url: "/tour/cars/" + id,
    method: "DELETE"
  });
}

export function putTourCarsById(id, data) {
  return request({
    url: "/tour/cars/" + id,
    method: "PUT",
    data
  });
}

export function getTourCarsById(id) {
  return request({
    url: "/tour/cars/" + id,
    method: "GET"
  });
}
