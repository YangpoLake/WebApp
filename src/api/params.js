import request from '@/utils/request'

export function getParamsInfo() {
  return request({
    url: "/params/info",
    method: "GET"
  });
}
