import request from '@/utils/request'

export function getFeedbackByPage(params) {
  return request({
    url: "/feedback",
    method: "GET",
    params
  });
}

export function deleteFeedbackById(id) {
  return request({
    url: "/feedback/" + id,
    method: "DELETE"
  });
}