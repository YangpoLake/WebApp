import request from '@/utils/request'

export function putSysConf(data) {
  return request({
    url: "/sys_conf/update",
    method: "PUT"
  });
}

export function getSysConf() {
  return request({
    url: "/sys_conf",
    method: "GET"
  });
}
