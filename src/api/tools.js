import request from '@/utils/request'
import qs from 'qs'

export function upload(type, file, form) {
  return request({
    url: "/tools/upload",
    headers: {"content-type": "multipart/form-data"},
    method: "POST",
    data: form
  });
}
